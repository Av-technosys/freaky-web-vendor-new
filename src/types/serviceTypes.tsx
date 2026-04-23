export type ProductType = "PRODUCT" | "ADDON";
export type PricingType = "FLAT" | "TIRE";



export interface PriceTypeTire {
    lowerBound: number;
    upperBound: number;
    price: number;
}

export interface FormData {
    title: string;
    type: ProductType;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    streetAddressLine1: string;
    streetAddressLine2: string;
    latitude: string;
    longitude: string; pricingType: PricingType;
    price: number;
    productTypeId: string;
    deliveryRadius: number;
    description: string;
    maxBookingAtTime: number;
    maxQuantity: number;
    minQuantity: number;
    isAvailable: boolean;
    returnPolicyURL: string;
    bannerImage: string;
}