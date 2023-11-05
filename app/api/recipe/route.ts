import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async () => {
    try {
        const recipes = await prisma.recipe.findMany();
        return new NextResponse(JSON.stringify(recipes));
    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Error while getting the recipes" }),
            { status: 500 }
        );
    }
};
