import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 fixed-bottom">
      <div className="container-fluid">
        <p className="mb-0">&copy; 2024 Recipe and Meal Planning. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy" className="text-white">Privacy Policy</a> | 
          <a href="/terms" className="text-white ms-2">Terms and Conditions</a>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
