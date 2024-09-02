import { TextField, TextFieldProps } from "@mui/material";
import { useController, FieldValues, FieldPath, UseControllerProps } from "react-hook-form";

interface MuiProps {
  textFieldProps?: TextFieldProps;
}

export default function CustomInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ textFieldProps, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <TextField {...textFieldProps} {...field} error={!!error} helperText={!!error && error.message} />;
}
