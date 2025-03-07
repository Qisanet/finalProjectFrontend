import React from 'react';


export default function ContactUs() {
  return (
    <div className="contact-us">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us via email or phone.</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope icon"></i>
            <a href="mailto:ksanetang@gmail.com">ksanetang@gmail.com</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt icon"></i>
            <a href="tel:+251935701691">+251 935 701 691</a>
          </div>
        </div>
      </div>
    </div>
  );
}