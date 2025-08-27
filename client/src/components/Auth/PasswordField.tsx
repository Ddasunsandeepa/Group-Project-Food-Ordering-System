import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordWarning?: React.Dispatch<React.SetStateAction<string | null>>;
  title?: string;
  isPasswordVisible: boolean;
  handleToggleVisibility: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  setPasswordWarning,
  title = "Password",
  isPasswordVisible,
  handleToggleVisibility,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);

    if (setPasswordWarning) {
      if (val.length < 8) {
        setPasswordWarning("Password should be at least 8 characters long.");
      } else {
        setPasswordWarning(null);
      }
    }
  };

  return (
    <TextField
      label={title}
      variant="standard"
      type={isPasswordVisible ? "text" : "password"}
      required
      className="w-100"
      name="password"
      value={password}
      autoComplete="new-password"
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleVisibility} edge="end">
              {isPasswordVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
