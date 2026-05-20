
    export interface IRecipe {
    name: string;
    tagId: number;
    price: number;
    categoriesIds: string[]; 
    description: string;
    recipeImage: File | null;
}

