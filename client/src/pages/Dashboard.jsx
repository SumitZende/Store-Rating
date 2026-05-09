import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLoader from "../components/dashboard/DashboardLoader.jsx";
import PasswordModal from "../components/dashboard/PasswordModal.jsx";
import OwnerDashboard from "../components/dashboard/OwnerDashboard.jsx";
import UserDashboard from "../components/dashboard/UserDashboard.jsx";
import UnknownRoleNotice from "../components/dashboard/UnknownRoleNotice.jsx";
import AdminDashboard from "../components/dashboard/AdminDashboard.jsx";

import { adminSidebarItems } from "../components/dashboard/constants.js";

import useDashboardData from "../hooks/useDashboardData.js";
import useAdminActions from "../hooks/useAdminAction.js";
import usePasswordActions from "../hooks/usePasswordAction.js";
import useUserRatings from "../hooks/useUserRatings.js";

const Dashboard = () => {
  const navigate = useNavigate();

  // CURRENT USER

  const [currentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // UI STATE
  const [activeSection, setActiveSection] = useState("home");

  const [activeTable, setActiveTable] = useState("users");

  // DASHBOARD DATA

  const {
    loading,
    stats,
    users,

    ownerSummary,
    ownerStores,
    ownerRatedUsers,

    filteredUsers,
    filteredStores,
    filteredUserStores,

    ratingDrafts,
    setRatingDrafts,

    searchText,
    setSearchText,

    refreshAdminData,
    refreshUserData,
  } = useDashboardData(currentUser, navigate);

  // ADMIN ACTIONS

  const {
    actionLoading,

    userForm,
    setUserForm,

    storeForm,
    setStoreForm,

    handleUserFormSubmit,
    handleStoreFormSubmit,
  } = useAdminActions(refreshAdminData, setActiveSection, setActiveTable);

  // PASSWORD ACTIONS

  const {
    passwordLoading,

    isPasswordModalOpen,

    passwordForm,
    setPasswordForm,

    openPasswordModal,
    closePasswordModal,

    handlePasswordChange,
  } = usePasswordActions();

  // USER RATINGS
  const {
    ratingLoadingId,

    handleRateStore,
  } = useUserRatings(ratingDrafts, refreshUserData);

  // MEMOS

  const storeOwnerOptions = useMemo(
    () => users.filter((user) => user.role === "STORE_OWNER"),
    [users],
  );

  const tableData = activeTable === "users" ? filteredUsers : filteredStores;

  const ownerTableData =
    activeTable === "users" ? ownerRatedUsers : ownerStores;

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };

  // PASSWORD MODAL

  const passwordModal = (
    <PasswordModal
      isOpen={isPasswordModalOpen}
      onClose={closePasswordModal}
      onSubmit={handlePasswordChange}
      passwordForm={passwordForm}
      setPasswordForm={setPasswordForm}
      passwordLoading={passwordLoading}
    />
  );

  // LOADING

  if (loading) {
    return <DashboardLoader />;
  }

  // NO USER

  if (!currentUser) {
    return null;
  }

  // STORE OWNER

  if (currentUser.role === "STORE_OWNER") {
    return (
      <OwnerDashboard
        currentUser={currentUser}
        ownerSummary={ownerSummary}
        searchText={searchText}
        setSearchText={setSearchText}
        activeTable={activeTable}
        setActiveTable={setActiveTable}
        ownerTableData={ownerTableData}
        onOpenPasswordModal={openPasswordModal}
        onLogout={handleLogout}
        passwordModal={passwordModal}
      />
    );
  }

  // USER

  if (currentUser.role === "USER") {
    return (
      <UserDashboard
        currentUser={currentUser}
        searchText={searchText}
        setSearchText={setSearchText}
        filteredUserStores={filteredUserStores}
        ratingDrafts={ratingDrafts}
        setRatingDrafts={setRatingDrafts}
        ratingLoadingId={ratingLoadingId}
        onRateStore={handleRateStore}
        onOpenPasswordModal={openPasswordModal}
        onLogout={handleLogout}
        passwordModal={passwordModal}
      />
    );
  }

  // UNKNOWN ROLE

  if (currentUser.role !== "ADMIN") {
    return (
      <UnknownRoleNotice currentUser={currentUser} onLogout={handleLogout} />
    );
  }

  // ADMIN

  return (
    <AdminDashboard
      currentUser={currentUser}
      adminSidebarItems={adminSidebarItems}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      onLogout={handleLogout}
      stats={stats}
      searchText={searchText}
      setSearchText={setSearchText}
      activeTable={activeTable}
      setActiveTable={setActiveTable}
      tableData={tableData}
      userForm={userForm}
      setUserForm={setUserForm}
      onUserFormSubmit={handleUserFormSubmit}
      actionLoading={actionLoading}
      storeForm={storeForm}
      setStoreForm={setStoreForm}
      storeOwnerOptions={storeOwnerOptions}
      onStoreFormSubmit={handleStoreFormSubmit}
    />
  );
};

export default Dashboard;
