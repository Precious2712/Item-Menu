
export interface SubSnackItem {
    _id: string;
    name: string;
    price: number;
    image: string;
}

export interface SnackItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    subMenu: SubSnackItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SnackResponse {
    message: string;
    fastFood: SnackItem[];
}
