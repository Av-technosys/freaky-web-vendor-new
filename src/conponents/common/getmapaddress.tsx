'use client';

import { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { VITE_GOOGLE_MAPS_API_KEY } from '@/const/env';

const libraries: ('places')[] = ['places'];

export default function LocationSearch() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);

    const [address, setAddress] = useState('');
    const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);

    const onLoad = (auto: google.maps.places.Autocomplete) => {
        setAutocomplete(auto);
    };

    const onPlaceChanged = () => {
        if (!autocomplete) return;

        const place = autocomplete.getPlace();

        if (!place.geometry?.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        console.log("places: ", place);

        setAddress(place.formatted_address || '');
        setLatLng({ lat, lng });
    };

    if (!isLoaded) return <p>Loading…</p>;

    return (
        <div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    type="text"
                    placeholder="Search location"
                    className="border p-2 w-full"
                />
            </Autocomplete>

            <div className="mt-4">
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Latitude:</strong> {latLng?.lat}</p>
                <p><strong>Longitude:</strong> {latLng?.lng}</p>
            </div>
        </div>
    );
}
