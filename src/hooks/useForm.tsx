import { useState, ChangeEvent } from "react";

type FormType<T extends Record<string, string>> = {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
};

export function useForm<T extends Record<string, string>>(
  inputValues: T = {} as T,
): FormType<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
