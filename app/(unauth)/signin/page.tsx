import Image from "next/image";

import SigninForm from "@/components/pages/signin/SigninForm";

export default function Signin() {
  return (
    <div className="fixed flex h-full w-full flex-col items-center justify-center gap-20">
      <h1>
        <Image
          src="https://vercel.com/mktng/_next/static/media/logo-vercel-logotype-light.700a8d26.svg"
          alt="Logo"
          width={283}
          height={64}
        />
      </h1>
      <SigninForm />
    </div>
  );
}
