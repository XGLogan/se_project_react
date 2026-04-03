import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">Developed by Logan O'Connor</span>
      <span className="footer__year">{new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
