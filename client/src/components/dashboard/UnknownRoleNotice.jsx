const UnknownRoleNotice = ({ currentUser, onLogout }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Logged In
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-800">
          Welcome, {currentUser.name}
        </h1>
        <p className="mt-4 text-slate-600">
          You are signed in as <span className="font-semibold">{currentUser.role}</span>.
          Admin-specific dashboard sections are available only for Admin users.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-8 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UnknownRoleNotice;
