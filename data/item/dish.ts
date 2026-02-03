export type Dish = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
};

export const dishes: Dish[] = [
    {
        id: 1,
        name: "Wagyu Tenderloin",
        description: "Premium wagyu beef with truffle jus and seasonal vegetables",
        price: "$89",
        image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        name: "Lobster Thermidor",
        description: "Classic French lobster baked in a rich cognac cream sauce",
        price: "$95",
        image:
            "https://plus.unsplash.com/premium_photo-1672363353881-68c8ff594e25?auto=format&fit=crop&w=2000&q=100",
    },
    {
        id: 3,
        name: "Truffle Tagliatelle",
        description: "Handmade pasta tossed with black truffle and aged parmesan",
        price: "$68",
        image:
            "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=2000&q=100",
    },
    {
        id: 4,
        name: "Seared Scallops",
        description: "Pan-seared scallops with cauliflower purée and brown butter",
        price: "$54",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 5,
        name: "Duck Confit",
        description: "Slow-cooked duck leg with crispy skin and red wine glaze",
        price: "$62",
        image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 6,
        name: "Burrata & Heirloom Tomatoes",
        description: "Creamy burrata with basil oil and aged balsamic",
        price: "$38",
        image:
            "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 7,
        name: "Grilled Lamb Chops",
        description: "Herb-crusted lamb chops with rosemary jus",
        price: "$74",
        image:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=2000&q=100",
    },
    {
        id: 8,
        name: "Seafood Risotto",
        description: "Creamy risotto with prawns, mussels, and saffron",
        price: "$59",
        image:
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 9,
        name: "Chocolate Fondant",
        description: "Warm molten chocolate cake with vanilla bean ice cream",
        price: "$24",
        image:
            "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=100",
    },
    {
        id: 10,
        name: "Vanilla Crème Brûlée",
        description: "Classic vanilla custard with caramelized sugar crust",
        price: "$22",
        image:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    },
];
