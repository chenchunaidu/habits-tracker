import type { FC } from "react";
import { useRef } from "react";
import React from "react";
import type { FormInputProps } from "./input";
import FormInput from "./input";

interface ActionData {
  data?: Record<string, any>;
  errors?: Record<string, string>;
}

export interface CustomFormProps {
  inputs: FormInputProps[];
  actionData?: ActionData;
}

const CustomForm: FC<CustomFormProps> = ({ inputs = [], actionData }) => {
  const itemsRef = useRef<any>(null);
  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  return (
    <>
      {inputs.map(({ inputProps, ...remProps }, key) => (
        <FormInput
          key={key}
          {...remProps}
          inputProps={inputProps}
          error={
            (inputProps?.name && actionData?.errors?.[inputProps?.name]) ||
            undefined
          }
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(name, node);
            } else {
              map.delete(name);
            }
          }}
        />
      ))}
    </>
  );
};

export default CustomForm;
