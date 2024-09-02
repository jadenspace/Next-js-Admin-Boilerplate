"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import CustomInput from "@/components/ui/form-elements/CustomInput";

interface ISignInOptions {
  id: string;
  password: string;
  redirect?: boolean;
}

export default function SigninForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async function (data: ISignInOptions) {
    const { id, password } = data;
    if (id === "") {
      alert("please enter your id");
      return;
    }
    if (password === "") {
      alert("please enter your password");
      return;
    }
    const options = {
      id,
      password,
      redirect: false,
    };
    const res: any = await signIn("email-credentials", { ...options });
    if (res.ok) {
      router.push(`/main`);
    } else {
      alert("login failed");
    }
  };

  return (
    <form className="flex w-full max-w-[375px] flex-col gap-4 px-[10px]" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput name="id" control={control} textFieldProps={{ variant: "outlined", label: "ID" }} />
      <CustomInput
        name="password"
        control={control}
        textFieldProps={{ variant: "outlined", label: "Password", type: "password" }}
      />
      <Button type="submit" variant="contained">
        SignIn
      </Button>
    </form>
  );
}
