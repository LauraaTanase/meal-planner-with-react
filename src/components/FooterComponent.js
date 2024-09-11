// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <div className="container">
        <p>&copy; 2024 Rețete și Planificare Mese. Toate drepturile rezervate.</p>
        <p>
          <a href="/privacy" className="text-white">Politica de Confidențialitate</a> | 
          <a href="/terms" className="text-white ml-2">Termeni și Condiții</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
