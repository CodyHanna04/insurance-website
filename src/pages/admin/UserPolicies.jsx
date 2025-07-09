import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../firebase';
import './UserPolicies.css';

export default function UserPolicies() {
  const [clients, setClients]               = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [policies, setPolicies]             = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [formData, setFormData]             = useState({
    policyNumber: '',
    policyType: '',
    coverageAmount: '',
    premium: '',
    effectiveDate: '',
    expirationDate: '',
    terms: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');

  // Fetch all client users
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'users'));
      const all  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setClients(all.filter(u => u.role === 'client'));
      setLoadingClients(false);
    })();
  }, []);

  // Fetch policies for selected client
  useEffect(() => {
    if (!selectedClient) {
      setPolicies([]);
      return;
    }
    setLoadingPolicies(true);
    (async () => {
      const q = query(
        collection(db, 'policies'),
        where('clientId', '==', selectedClient),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setPolicies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingPolicies(false);
    })();
  }, [selectedClient]);

  const handleClientChange = e => {
    setSelectedClient(e.target.value);
    setError('');
  };

  const handleInputChange = e => {
    setFormData(fd => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleAddPolicy = async e => {
    e.preventDefault();
    if (!selectedClient) return setError('Please select a client first.');
    setError(''); setSubmitting(true);
    try {
      await addDoc(collection(db, 'policies'), {
        clientId: selectedClient,
        ...formData,
        createdAt: serverTimestamp()
      });
      // reset form & reload policies
      setFormData({
        policyNumber: '',
        policyType: '',
        coverageAmount: '',
        premium: '',
        effectiveDate: '',
        expirationDate: '',
        terms: ''
      });
      // reload
      const q = query(
        collection(db, 'policies'),
        where('clientId', '==', selectedClient),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setPolicies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setError('Failed to add policy.');
    }
    setSubmitting(false);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this policy?')) return;
    await deleteDoc(doc(db, 'policies', id));
    setPolicies(ps => ps.filter(p => p.id !== id));
  };

  return (
    <div className="page-container user-policies-page">
      <h2>User Policies</h2>
      {error && <p className="error">{error}</p>}

      <div className="select-client">
        <label>Select Client:</label>
        {loadingClients
          ? <p>Loading clients…</p>
          : (
            <select value={selectedClient} onChange={handleClientChange}>
              <option value="">-- choose client --</option>
              {clients.map(c =>
                <option key={c.id} value={c.id}>
                  {c.displayName || c.email}
                </option>
              )}
            </select>
          )
        }
      </div>

      {selectedClient && (
        <>
          <section className="existing-policies">
            <h3>Existing Policies</h3>
            {loadingPolicies
              ? <p>Loading policies…</p>
              : policies.length === 0
                ? <p>No policies yet for this client.</p>
                : (
                  <table className="policies-table">
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Type</th>
                        <th>Coverage</th>
                        <th>Premium</th>
                        <th>Effective</th>
                        <th>Expires</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map(p => (
                        <tr key={p.id}>
                          <td>{p.policyNumber}</td>
                          <td>{p.policyType}</td>
                          <td>{p.coverageAmount}</td>
                          <td>{p.premium}</td>
                          <td>{p.effectiveDate}</td>
                          <td>{p.expirationDate}</td>
                          <td>
                            <button onClick={() => handleDelete(p.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
            }
          </section>

          <section className="add-policy">
            <h3>Add New Policy</h3>
            <form onSubmit={handleAddPolicy} className="add-policy-form">
              <label>Policy Number</label>
              <input
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleInputChange}
                required
              />

              <label>Policy Type</label>
              <input
                name="policyType"
                value={formData.policyType}
                onChange={handleInputChange}
                placeholder="e.g. Life, Health, Final Expense"
                required
              />

              <label>Coverage Amount</label>
              <input
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleInputChange}
                placeholder="e.g. $50,000"
                required
              />

              <label>Premium</label>
              <input
                name="premium"
                value={formData.premium}
                onChange={handleInputChange}
                placeholder="e.g. $100/month"
                required
              />

              <label>Effective Date</label>
              <input
                type="date"
                name="effectiveDate"
                value={formData.effectiveDate}
                onChange={handleInputChange}
                required
              />

              <label>Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />

              <label>Terms &amp; Agreements</label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
                placeholder="Paste or write your policy terms here"
                rows={4}
                required
              />

              <button type="submit" disabled={submitting}>
                {submitting ? 'Adding…' : 'Add Policy'}
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
