import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ht-footer-simple" role="contentinfo">
      <a href="#main-content" className="ht-skip">
        Skip to main content
      </a>

      <div className="ht-footer-simple__inner">
        {/* Brand */}
        

        {/* Social icons */}
        <div className="ht-footer-simple__social">
          <a
            href="https://www.facebook.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/YourProfile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/YourCompany"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/YourRepo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="ht-footer-simple__bottom">
        <p>
          &copy; {new Date().getFullYear()} ShannyTechSolutions. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
