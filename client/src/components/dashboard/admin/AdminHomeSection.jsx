const AdminHomeSection = ({
  stats,
  searchText,
  setSearchText,
  activeTable,
  setActiveTable,
  tableData,
}) => {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor platform numbers and quickly browse all users and stores.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-5">
          <p className="text-sm text-cyan-700">Total Users</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalUsers}</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">
          <p className="text-sm text-amber-700">Total Stores</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalStores}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
          <p className="text-sm text-emerald-700">Total Ratings</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalRatings}</p>
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
                      <th className="px-4 py-3 font-medium">Address</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 font-medium">Store Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Address</th>
                      <th className="px-4 py-3 font-medium">Owner</th>
                      <th className="px-4 py-3 font-medium">Avg Rating</th>
                      <th className="px-4 py-3 font-medium">Ratings</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={activeTable === "users" ? 4 : 6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No records found
                    </td>
                  </tr>
                ) : activeTable === "users" ? (
                  tableData.map((user) => (
                    <tr key={user.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                      <td className="px-4 py-3 text-slate-600">{user.email}</td>
                      <td className="px-4 py-3 text-slate-600">{user.address}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  tableData.map((store) => (
                    <tr key={store.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-800">{store.name}</td>
                      <td className="px-4 py-3 text-slate-600">{store.email}</td>
                      <td className="px-4 py-3 text-slate-600">{store.address}</td>
                      <td className="px-4 py-3 text-slate-600">{store.owner_name}</td>
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
    </section>
  );
};

export default AdminHomeSection;
