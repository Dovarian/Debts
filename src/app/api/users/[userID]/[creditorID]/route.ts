import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { creditorID: number; userID: number } }) {
    try {
        const creditor_id = Number((await params)?.creditorID);
        const user_id = Number((await params)?.userID);
        const type = String(req.nextUrl.searchParams.get("type"));
        const id = Number(req.nextUrl.searchParams.get("id"));
        const body = await req.json();

        if (type == "create") {
            return NextResponse.json(
                await prisma.debts.create({
                    data: {
                        user_id,
                        creditor_id,
                        ...body,
                    },
                }),
                { status: 200 }
            );
        } else if (type == "delete") {
            return NextResponse.json(
                await prisma.debts.delete({
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
            await prisma.debts.update({
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

export async function GET(_: NextRequest, { params }: { params: { creditorID: number } }) {
    try {
        const creditor_id = Number((await params)?.creditorID);

        return NextResponse.json(
            await prisma.debts.findMany({
                where: { creditor_id },
            }),
            {
                status: 200,
            }
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
