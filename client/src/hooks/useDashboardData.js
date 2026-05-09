import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const validRoles = ["ADMIN", "STORE_OWNER", "USER"];

const useDashboardData = (currentUser, navigate) => {
  const [loading, setLoading] = useState(() =>
    validRoles.includes(currentUser?.role),
  );

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [ownerStores, setOwnerStores] = useState([]);
  const [ownerRatedUsers, setOwnerRatedUsers] = useState([]);

  const [ownerSummary, setOwnerSummary] = useState({
    totalStores: 0,
    totalRatings: 0,
  });

  const [userStores, setUserStores] = useState([]);
  const [ratingDrafts, setRatingDrafts] = useState({});

  const [searchText, setSearchText] = useState("");

  // FETCH ADMIN DATA

  const refreshAdminData = async () => {
    const [summaryRes, usersRes, storesRes] = await Promise.all([
      api.get("/dashboard/admin/summary"),
      api.get("/dashboard/admin/users"),
      api.get("/dashboard/admin/stores"),
    ]);

    setStats({
      totalUsers: summaryRes.data.totalUsers ?? 0,
      totalStores: summaryRes.data.totalStores ?? 0,
      totalRatings: summaryRes.data.totalRatings ?? 0,
    });

    setUsers(usersRes.data || []);
    setStores(storesRes.data || []);
  };

  // FETCH OWNER DATA

  const refreshOwnerData = async () => {
    const ownerRes = await api.get("/dashboard/owner");

    const payload = ownerRes.data || {};

    setOwnerStores(payload.stores || []);

    setOwnerRatedUsers(payload.ratedUsers || []);

    setOwnerSummary({
      totalStores: payload?.summary?.totalStores ?? 0,

      totalRatings: payload?.summary?.totalRatings ?? 0,
    });
  };

  // FETCH USER DATA

  const refreshUserData = async () => {
    const storesRes = await api.get("/store/detail");

    const payload = storesRes.data || [];

    setUserStores(payload);

    setRatingDrafts(
      payload.reduce((acc, store) => {
        acc[store.id] = store.user_rating || "";

        return acc;
      }, {}),
    );
  };

  // INITIAL LOAD

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !currentUser) {
      navigate("/");
      return;
    }

    const loadDashboard = async () => {
      try {
        if (currentUser.role === "ADMIN") {
          await refreshAdminData();
        } else if (currentUser.role === "STORE_OWNER") {
          await refreshOwnerData();
        } else {
          await refreshUserData();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // FILTERS

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.name, user.email]
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [users, searchText]);

  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      [store.name, store.email]
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [stores, searchText]);

  const filteredUserStores = useMemo(() => {
    return userStores.filter((store) =>
      [store.name, store.email]
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [userStores, searchText]);

  return {
    loading,

    stats,
    users,
    stores,

    ownerStores,
    ownerRatedUsers,
    ownerSummary,

    userStores,

    filteredUsers,
    filteredStores,
    filteredUserStores,

    ratingDrafts,
    setRatingDrafts,

    searchText,
    setSearchText,

    refreshAdminData,
    refreshUserData,
  };
};

export default useDashboardData;
