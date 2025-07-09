import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './ManagePolicies.css';

export default function ManagePolicies() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'policyRequests'));
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    })();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'policyRequests', id), { status });
    setRequests(rs =>
      rs.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  if (loading) return <p>Loading requests…</p>;

  return (
    <div className="manage-policies-page">
      <h2>Manage Policy Requests</h2>
      <table className="policy-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.insuranceType}</td>
              <td>{req.status}</td>
              <td>
                {req.status !== 'approved' && (
                  <button onClick={() => updateStatus(req.id, 'approved')}>
                    Approve
                  </button>
                )}
                {req.status !== 'pending' && (
                  <button onClick={() => updateStatus(req.id, 'pending')}>
                    Pending
                  </button>
                )}
                <button onClick={() => updateStatus(req.id, 'rejected')}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
