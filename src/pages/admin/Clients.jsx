import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Clients.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'users'));
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setClients(all.filter(u => u.role === 'client'));
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading clients…</p>;

  return (
    <div className="clients-page">
      <h2>Clients</h2>
      <table className="clients-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.email}</td>
              <td>{c.displayName || '-'}</td>
              <td>
                {c.createdAt
                  ? c.createdAt.toDate().toLocaleDateString()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
