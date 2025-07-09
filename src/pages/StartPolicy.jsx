// src/pages/StartPolicy.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./StartPolicy.css";

export default function StartPolicy() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    insuranceType: "",
    contactMethod: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "policyRequests"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      alert("Form submitted successfully!");
      // reset form
      setFormData({
        name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        insuranceType: "",
        contactMethod: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error adding document:", err);
      setError("Failed to submit. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="page-container">
      <h2>Start a Policy</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="policy-form">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          required
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          required
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          required
          onChange={handleChange}
        />

        <label>Type of Insurance</label>
        <select
          name="insuranceType"
          value={formData.insuranceType}
          required
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="life">Life Insurance</option>
          <option value="health">Health Insurance</option>
          <option value="final-expense">Final Expense</option>
          <option value="medicare">Medicare Supplement</option>
        </select>

        <label>Preferred Contact Method</label>
        <select
          name="contactMethod"
          value={formData.contactMethod}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="phone">Phone Call</option>
          <option value="email">Email</option>
          <option value="mail">Mail</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit Policy Request"}
        </button>
      </form>
    </div>
  );
}
