import AdminSidebar from "./admin/AdminSidebar.jsx";
import AdminHomeSection from "./admin/AdminHomeSection.jsx";
import AddUserSection from "./admin/AddUserSection.jsx";
import AddStoreSection from "./admin/AddStoreSection.jsx";

const AdminDashboard = ({
  currentUser,
  adminSidebarItems,
  activeSection,
  setActiveSection,
  onLogout,
  stats,
  searchText,
  setSearchText,
  activeTable,
  setActiveTable,
  tableData,
  userForm,
  setUserForm,
  onUserFormSubmit,
  actionLoading,
  storeForm,
  setStoreForm,
  storeOwnerOptions,
  onStoreFormSubmit,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,#f8fafc_45%,#ffffff)] px-4 py-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[280px_1fr]">
        <AdminSidebar
          currentUser={currentUser}
          adminSidebarItems={adminSidebarItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={onLogout}
        />

        <main className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur lg:p-8">
          {activeSection === "home" && (
            <AdminHomeSection
              stats={stats}
              searchText={searchText}
              setSearchText={setSearchText}
              activeTable={activeTable}
              setActiveTable={setActiveTable}
              tableData={tableData}
            />
          )}

          {activeSection === "add-user" && (
            <AddUserSection
              userForm={userForm}
              setUserForm={setUserForm}
              onSubmit={onUserFormSubmit}
              actionLoading={actionLoading}
            />
          )}

          {activeSection === "add-store" && (
            <AddStoreSection
              storeForm={storeForm}
              setStoreForm={setStoreForm}
              storeOwnerOptions={storeOwnerOptions}
              onSubmit={onStoreFormSubmit}
              actionLoading={actionLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
