export type IngredientType = {
    id: string;
    createdAt: string;
    name: string;
    amount: number;
    inventoryId: string;
};

export type InventoryType = {
    id: string;
    createdAt: string;
    ingredients: IngredientType[];
};

export type ExpectedIngredient = {
    name: string;
    amount: number;
};

export type RecipeType = {
    id: string;
    name: string;
    createdAt: string;
    description?: string; // Optional because it's optional in your Prisma model
    ingredients: ExpectedIngredient[];
};
