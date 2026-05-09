const AddStoreSection = ({
  storeForm,
  setStoreForm,
  storeOwnerOptions,
  onSubmit,
  actionLoading,
}) => {
  return (
    <section className="max-w-3xl">
      <h1 className="text-3xl font-semibold text-slate-900">Add Store</h1>
      <p className="mt-2 text-sm text-slate-500">Add a store and assign a store owner.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Store name"
          value={storeForm.name}
          onChange={(event) =>
            setStoreForm((prev) => ({ ...prev, name: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
          required
        />
        <input
          type="email"
          placeholder="Store email"
          value={storeForm.email}
          onChange={(event) =>
            setStoreForm((prev) => ({ ...prev, email: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
          required
        />
        <input
          type="text"
          placeholder="Store address"
          value={storeForm.address}
          onChange={(event) =>
            setStoreForm((prev) => ({ ...prev, address: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300 sm:col-span-2"
          required
        />

        <select
          value={storeForm.ownerId}
          onChange={(event) =>
            setStoreForm((prev) => ({ ...prev, ownerId: event.target.value }))
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300 sm:col-span-2"
          required
        >
          <option value="">Select Store Owner</option>
          {storeOwnerOptions.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>

        {storeOwnerOptions.length === 0 && (
          <p className="text-sm text-amber-600 sm:col-span-2">
            No STORE_OWNER found. Create a STORE_OWNER user first.
          </p>
        )}

        <button
          type="submit"
          disabled={actionLoading || storeOwnerOptions.length === 0}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {actionLoading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </section>
  );
};

export default AddStoreSection;
