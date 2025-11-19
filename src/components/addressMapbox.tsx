"use client";

import { useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

interface USAddressForm {
  address1: string;  // street address
  address2: string;  // apt / suite
  city: string;
  state: string;     // 2-letter US state
  zip: string;       // 5-digit or zip+4
}

export default function MyUSAddressForm() {
  const [form, setForm] = useState<USAddressForm>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-3 w-full max-w-md">

      <AddressAutofill accessToken="pk.eyJ1IjoiYXNoaXNoMTEwMTEiLCJhIjoiY21pNWtyZnExMDZybjJpcXowd3B5OXJwdiJ9.4vKDp0wZewOz0P5UPKjHHg">
        {/* Street Address */}
        <input
          type="text"
          name="address1"
          autoComplete="address-line1"
          placeholder="Street Address"
          value={form.address1}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        {/* Apt / Suite */}
        <input
          type="text"
          name="address2"
          autoComplete="address-line2"
          placeholder="Apt / Suite (optional)"
          value={form.address2}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          autoComplete="address-level2"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        {/* State */}
        <input
          type="text"
          name="state"
          autoComplete="address-level1"
          placeholder="State (e.g., CA)"
          value={form.state}
          onChange={handleChange}
          className="border px-3 py-2 rounded uppercase"
          maxLength={2}
        />

        {/* ZIP Code */}
        <input
          type="text"
          name="zip"
          autoComplete="postal-code"
          placeholder="ZIP Code"
          value={form.zip}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </AddressAutofill>
    </form>
  );
}
