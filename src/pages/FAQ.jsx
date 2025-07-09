import './FAQ.css';

export default function FAQ() {
  return (
    <div className="page-container">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <h3>1. What types of insurance do you offer?</h3>
        <p>
          We offer Life Insurance, Health Insurance, Final Expense, and Medicare
          Supplement plans tailored for seniors. Each policy is designed with
          affordability and simplicity in mind.
        </p>
      </div>

      <div className="faq-item">
        <h3>2. How do I start the application?</h3>
        <p>
          Simply click “Start Policy” in the header, fill out our short form,
          and our team will contact you to complete the process.
        </p>
      </div>

      <div className="faq-item">
        <h3>3. How long does it take to get coverage?</h3>
        <p>
          Most policies are approved within 1–3 business days. We’ll keep you
          updated every step of the way.
        </p>
      </div>

      <div className="faq-item">
        <h3>4. Can I change or cancel my policy later?</h3>
        <p>
          Yes. You have a 30-day free look period to review your policy. After
          that, you can still make changes or cancel at any time—just contact us.
        </p>
      </div>

      <div className="faq-item">
        <h3>5. How can I get help if I have questions?</h3>
        <p>
          Call us at <strong>(555) 123-4567</strong> or email{" "}
          <a href="mailto:support@peaceofmind.com">support@peaceofmind.com</a>.
          We’re here Monday–Friday, 9 AM–5 PM.
        </p>
      </div>
    </div>
  );
}
