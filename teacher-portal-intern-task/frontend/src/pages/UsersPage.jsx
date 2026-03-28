import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { fetchUsers } from "../api/userApi";

const columns = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "created_at", label: "Created At" },
];

function UsersPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchUsers();
        setRows(response.data.data ?? []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load users");
      }
    };

    load();
  }, []);

  return (
    <>
      <DataTable
        title="Auth Users"
        subtitle="Primary account data from auth_user table"
        columns={columns}
        rows={rows}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
}

export default UsersPage;
