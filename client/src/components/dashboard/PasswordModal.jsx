const PasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  passwordForm,
  setPasswordForm,
  passwordLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Change Password</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your password to keep your account secure.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <input
            type="password"
            placeholder="Old password"
            value={passwordForm.oldPassword}
            onChange={(event) =>
              setPasswordForm((prev) => ({
                ...prev,
                oldPassword: event.target.value,
              }))
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            onChange={(event) =>
              setPasswordForm((prev) => ({
                ...prev,
                newPassword: event.target.value,
              }))
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={passwordForm.confirmPassword}
            onChange={(event) =>
              setPasswordForm((prev) => ({
                ...prev,
                confirmPassword: event.target.value,
              }))
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            required
          />

          <button
            type="submit"
            disabled={passwordLoading}
            className="mt-1 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
