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
  label?: string;
  type?: string;
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
            fontFamily: 'Playfair Display, serif',
            color: "#3C333F",
            fontWeight: 500,
            marginLeft: "12px",
            fontSize: "16px",
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
            <InputAdornment position="start" sx={{ 
              color: "white",
              marginLeft: "16px"
            }}>
              {icon}
            </InputAdornment>
          ),
          endAdornment: isPassword ? (
            <InputAdornment position="end" sx={{ marginRight: "16px" }}>
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                sx={{ color: "white" }} // Cor do ícone alterada para branco
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <LuEyeOff />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
          sx: {
            borderRadius: "30px",
            height: "48px",
            "&:hover fieldset": {
              borderColor: "rgba(63, 34, 23, 0.5) !important",
            },
          },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            border: "1px solidrgba(63, 34, 23, 0.5)",
            backgroundColor: "rgba(150, 90, 65, 0.85)", // Cor de fundo adicionada
            paddingLeft: icon ? 0 : "14px",
            "& .MuiInputBase-input": {
              color: "white", // Texto em branco
              caretColor: "white", // Cursor em branco
            },
          },
          "& input::placeholder": {
            color: "white",          // Cor do texto
            fontSize: "0.95rem",    // Tamanho da fonte
            fontFamily: 'Playfair Display, serif', // Fonte
            fontWeight: 400,        // Peso da fonte
            transition: 'all 0.3s', // Transição suave
          },
          "&:hover input::placeholder": {
            color: "white",           // Opacidade no hover
          },
          "& .Mui-focused input::placeholder": {
            color: "white",            // Cor do texto no focus
          },
        }}
      />
    </Box>
  );
};

export default InputField;