import React from "react";
import Fullscreen from "~/components/common/full-screen";
import Image from "~/components/common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";

export default function EmailConfirmation() {
  return (
    <Fullscreen className="flex items-center justify-center bg-violet-500">
      <div className="bg-white p-8 rounded-md flex flex-col items-center space-y-4">
        <Image src={logo} className="h-12" />
        <div className="max-w-sm text-center text-violet-700">
          We have sent a confirmation email to your account. Please confirm your
          email.
        </div>
      </div>
    </Fullscreen>
  );
}
