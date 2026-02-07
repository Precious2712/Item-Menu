import axios, { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { FoodItem, FoodResponse } from "@/data/item/food";
import { SnackResponse, SnackItem } from "@/data/item/snacks";
import { AsianResponse, AsianItem } from "@/data/item/asian";

import { SubDataMenu } from "@/data/item/single-product";

type ProductContextType = {
    food: FoodItem[];
    loading: boolean;

    snacks: SnackItem[];
    loadingSnacks: boolean;

    loadingAsian: boolean;
    asian: AsianItem[];

    handleSelectItem: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [food, setFood] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [snacks, setSnacks] = useState<SnackItem[]>([]);
    const [loadingSnacks, setLoadingSnacks] = useState<boolean>(false);

    const [loadingAsian, setLoadingAsian] = useState<boolean>(false);
    const [asian, setAsian] = useState<AsianItem[]>([]);

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




    useEffect(() => {
        getAllMenu();
        getAllSnacks();
        getAllAsian();
    }, []);



    return (
        <ProductContext.Provider value={{ food, loading, snacks, loadingSnacks, asian, loadingAsian, handleSelectItem }}>
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
