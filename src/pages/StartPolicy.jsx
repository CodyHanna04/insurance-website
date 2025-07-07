import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Policy Form:", formData);
    alert("Form submitted successfully!");
    // In future: send to Firebase, EmailJS, etc.
  };

  return (
    <div className="form-page">
      <h2>Start a Policy</h2>
      <form onSubmit={handleSubmit} className="policy-form">
        <label>Full Name</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Date of Birth</label>
        <input type="date" name="dob" required onChange={handleChange} />

        <label>Phone Number</label>
        <input type="tel" name="phone" required onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Address</label>
        <textarea name="address" required onChange={handleChange}></textarea>

        <label>Type of Insurance</label>
        <select name="insuranceType" required onChange={handleChange}>
          <option value="">Select...</option>
          <option value="life">Life Insurance</option>
          <option value="health">Health Insurance</option>
          <option value="final-expense">Final Expense</option>
          <option value="medicare">Medicare Supplement</option>
        </select>

        <label>Preferred Contact Method</label>
        <select name="contactMethod" onChange={handleChange}>
          <option value="">Select...</option>
          <option value="phone">Phone Call</option>
          <option value="email">Email</option>
          <option value="mail">Mail</option>
        </select>

        <label>Additional Notes</label>
        <textarea name="notes" onChange={handleChange}></textarea>

        <button type="submit">Submit Policy Request</button>
      </form>
    </div>
  );
}
