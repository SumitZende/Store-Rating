const AdminSidebar = ({
  currentUser,
  adminSidebarItems,
  activeSection,
  setActiveSection,
  onLogout,
}) => {
  return (
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-xl shadow-slate-200/80 backdrop-blur">
      <div className="rounded-2xl bg-slate-900 p-4 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Admin Panel</p>
        <h2 className="mt-2 text-xl font-semibold">{currentUser.name}</h2>
        <p className="mt-1 text-sm text-slate-300">Manage users, stores and ratings</p>
      </div>

      <nav className="mt-5 space-y-2">
        {adminSidebarItems.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
              activeSection === item.id
                ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
            }`}
          >
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-xs text-slate-400">{item.hint}</p>
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-5 w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
