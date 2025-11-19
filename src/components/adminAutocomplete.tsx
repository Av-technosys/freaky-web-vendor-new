import React, { useEffect, useRef } from "react";

interface Props {
  onSelect: (place: google.maps.places.PlaceResult) => void;
}

export default function AddressAutocomplete({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["address_components", "formatted_address", "geometry"],
      types: ["address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onSelect(place);
    });
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder="Search address..."
      className="input"
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    />
  );
}
