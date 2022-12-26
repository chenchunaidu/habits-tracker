import React from "react";
import Fullscreen from "~/components/common/full-screen";
import Image from "~/components/common/image";
import logo from "~/assets/images/trackbit.svg";

export default function EmailConfirmation() {
  return (
    <Fullscreen className="flex items-center justify-center bg-lime-500">
      <div className="flex flex-col items-center space-y-4 rounded-md bg-white p-8">
        <Image src={logo} className="h-12" />
        <div className="max-w-sm text-center text-lime-700">
          We have sent a confirmation email to your account. Please confirm your
          email.
        </div>
      </div>
    </Fullscreen>
  );
}
