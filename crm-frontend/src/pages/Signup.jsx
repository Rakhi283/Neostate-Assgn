import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User", 
  });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      setSuccess("Account created successfully! Redirecting to login...");
      setErr("");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setErr("Signup failed. Try again.");
      setSuccess("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="card shadow" style={{ width: "40%", minWidth: "350px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-success w-100" type="submit">
              Sign Up
            </button>
            {err && <p className="text-danger mt-2">{err}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
