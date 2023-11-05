import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return new NextResponse(JSON.stringify(ingredients));
    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Error while getting the ingredients" }),
            { status: 500 }
        );
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const ingredient = await prisma.ingredient.create({
            data: body,
        });
        return new NextResponse(JSON.stringify(ingredient));
    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Error while getting the ingredients" }),
            { status: 500 }
        );
    }
};

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { id, restockAmount } = body;
    console.log("Received request:", body);
    if (!body) {
        return new NextResponse(
            JSON.stringify({ message: "Request body is undefined" }),
            { status: 400 }
        );
    }

    try {
        await prisma.ingredient.update({
            where: {
                id: id,
            },
            data: {
                amount: {
                    increment: restockAmount,
                },
            },
        });

        return new NextResponse(
            JSON.stringify("Ingredient stock has been incremented"),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "Something went wrong when incrementing stock",
            }),
            { status: 500 }
        );
    }
}

export const PUT2 = async (
    req: NextRequest,
    { body }: { body: { restockAmount: number; id: string } } // Include id here
) => {
    console.log("Received request:", req);

    if (!body) {
        return new NextResponse(
            JSON.stringify({ message: "Request body is undefined" }),
            { status: 400 }
        );
    }
    const { restockAmount, id } = body; // Destructure both restockAmount and id

    try {
        console.log("Incrementing stock for ingredient with id: " + id);

        await prisma.ingredient.update({
            where: {
                id: id,
            },
            data: {
                amount: {
                    increment: restockAmount,
                },
            },
        });

        return new NextResponse(
            JSON.stringify("Ingredient stock has been incremented"),
            {
                status: 200,
            }
        );
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({
                message: "Something went wrong when incrementing stock",
            }),
            { status: 500 }
        );
    }
};
