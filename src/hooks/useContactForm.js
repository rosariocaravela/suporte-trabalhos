import { useState } from "react";

const initialFormData = {
  nome: "",
  email: "",
  telefone: "",
  servico: "",
  assunto: "",
  mensagem: "",
};

const useContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Futuramente será feita a chamada para o backend/API.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage(
        "Mensagem enviada com sucesso! Entraremos em contacto consigo."
      );

      setFormData(initialFormData);
    } catch {
      setErrorMessage(
        "Ocorreu um erro ao enviar a mensagem. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return {
    formData,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useContactForm;