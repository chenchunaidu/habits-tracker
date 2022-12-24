import type { Transition } from "@remix-run/react/dist/transition";
import type { FC } from "react";
import React from "react";
import type { ButtonProps } from "./button";
import Button from "./button";

export interface TransitionButtonText {
  loading?: string;
  submitting?: string;
  actionRedirecting?: string;
}

interface TransitionButtonProps extends ButtonProps {
  transition?: Transition;
  text?: TransitionButtonText;
}

const TransitionButton: FC<TransitionButtonProps> = ({
  transition,
  text,
  children,
}) => {
  const isSubmitting =
    transition &&
    transition.type === "actionSubmission" &&
    transition.state === "submitting" &&
    "submitting";
  const isActionRedirecting =
    transition &&
    transition.type === "actionRedirect" &&
    transition.state === "loading" &&
    "actionRedirecting";

  const currentState = isSubmitting || isActionRedirecting;

  return (
    <Button type="submit" variant="solid" disabled={!!currentState}>
      {(text && currentState && text[currentState]) || children}
    </Button>
  );
};

export default TransitionButton;
