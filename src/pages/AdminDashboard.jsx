// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as secondarySignOut
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db, secondaryAuth } from '../firebase';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [creating, setCreating] = useState(false);
  const [error, setError]       = useState('');

  // fetch policyRequests
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'policyRequests'));
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  // approve a request → create client user
  const handleApprove = async (req) => {
    setError('');
    setCreating(true);
    try {
      // 1. create Auth user with random password
      const randomPass = Math.random().toString(36).slice(-8);
      const { user } = await createUserWithEmailAndPassword(
        secondaryAuth,
        req.email,
        randomPass
      );

      // 2. write users/{uid} in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email:      req.email,
        role:       'client',
        displayName:req.name,
        createdAt:  serverTimestamp()
      });

      // 3. send password-reset so they set their own
      await sendPasswordResetEmail(secondaryAuth, req.email);

      // 4. sign out of secondary so admin stays logged in
      await secondarySignOut(secondaryAuth);

      // 5. update request status
      await updateDoc(doc(db, 'policyRequests', req.id), {
        status: 'approved'
      });

      alert(`✅ ${req.email} created. Password-reset email sent.`);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
    setCreating(false);
  };

  // manual “Add User” form
  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);

    const email = e.target.email.value;
    const role  = e.target.role.value;

    try {
      const randomPass = Math.random().toString(36).slice(-8);
      const { user } = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        randomPass
      );

      await setDoc(doc(db, 'users', user.uid), {
        email,
        role,
        createdAt: serverTimestamp()
      });

      await sendPasswordResetEmail(secondaryAuth, email);
      await secondarySignOut(secondaryAuth);

      alert(`✅ ${email} (${role}) created. Password-reset email sent.`);
      e.target.reset();
    } catch (e) {
      console.error(e);
      setError(e.message);
    }

    setCreating(false);
  };

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <section className="requests">
        <h3>Pending Policy Requests</h3>
        <ul>
          {requests.filter(r => r.status !== 'approved').map(r => (
            <li key={r.id}>
              <strong>{r.name}</strong> — {r.email}
              <button
                disabled={creating}
                onClick={() => handleApprove(r)}
              >
                Approve &amp; Create Account
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="manual-add">
        <h3>Manually Add User</h3>
        <form onSubmit={handleAddUser}>
          <label>Email</label>
          <input name="email" type="email" required />

          <label>Role</label>
          <select name="role" required>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={creating}>
            Create User &amp; Send Invite
          </button>
        </form>
      </section>
    </div>
  );
}
