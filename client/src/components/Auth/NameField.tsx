import React from "react";
import TextField from "@mui/material/TextField";

interface NameFieldProps {
  value: string;
  setName: (value: string) => void;
}

const NameField: React.FC<NameFieldProps> = ({ value, setName }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted =
      input.charAt(0).toUpperCase() + input.slice(1);
    setName(formatted);
  };

  return (
    <TextField
      id="name"
      label="Name"
      variant="standard"
      type="text"
      required
      className="w-100"
      name="name"
      value={value}
      onChange={handleChange}
    />
  );
};

export default NameField;
