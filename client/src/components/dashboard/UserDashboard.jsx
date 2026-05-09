const UserDashboard = ({
  currentUser,
  searchText,
  setSearchText,
  filteredUserStores,
  ratingDrafts,
  setRatingDrafts,
  ratingLoadingId,
  onRateStore,
  onOpenPasswordModal,
  onLogout,
  passwordModal,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7,#f8fafc_45%,#ffffff)] px-4 py-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              User Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Welcome, {currentUser.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Search stores, submit or update your ratings, and manage your account password.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPasswordModal}
              title="Change Password"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V8a5 5 0 0 1 10 0v3" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              Logout
            </button>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">All Stores</h2>
            <div className="w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search store by name, address, email..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              />
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="max-h-[480px] overflow-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="sticky top-0 bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium">Store Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Address</th>
                    <th className="px-4 py-3 font-medium">Avg Rating</th>
                    <th className="px-4 py-3 font-medium">Your Rating</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserStores.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        No stores found
                      </td>
                    </tr>
                  ) : (
                    filteredUserStores.map((store) => (
                      <tr key={store.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium text-slate-800">{store.name}</td>
                        <td className="px-4 py-3 text-slate-600">{store.email}</td>
                        <td className="px-4 py-3 text-slate-600">{store.address}</td>
                        <td className="px-4 py-3 text-slate-600">{store.average_rating}</td>
                        <td className="px-4 py-3">
                          <select
                            value={ratingDrafts[store.id] ?? ""}
                            onChange={(event) =>
                              setRatingDrafts((prev) => ({
                                ...prev,
                                [store.id]: event.target.value,
                              }))
                            }
                            className="w-24 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none focus:border-emerald-300"
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => onRateStore(store.id)}
                            disabled={ratingLoadingId === store.id}
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {ratingLoadingId === store.id ? "Saving..." : "Save Rating"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {passwordModal}
      </div>
    </div>
  );
};

export default UserDashboard;
