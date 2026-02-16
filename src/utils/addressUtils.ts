export function getAddressValue(address: any, type: string) {
    const addressValue = address.find((item: any) => item.types.includes(type));
    return addressValue?.long_name;
}

export const googleAddressItems = {
    "administrative_area_level_2": "administrative_area_level_2",
    "administrative_area_level_1": "administrative_area_level_1",
    "locality": "locality",
    "postal_code": "postal_code",
    "latitude": "latitude",
    "longitude": "longitude",
}
