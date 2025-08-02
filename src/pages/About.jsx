import './About.css';

export default function About() {
  return (
    <div className="page-container">
      <h2>About Peace of Mind Insurance</h2>
      <p className="intro">
        At Peace of Mind Insurance, our mission is simple: to provide clear,
        affordable coverage options for seniors, backed by honest advice and
        real human support.
      </p>

      <section className="team-section">
        <h3>Meet Our Team</h3>
        <div className="team-grid">
          <div className="team-member">
            <img src={"./fake-person1.jpg"} alt="Jane Doe" />
            <h4>Jane Doe</h4>
            <p>Founder &amp; Senior Advisor</p>
          </div>
          <div className="team-member">
            <img src={"/fake-person2.jpg"} alt="John Smith" />
            <h4>John Smith</h4>
            <p>Claims Specialist</p>
          </div>
          <div className="team-member">
            <img src={"/fake-person3.jpg"} alt="Johnny Johnson" />
            <h4>Johnny Johnson</h4>
            <p>Customer Support Lead</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h3>Our Core Values</h3>
        <ul>
          <li>🤝 Integrity: We always put your needs first.</li>
          <li>🔍 Transparency: No hidden fees or confusing terms.</li>
          <li>💬 Empathy: We listen to your concerns and answer your questions.</li>
          <li>⚖️ Fairness: Policies priced with seniors’ budgets in mind.</li>
        </ul>
      </section>
    </div>
  );
}
