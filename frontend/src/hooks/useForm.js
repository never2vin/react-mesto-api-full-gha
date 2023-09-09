import { useState } from "react";

const useForm = (initialState, onSubmit) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const input = e.target;

    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });

    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  const setInitialState = () =>  {
    setForm(initialState);
    setErrors({});
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();

    onSubmit(form);
  }

  return { form, errors, handleChange, handleSubmit, setInitialState };
};

export default useForm;
