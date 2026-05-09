const OwnerDashboard = ({
  currentUser,
  ownerSummary,
  searchText,
  setSearchText,
  activeTable,
  setActiveTable,
  ownerTableData,
  onOpenPasswordModal,
  onLogout,
  passwordModal,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,#f8fafc_45%,#ffffff)] px-4 py-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Store Owner
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Welcome, {currentUser.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View your stores and users who rated your stores.
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Stores: {ownerSummary.totalStores} | Ratings: {ownerSummary.totalRatings}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPasswordModal}
              title="Change Password"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 transition hover:bg-cyan-100"
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

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-md">
              <input
                type="text"
                placeholder="Search users or stores..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-300 focus:bg-white"
              />
            </div>

            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTable("users")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTable === "users"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Users
              </button>
              <button
                type="button"
                onClick={() => setActiveTable("stores")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTable === "stores"
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Stores
              </button>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="max-h-[460px] overflow-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="sticky top-0 bg-slate-900 text-white">
                  <tr>
                    {activeTable === "users" ? (
                      <>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Store</th>
                        <th className="px-4 py-3 font-medium">Rating</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 font-medium">Store Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Address</th>
                        <th className="px-4 py-3 font-medium">Avg Rating</th>
                        <th className="px-4 py-3 font-medium">Ratings</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {ownerTableData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={activeTable === "users" ? 4 : 5}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No records found
                      </td>
                    </tr>
                  ) : activeTable === "users" ? (
                    ownerTableData.map((user) => (
                      <tr
                        key={`${user.id}-${user.store_name}-${user.rating}`}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                        <td className="px-4 py-3 text-slate-600">{user.email}</td>
                        <td className="px-4 py-3 text-slate-600">{user.store_name}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                            {user.rating}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    ownerTableData.map((store) => (
                      <tr key={store.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium text-slate-800">{store.name}</td>
                        <td className="px-4 py-3 text-slate-600">{store.email}</td>
                        <td className="px-4 py-3 text-slate-600">{store.address}</td>
                        <td className="px-4 py-3 text-slate-600">{store.average_rating}</td>
                        <td className="px-4 py-3 text-slate-600">{store.total_ratings}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {passwordModal}
    </div>
  );
};

export default OwnerDashboard;
