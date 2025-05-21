import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

type InputFieldProps = TextFieldProps & {
  icon?: React.ReactNode;
  label?: string;  // adicionado manualmente
  type?: string;   // adicionado manualmente
};

const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Box width="100%" sx={{ mb: 2 }}>
      {label && (
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: "rgba(10, 33, 87, 1)",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      )}

      <TextField
        {...props}
        type={inputType}
        variant="outlined"
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start" sx={{ color: "#996047" }}>
              {icon}
            </InputAdornment>
          ),
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                sx={{ color: "#996047" }}
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <LuEyeOff />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          bgcolor: "rgba(255, 255, 255, 1)",
          color: "#996047",
          height: "48px",
          borderRadius: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #996047",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& input::placeholder": {
            color: "#996047",
            opacity: 0.8,
          },
        }}
      />
    </Box>
  );
};

export default InputField;
