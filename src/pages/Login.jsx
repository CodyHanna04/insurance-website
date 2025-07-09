import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './AuthForm.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd]     = useState('');
  const [err, setErr]     = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pwd);
      const snap = await getDoc(doc(db, 'users', cred.user.uid));
      const role = snap.exists() ? snap.data().role : null;
      if (role === 'admin')  nav('/admin-dashboard');
      else if (role === 'client') nav('/client-dashboard');
      else {
        setErr('No role assigned.');
        await auth.signOut();
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={submit} className="auth-form">
        {err && <p className="error">{err}</p>}
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
