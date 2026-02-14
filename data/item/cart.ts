export interface Item {
    _id: string;
    name: string;
    price: number;
    image: string;
}


export interface UserCartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    subMenu: Item[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}