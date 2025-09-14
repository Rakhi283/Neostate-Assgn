import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const load = async () => {
    const res = await API.get("/leads");
    setLeads(res.data);
  };

  const save = async (e) => {
    e.preventDefault();
    await API.post("/leads", form);
    setForm({ name: "", email: "", phone: "" });
    load();
  };

  const convert = async (id) => {
    await API.post(`/leads/${id}/convert`, { value: 1000 });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <h3 className="mb-3">Leads</h3>
      <form onSubmit={save} className="mb-4 row g-2">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-success w-100">
            Save
          </button>
        </div>
      </form>

      <ul className="list-group">
        {leads.map((l) => (
          <li key={l._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{l.name} ({l.status})</span>
            <button onClick={() => convert(l._id)} className="btn btn-sm btn-primary">
              Convert
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
