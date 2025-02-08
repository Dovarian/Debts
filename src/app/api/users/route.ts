import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const id = Number(req.nextUrl.searchParams.get("id"));
        const type = String(req.nextUrl.searchParams.get("type"));

        if (type == "create") {
            return NextResponse.json(
                await prisma.users.create({
                    data: body,
                }),
                { status: 200 }
            );
        } else if (type == "delete") {
            return NextResponse.json(
                await prisma.users.delete({
                    where: { id },
                })
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: error },
            {
                status: 404,
            }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const id = Number(req.nextUrl.searchParams.get("id"));

        return NextResponse.json(
            await prisma.users.update({
                where: { id },
                data: body,
            })
        );
    } catch (error) {
        return NextResponse.json(
            { error: error },
            {
                status: 404,
            }
        );
    }
}

export async function GET(req: NextRequest) {
    const email = String(req?.nextUrl.searchParams.get("email"));
    const password = String(req?.nextUrl.searchParams.get("password"));

    console.log(email);
    console.log(password);

    try {
        if (email != "null" && password != "null") {
            return NextResponse.json(
                !!(await prisma.users.findUnique({ where: { email, password } }))
                    ? await prisma.users.findUnique({ where: { email, password } })
                    : null,
                {
                    status: 200,
                }
            );
        } else if (email != "null") {
            return NextResponse.json(
                !!(await prisma.users.findUnique({ where: { email } }))
                    ? await prisma.users.findUnique({ where: { email } })
                    : null,
                {
                    status: 200,
                }
            );
        } else if (password != "null") {
            return NextResponse.json(
                !!(await prisma.users.findMany({ where: { password } }))
                    ? await prisma.users.findMany({ where: { password } })
                    : null,
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json(await prisma.users.findMany(), {
                status: 200,
            });
        }
    } catch (error) {
        return NextResponse.json(
            { error: error },
            {
                status: 404,
            }
        );
    }
}
