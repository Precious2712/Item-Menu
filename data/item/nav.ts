interface Nav {
    id: number;
    text: string;
    path:
    | "/"
    | "/create"
    | "/login"
    | "/dishes"
    | "/meal"
    // | "/snack"
    | "/cart";
}

export const navItem: Nav[] = [
    {
        id: 0,
        text: 'Home',
        path: '/',
    },
    {
        id: 1,
        text: 'Create Account',
        path: '/create',
    },
    {
        id: 2,
        text: 'Dishes',
        path: '/dishes',
    },
    {
        id: 3,
        text: 'Meal',
        path: '/meal',
    },
    {
        id: 4,
        text: 'Cart',
        path: '/cart',
    },
    // {
    //     id: 5,
    //     text: 'snack',
    //     path: '/snack',
    // },
];
