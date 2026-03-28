import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { fetchTeachers } from "../api/teacherApi";

const columns = [
  { key: "id", label: "ID" },
  { key: "user_id", label: "User ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "university_name", label: "University" },
  { key: "gender", label: "Gender" },
  { key: "year_joined", label: "Year Joined" },
];

function TeachersPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchTeachers();
        setRows(response.data.data ?? []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load teachers");
      }
    };

    load();
  }, []);

  return (
    <>
      <DataTable
        title="Teachers"
        subtitle="Extended academic profile from teachers table"
        columns={columns}
        rows={rows}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
}

export default TeachersPage;
