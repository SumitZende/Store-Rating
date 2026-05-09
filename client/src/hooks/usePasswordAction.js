import { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const usePasswordActions = () => {
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // OPEN MODAL

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  // CLOSE MODAL

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);

    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // CHANGE PASSWORD

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setPasswordLoading(true);

      const { data } = await api.put("/auth/change-password", {
        oldPassword: passwordForm.oldPassword,

        newPassword: passwordForm.newPassword,
      });

      toast.success(data?.message || "Password updated");

      closePasswordModal();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    passwordLoading,

    isPasswordModalOpen,

    passwordForm,
    setPasswordForm,

    openPasswordModal,
    closePasswordModal,

    handlePasswordChange,
  };
};

export default usePasswordActions;
