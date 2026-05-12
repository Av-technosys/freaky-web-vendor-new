import DropdownSelector from "@/conponents/dropdownSelector";
import { useGetProductType } from "@/services";
import Spin from "../spin";
import { useEffect } from "react";

export function SelectProductType({ categoryName, handleProductCategoryChange }: { categoryName: string, handleProductCategoryChange: (value: string) => void }) {
    const { data: productTypes, isPending } = useGetProductType();
    useEffect(() => {
        console.log('isPending: ', isPending)
        if (productTypes) {
        }
    }, [isPending]);

    const options = productTypes?.data?.map((item: any) => {
        return {
            label: item.name,
            value: item.id
        }
    })


    if (isPending) return <Spin />
    return (
        <DropdownSelector
            values={{ options: options }}
            selectedValue={categoryName}
            onChange={handleProductCategoryChange}
        />
    )
}