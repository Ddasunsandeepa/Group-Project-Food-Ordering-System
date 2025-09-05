import React from "react";
import TextField from "@mui/material/TextField";

interface EmailFieldProps {
  value: string;
  setEmail: (value: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, setEmail }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <TextField
      id="email"
      label="Email"
      variant="standard"
      type="email"
      required
      className="w-100"
      name="email"
      value={value}
      onChange={handleChange}
    />
  );
};

export default EmailField;
