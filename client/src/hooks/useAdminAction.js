import { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const useAdminActions = (
  refreshAdminData,
  setActiveSection,
  setActiveTable,
) => {
  const [actionLoading, setActionLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  // CREATE USER

  const handleUserFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);

      await api.post("/auth/signup", {
        ...userForm,
      });

      toast.success("User created successfully");

      setUserForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER",
      });

      await refreshAdminData();

      setActiveSection("home");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setActionLoading(false);
    }
  };

  // CREATE STORE

  const handleStoreFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);

      await api.post("/store/create", {
        ...storeForm,
      });

      toast.success("Store created successfully");

      setStoreForm({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

      await refreshAdminData();

      setActiveSection("home");

      setActiveTable("stores");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setActionLoading(false);
    }
  };

  return {
    actionLoading,

    userForm,
    setUserForm,

    storeForm,
    setStoreForm,

    handleUserFormSubmit,
    handleStoreFormSubmit,
  };
};

export default useAdminActions;
