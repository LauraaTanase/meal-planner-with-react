import React from 'react';

const FooterComponent = () => {
  const footerStyle = {
    backgroundColor: '#001a00',
  };

  return (
    <footer className="text-white text-center py-3 mt-auto" style={footerStyle}>
      <div className="container">
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
