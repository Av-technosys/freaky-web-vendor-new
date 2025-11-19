import React, { useState } from "react"; 
import AddressAutocomplete from "./adminAutocomplete";

export default function AddressForm() {
  const [form, setForm] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const getComponent = (
    components: google.maps.GeocoderAddressComponent[],
    type: string
  ) => {
    const c = components.find((comp) => comp.types.includes(type));
    return c ? c.long_name : "";
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (!place || !place.address_components) return;

    const components = place.address_components;

    const streetNumber = getComponent(components, "street_number");
    const route = getComponent(components, "route");

    setForm({
      line1: `${streetNumber} ${route}`.trim(),
      line2: "",
      city:
        getComponent(components, "locality") ||
        getComponent(components, "sublocality") ||
        "",
      state: getComponent(components, "administrative_area_level_1"),
      zipcode: getComponent(components, "postal_code"),
      country: getComponent(components, "country"),
    });
  };

  return (
    <div style={{ maxWidth: 450, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Address Form</h2>

      <AddressAutocomplete onSelect={handlePlaceSelect} />

      <div style={{ marginTop: 20 }}>
        <label>Address Line 1</label>
        <input
          value={form.line1}
          onChange={(e) => setForm({ ...form, line1: e.target.value })}
          className="input"
        />

        <label>Address Line 2</label>
        <input
          value={form.line2}
          onChange={(e) => setForm({ ...form, line2: e.target.value })}
          className="input"
        />

        <label>City</label>
        <input
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="input"
        />

        <label>State</label>
        <input
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="input"
        />

        <label>Zipcode</label>
        <input
          value={form.zipcode}
          onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
          className="input"
        />

        <label>Country</label>
        <input
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="input"
        />
      </div>

      <style>{`
        .input {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 6px 0 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
