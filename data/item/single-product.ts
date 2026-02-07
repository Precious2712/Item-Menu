export interface SubDataMenu {
    _id: string;
    name: string;
    price: number;
    image: string;
}


export interface SingleData {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    subMenu: SubDataMenu[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}