import React from "react";

const Footer = () => {
  return (
    <footer className="bg-opacity-15 bg-stone-950 text-gray-300 py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: info@strengthmatrix.com</p>
            <p>Phone: +65 1234 5678</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>© 2024 Strength Matrix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
