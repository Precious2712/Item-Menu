
export interface CartItem {
    _id: string;
    imagery: string;
    price: number;
    quantity: number;
    sum: number;
    totalPrice: number;
}

export interface Cart {
    _id: string;
    pickUpLocation: string;
    userId: string;
    item: CartItem[];
    itemOne: CartItem[];
    cartTotal: number;
    __v: number;
}


export interface CartResponse {
    message: string;
    cart: Cart;
}