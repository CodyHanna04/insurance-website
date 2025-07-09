import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const { currentUser } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    // listen to this user's policyRequests by email, newest first
    const q = query(
      collection(db, "policyRequests"),
      where("email", "==", currentUser.email),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPolicies(items);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching policies:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [currentUser]);

  // if someone somehow hits this without logging in
  if (!currentUser) {
    return (
      <div className="page-container">
        <p>Please <a href="/login">log in</a> to view your policies.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>My Policies</h2>

      {loading ? (
        <p>Loading your policies…</p>
      ) : policies.length === 0 ? (
        <p>No policy requests found. Click “Start Policy” to submit a new request.</p>
      ) : (
        <table className="client-policies-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((pol) => (
              <tr key={pol.id}>
                <td>
                  {pol.createdAt
                    ? pol.createdAt
                        .toDate()
                        .toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                    : "-"}
                </td>
                <td>
                  {pol.insuranceType
                    .split("-")
                    .map(w => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
                </td>
                <td>
                  {pol.status[0].toUpperCase() + pol.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
