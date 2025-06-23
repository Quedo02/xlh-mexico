import { useState } from "react";

type FormData = {
  [key: string]: string | boolean | string[];
};

export function useRegistroForm() {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...((prev[name] as string[]) || []), value]
          : ((prev[name] as string[]) || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí llama a API o lógica de guardado
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
