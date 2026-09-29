import { useState } from "react";
import { createSupportRequest } from "../services/requestService";

const initialFormData = (serviceId = "") => ({
  telefone: "",
   servico: serviceId,
   prioridade: "MEDIUM",
  assunto: "",
  mensagem: "",
});

const useContactForm = (serviceId = "") => {
  const [formData, setFormData] = useState(() => initialFormData(serviceId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createdRequestId, setCreatedRequestId] = useState(null);

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
    setCreatedRequestId(null);

    try {
      const request = await createSupportRequest({
        serviceId: formData.servico,
        subject: formData.assunto,
        description: formData.mensagem,
        contactPhone: formData.telefone,
        priority: formData.prioridade,
      });
      setCreatedRequestId(request.id);
      setSuccessMessage("Pedido criado. Já pode acompanhar o estado na sua área de cliente.");
      setFormData(initialFormData(serviceId));
    } catch (submitError) {
      console.error("Não foi possível criar o pedido:", submitError);
      setErrorMessage(
        "Não foi possível enviar o pedido. Verifique a ligação e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData(serviceId));
    setSuccessMessage("");
    setErrorMessage("");
    setCreatedRequestId(null);
  };

  return {
    formData,
    isSubmitting,
    successMessage,
    errorMessage,
    createdRequestId,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useContactForm;