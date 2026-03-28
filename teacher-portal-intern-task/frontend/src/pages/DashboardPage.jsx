import { useState } from "react";
import { createTeacherWithUser } from "../api/teacherApi";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  university_name: "",
  gender: "male",
  year_joined: "",
};

function DashboardPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await createTeacherWithUser({
        ...form,
        year_joined: Number(form.year_joined),
      });
      setSuccess(
        `${response.data.message} (User ID: ${response.data.data.user_id}, Teacher ID: ${response.data.data.teacher_id})`
      );
      setForm(initialState);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).join(", "));
      } else {
        setError(err.response?.data?.message || "Failed to create teacher");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="metric-strip">
        <article className="metric-card">
          <h3>Single Transaction</h3>
          <p>One API call inserts into auth_user and teachers safely.</p>
        </article>
        <article className="metric-card">
          <h3>JWT Protected</h3>
          <p>Only authenticated users can create and view records.</p>
        </article>
        <article className="metric-card">
          <h3>Relational Integrity</h3>
          <p>teachers.user_id maps 1-1 with auth_user.id.</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Create User + Teacher (Single API)</h2>
            <p className="panel-subtitle">
              Payload writes to both tables and preserves relationship.
            </p>
          </div>
          <span className="panel-pill">POST /api/teachers</span>
        </div>

        <form className="grid-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
            />
          </label>

          <label>
            Last Name
            <input
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <label>
            University Name
            <input
              value={form.university_name}
              onChange={(e) =>
                setForm({ ...form, university_name: e.target.value })
              }
              required
            />
          </label>

          <label>
            Gender
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Year Joined
            <input
              type="number"
              min="1980"
              max="2100"
              value={form.year_joined}
              onChange={(e) => setForm({ ...form, year_joined: e.target.value })}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Record"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </section>
    </>
  );
}

export default DashboardPage;
