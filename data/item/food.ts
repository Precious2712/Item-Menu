export interface SubMenuItem {
    _id: string;
    name: string;
    price: number;
    image: string;
}

export interface FoodItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    subMenu: SubMenuItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FoodResponse {
    message: string;
    food: FoodItem[];
}
