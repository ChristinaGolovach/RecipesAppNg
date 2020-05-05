import { Ingredient } from 'src/app/shared/models/ingredient.model';

export class Recipe {
    // constructor(
    //     public name: string,
    //     public description: string,
    //     public imagePath: string,
    //     public ingredients: Ingredient[]
    // ) { }

    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(init?: Partial<Recipe>) {
        Object.assign(this, init);
    }
}