import type { FC, ReactNode } from "react";
import React from "react";
import type { InputProps } from "../input";
import Input from "../input";
import Label from "../label";
import type { TextAreaProps } from "../text-area";
import TextArea from "../text-area";
import Text from "../text";
import type { SelectProps } from "../select";
import Select from "../select";

type FormInputTypes = "default" | "textarea" | "select";

interface FormInputProps {
  error?: string;
  label?: string;
  validator?: Function | Function[];
  formInputType?: FormInputTypes;
  inputProps: InputProps | TextAreaProps | SelectProps;
  helperText?: ReactNode;
  disabledMessage?: ReactNode;
}

const FormInputs = {
  default: Input,
  textarea: TextArea,
  select: Select,
};

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormInputProps
>(
  (
    {
      error,
      label,
      formInputType = "default",
      inputProps: { id, ...props } = {},
      helperText,
      disabledMessage,
    },
    ref
  ) => {
    const Component = FormInputs[formInputType];
    return (
      <div>
        <Label htmlFor={id}>
          <div className="flex space-x-2">
            <Text
              className={`${props.disabled ? "opacity-60" : "opacity-100"}`}
            >
              {label}
            </Text>
          </div>
          {(helperText || (props.disabled && disabledMessage)) && (
            <div className="pb-1 text-xs text-slate-500" id="helper-text">
              {props.disabled && disabledMessage ? disabledMessage : helperText}
            </div>
          )}
          {<Component id={id} {...props}></Component>}
        </Label>
        {error && (
          <div className="pt-1 text-xs text-rose-600" id="email-error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
export type { FormInputProps };
