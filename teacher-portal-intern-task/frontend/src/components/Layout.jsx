import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useAuth();
  const firstName = user?.first_name || "Team";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <p className="sidebar-tag">Intern Task</p>
        <h1>Teacher Portal</h1>
        <p className="subtitle">Auth + Teacher onboarding workspace</p>

        <nav>
          <NavLink to="/">Create Teacher</NavLink>
          <NavLink to="/users">Auth Users Table</NavLink>
          <NavLink to="/teachers">Teachers Table</NavLink>
        </nav>

        <div className="profile-card">
          <p>Signed in as</p>
          <strong>
            {user?.first_name} {user?.last_name}
          </strong>
          <span>{user?.email}</span>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">JWT Protected Workspace</p>
            <h2>Hello, {firstName}</h2>
          </div>
          <span className="topbar-pill">Token Auth Enabled</span>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
