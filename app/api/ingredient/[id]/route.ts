import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    try {
        await prisma.ingredient.findUnique({
            where: {
                id: id,
            },
        });
        return new NextResponse(JSON.stringify("ingredient has been get"), {
            status: 200,
        });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "something wrong when getting" }),
            { status: 500 }
        );
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    try {
        console.log("hello " + id);
        await prisma.ingredient.delete({
            where: {
                id: id,
            },
        });
        return new NextResponse(JSON.stringify("ingredient has been deleted"), {
            status: 200,
        });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "something wrong when deleting" }),
            { status: 500 }
        );
    }
};
