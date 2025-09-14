import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContex";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
    } catch {
      setErr("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className="card shadow"
        style={{ width: "30%", height: "60vh" }}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
            {err && <p className="text-danger mt-2">{err}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
