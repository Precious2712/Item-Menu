export type Dish = {
    id: string;
    name: string;
    image: string;
    price: string;
};

export const dishes: Dish[] = [
    {
        id: "1",
        name: "Jollof Rice & Chicken",
        image:
            "https://media.istockphoto.com/id/1128862289/photo/tea-time-food-and-drinks.jpg?s=612x612&w=0&k=20&c=I9ORdkgL0ISDkPMpKZeYxeuDYLNitLJkW0PWI8aj9pg=",
        price: "₦3,500",
    },
    {
        id: "2",
        name: "Fried Rice & Beef",
        image:
            "https://media.istockphoto.com/id/1144823591/photo/spaghetti-in-a-dish-on-a-white-background.jpg?s=612x612&w=0&k=20&c=SeEWmJfPQlX1zVUHPKjL-cgYeMs9cZ97-kdZMm7feA4=",
        price: "₦3,800",
    },
    {
        id: "3",
        name: "Pounded Yam & Egusi",
        image:
            "https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=612x612&w=0&k=20&c=k6X_gSHlo-WdKsqTnfBjoEbjdhrlz6RNhUs23ivpIxk=",
        price: "₦4,200",
    },
    {
        id: "4",
        name: "Suya Platter",
        image:
            "https://media.istockphoto.com/id/931308812/photo/selection-of-american-food.jpg?s=612x612&w=0&k=20&c=7-2Glc2qVkrWdLaqXwLnNoJLUvc2vMz_QpDTKDcmYiY=",
        price: "₦5,000",
    },
    {
        id: "5",
        name: "Plantain & Pepper Sauce",
        image:
            "https://media.istockphoto.com/id/450705255/photo/homemade-turkey-thanksgiving-dinner.jpg?s=612x612&w=0&k=20&c=Bul88e51JYCw6o2JaLyvPKCZpg2R-qd2621978t7HRI=",
        price: "₦2,500",
    },
];
