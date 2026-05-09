const AddUserSection = ({ userForm, setUserForm, onSubmit, actionLoading }) => {
  return (
    <section className="max-w-3xl">
      <h1 className="text-3xl font-semibold text-slate-900">Add User</h1>
      <p className="mt-2 text-sm text-slate-500">
        Create a new system user from the admin panel.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Full name"
          value={userForm.name}
          onChange={(event) =>
            setUserForm((prev) => ({ ...prev, name: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
          required
        />
        <input
          type="email"
          placeholder="Email address"
          value={userForm.email}
          onChange={(event) =>
            setUserForm((prev) => ({ ...prev, email: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={userForm.address}
          onChange={(event) =>
            setUserForm((prev) => ({ ...prev, address: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300 sm:col-span-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userForm.password}
          onChange={(event) =>
            setUserForm((prev) => ({ ...prev, password: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
          required
        />
        <select
          value={userForm.role}
          onChange={(event) =>
            setUserForm((prev) => ({ ...prev, role: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
        >
          <option value="USER">USER</option>
          <option value="STORE_OWNER">STORE_OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          disabled={actionLoading}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {actionLoading ? "Creating..." : "Create User"}
        </button>
      </form>
    </section>
  );
};

export default AddUserSection;
