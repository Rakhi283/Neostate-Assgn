import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

export default function Opportunities() {
  const [opps, setOpps] = useState([]);

  const load = async () => {
    const res = await API.get("/opportunities");
    setOpps(res.data);
  };

  const updateStage = async (id, stage) => {
    await API.put(`/opportunities/${id}`, { stage });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <h3 className="mb-3">Opportunities</h3>
      <ul className="list-group">
        {opps.map((o) => (
          <li key={o._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{o.title} - ${o.value}</span>
            <select
              value={o.stage}
              onChange={(e) => updateStage(o._id, e.target.value)}
              className="form-select w-auto"
            >
              <option>Discovery</option>
              <option>Proposal</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
