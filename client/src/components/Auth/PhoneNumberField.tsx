import React from "react";
import TextField from "@mui/material/TextField";

interface PhoneNumberFieldProps {
  value: string;
  setPhone: (value: string) => void;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ value, setPhone }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, spaces, dashes, and plus sign
    const input = e.target.value;
    const cleaned = input.replace(/[^0-9+\s-]/g, "");
    setPhone(cleaned);
  };

  return (
    <TextField
      id="phone"
      label="Phone Number"
      variant="standard"
      type="tel"
      required
      className="w-100"
      name="phone"
      value={value}
      onChange={handleChange}
      inputProps={{
        maxLength: 15, // optional limit
      }}
    />
  );
};

export default PhoneNumberField;
