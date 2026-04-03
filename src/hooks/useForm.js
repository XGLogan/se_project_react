import { useCallback, useRef, useState } from "react";

export default function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValuesRef.current);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback((nextValues) => {
    setValues(nextValues || initialValuesRef.current);
  }, []);

  return {
    values,
    handleChange,
    setValues,
    resetForm,
  };
}