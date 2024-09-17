import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container-fluid">
        <p>&copy; 2024 Recipe and Meal Planning. All rights reserved.</p>
        <p>
          <a href="/privacy" className="text-white">Privacy Policy</a> | 
          <a href="/terms" className="text-white ms-2">Terms and Conditions</a>
        </p>
      </div>
    </footer>
  );
};
console.log(FooterComponent)
export default FooterComponent;