
export interface SubAsianItem {
    _id: string;
    name: string;
    price: number;
    image: string;
}

export interface AsianItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    subMenu: SubAsianItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface AsianResponse {
    message: string;
    asian: AsianItem[];
}
