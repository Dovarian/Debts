import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface debtsI {
    id: number;
    user_id: number;
    creditor_id: number;
    amount: number;
    date: string;
    hidden?: boolean;
    defaultEdit?: boolean;
}

export async function GET(_: string, { params }: { params: { userID: number } }) {
    try {
        const user_id = Number((await params)?.userID);
        let result = await prisma.creditors.findMany({
            where: {
                user_id,
            },
        });

        result = await Promise.all(
            result.map(async (creditor) => {
                const debts: debtsI[] = await prisma.debts.findMany({
                    where: {
                        creditor_id: creditor.id,
                    },
                });
                debts.map((debt) => {
                    debt.defaultEdit = false;
                });

                const newCreditor = {
                    ...creditor,
                    hidden: false,
                    debtsList: [...debts],
                };
                return newCreditor;
            })
        );

        return NextResponse.json(await result, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error },
            {
                status: 404,
            }
        );
    }
}
