import type { FC } from "react";
import AuthContainer from "./auth-container";
import { Form, Link } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { loginFormData } from "./login.data";
import Text from "../common/text";
import type { Transition } from "@remix-run/react/dist/transition";
import TransitionButton from "../common/transition-button";
import Image from "../common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";

export interface LoginActionData {
  data?: {
    email?: string;
    password?: string;
    server?: string;
  };
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
}

interface LoginProps {
  actionData: LoginActionData;
  transition?: Transition;
}

const Login: FC<LoginProps> = ({ actionData, transition }) => {
  return (
    <AuthContainer>
      <div className="flex h-full w-full flex-col space-y-4 bg-white p-5 md:space-y-14 md:p-10">
        <Image src={logo} className="h-10 md:h-16" />
        <Form method="post">
          <div className="flex flex-col space-y-4">
            <CustomForm inputs={loginFormData} actionData={actionData} />
            <div className="pt-1 text-xs text-rose-600">
              {actionData?.errors?.server}
            </div>
            <Text>
              Don't have account?
              <Link to="/sign-up" className="ml-2 underline">
                Create new account
              </Link>
            </Text>

            <TransitionButton
              type="submit"
              variant="solid"
              transition={transition}
              text={{
                submitting: "Logging in ...",
                actionRedirecting: "Logged in... redirecting",
              }}
            >
              Login
            </TransitionButton>
          </div>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default Login;
