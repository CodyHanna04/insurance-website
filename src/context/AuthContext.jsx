import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setRole(snap.exists() ? snap.data().role : null);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, role, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
