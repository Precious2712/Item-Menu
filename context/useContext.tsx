import axios, { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { FoodItem, FoodResponse } from "@/data/item/food";
import { SnackResponse, SnackItem } from "@/data/item/snacks";
import { AsianResponse, AsianItem } from "@/data/item/asian";

import { UserCartItem } from "@/data/item/cart";
import { SubCartItem } from "@/data/item/user-cart";
import { Cart, CartResponse } from "@/data/screen/user-cart-item";

import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductContextType = {
    food: FoodItem[];
    loading: boolean;

    snacks: SnackItem[];
    loadingSnacks: boolean;

    loadingAsian: boolean;
    asian: AsianItem[];

    handleSelectItem: (id: string) => void;
    handleOrderCartItem: (items: UserCartItem, extra: SubCartItem[], pickUpLocation: string) => void;
    setResults: React.Dispatch<React.SetStateAction<string>>;
    setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
    result: string;
    cartLoading: boolean;

    updateQuantity: (itemId: string, type: "plus" | "minus") => void;
    isloading: boolean;
    refreshing: boolean;
    pickUpLocation: () => Promise<string>;
    cart: Cart | null;
    fetchCart: () => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [food, setFood] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [snacks, setSnacks] = useState<SnackItem[]>([]);
    const [loadingSnacks, setLoadingSnacks] = useState<boolean>(false);

    const [loadingAsian, setLoadingAsian] = useState<boolean>(false);
    const [asian, setAsian] = useState<AsianItem[]>([]);

    const [result, setResults] = useState('');

    const [cartLoading, setCartLoading] = useState(false);

    const [cart, setCart] = useState<Cart | null>(null);
    const [isloading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const router = useRouter();


    const getAllMenu = async () => {
        setLoading(true);
        try {
            const res = await axios.get<FoodResponse>(
                "https://backend-service-jfkg.onrender.com/api/v1/getAllMenu"
            );
            setFood(res.data.food);
            // console.log(res.data);

        } catch (error) {
            console.log(error, "error-response");
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data?.message || err;
                Toast.show({
                    type: "error",
                    text1: `${err}`,
                });
            }
        } finally {
            setLoading(false);
        }
    };


    const getAllSnacks = async () => {
        setLoadingSnacks(true);
        try {
            const res = await axios.get<SnackResponse>(
                "https://backend-service-jfkg.onrender.com/api/v1/get-all-snacks"
            );
            setSnacks(res.data.fastFood);
            // console.log(res.data);

        } catch (error) {
            console.log(error, "error-response");
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data?.message || err;
                Toast.show({ type: "error", text1: err });
            }
        } finally {
            setLoadingSnacks(false);
        }
    };


    const getAllAsian = async () => {
        setLoadingAsian(true);
        try {
            const res = await axios.get<AsianResponse>(
                "https://backend-service-jfkg.onrender.com/api/v1/chineese-foods"
            );
            setAsian(res.data.asian);
            // console.log(res.data, 'All Asian');

        } catch (error) {
            console.log(error, "error-response");
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data?.message || err;
                Toast.show({
                    type: "error",
                    text1: `${err}`,
                });
            }
        } finally {
            setLoadingAsian(false);
        }
    };


    const handleSelectItem = (id: string) => {
        router.push(`/view/${id}`);
    };


    const handleOrderCartItem = async (
        items: UserCartItem,
        extra: SubCartItem[],
        pickUpLocation: string
    ) => {
        try {
            if (!pickUpLocation) {
                Toast.show({
                    type: "error",
                    text1: "Pick up location required",
                });
                return;
            }

            const mainItem = [
                {
                    imagery: items.image,
                    price: items.price,
                    quantity: 1,
                },
            ];

            const extras = extra.map((extra) => ({
                imagery: extra.image,
                price: extra.price,
                quantity: 1,
            }));

            const payload = {
                pickUpLocation,
                item: mainItem,
                itemOne: extras,
            };

            console.log("Sending payload →", payload);

            const token = await AsyncStorage.getItem("token");

            if (!token) {
                Toast.show({
                    type: "error",
                    text1: "Please login first",
                });
                return;
            }

            setCartLoading(true);

            const res = await axios.post(
                "https://backend-service-jfkg.onrender.com/api/v1/create-user-cart",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("item-added to cart", res.data);

            Toast.show({
                type: "success",
                text1: "Added to cart",
            });

        } catch (error) {
            console.log(error, "error-response");

            let err = "An error has occurred";

            if (isAxiosError(error)) {
                err = error.response?.data?.message || err;
            }

            Toast.show({
                type: "error",
                text1: err,
            });
        } finally {
            setCartLoading(false);
        }
    };


    const pickUpLocation = async () => {
        router.push("/map");
        return result;
    };


    const updateQuantity = async (
        itemId: string,
        type: "plus" | "minus"
    ) => {
        const token = await AsyncStorage.getItem("token");

        try {
            await axios.post(
                "https://backend-service-jfkg.onrender.com/api/v1/update-cart-item",
                {
                    cartItemId: itemId,
                    type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (type === 'minus') {
                Toast.show({
                    type: "success",
                    text1: "Product quantity reduced",
                });
            }

            if (type === 'plus') {
                Toast.show({
                    type: "success",
                    text1: "Quantity increase",
                });
            }

            fetchCart();
        } catch (error) {
            console.log("Update cart error:", error);
        }
    };

    const fetchCart = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const res = await axios.get<CartResponse>(
                "https://backend-service-jfkg.onrender.com/api/v1/get-user-cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCart(res.data.cart);
        } catch (error) {
            console.log("Fetch cart error:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };



    useEffect(() => {
        getAllMenu();
        getAllSnacks();
        getAllAsian();
        fetchCart();
    }, []);



    return (
        <ProductContext.Provider value={{
            food, isloading,
            loading, pickUpLocation,
            snacks, cart,
            loadingSnacks,
            asian, handleOrderCartItem,
            loadingAsian, handleSelectItem,
            setResults, result,
            cartLoading,
            updateQuantity,
            setRefreshing,
            refreshing,
            fetchCart
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used inside ProductProvider");
    }
    return context;
}
