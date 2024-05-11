import { ChangeEvent, useState } from "react";

interface UseFormValues<T = any> {
  // Define your form field types here (e.g., string, number, boolean, etc.)
  [key: string]: string | number | boolean;
}

export const useForm = <T extends UseFormValues>(
  initialState: T
): {
  values: T;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  resetForm: () => void;
} => {
  // State to store form values with type assertion for clarity
  const [values, setValues] = useState<T>(initialState);

  // Generic handleChange function
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleChange, resetForm };
};
