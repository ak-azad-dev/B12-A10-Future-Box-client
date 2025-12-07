import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-10 pt-15">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        <nav className="flex flex-col gap-2" aria-label="Quick Links">
          <h6 className="footer-title">Quick Links</h6>
          <a href="/" className="link link-hover">
            Home
          </a>
          <a href="/movies" className="link link-hover">
            Movies
          </a>
          <a href="/top-rated" className="link link-hover">
            Top Rated
          </a>
          <a href="/upcoming" className="link link-hover">
            Upcoming
          </a>
        </nav>

        <nav className="flex flex-col gap-2" aria-label="Company">
          <h6 className="footer-title">Company</h6>
          <a href="/about" className="link link-hover">
            About
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a href="/privacy" className="link link-hover">
            Privacy Policy
          </a>
          <a href="/terms" className="link link-hover">
            Terms of Use
          </a>
        </nav>

        <nav className="flex flex-col" aria-label="Follow us">
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter (opens in new tab)"
              className="cursor-pointer hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
                aria-hidden="true"
              >
                <path d="M22.162 5.656c-.66.293-1.37.49-2.115.579.76-.456 1.344-1.18 1.62-2.042-.71.422-1.496.73-2.332.895C18.9 4.53 17.83 4 16.62 4c-1.8 0-3.26 1.46-3.26 3.26 0 .256.028.505.084.744C9.5 8.84 6.07 7.02 3.9 4.2c-.28.48-.44 1.04-.44 1.64 0 1.13.576 2.12 1.45 2.7-.535-.017-1.04-.164-1.48-.41v.04c0 1.58 1.12 2.9 2.61 3.2-.273.074-.56.114-.857.114-.21 0-.414-.02-.613-.06.415 1.29 1.62 2.24 3.05 2.26-1.12.88-2.53 1.4-4.06 1.4-.263 0-.523-.016-.78-.046 1.44.92 3.15 1.46 4.99 1.46 5.99 0 9.28-4.96 9.28-9.26 0-.14-.003-.28-.01-.42.64-.46 1.2-1.03 1.64-1.68z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube (opens in new tab)"
              className="cursor-pointer hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.103-2.112C19.275 3.5 12 3.5 12 3.5s-7.275 0-9.395.574A2.99 2.99 0 0 0 .502 6.186C0 8.35 0 12 0 12s0 3.65.502 5.814a2.99 2.99 0 0 0 2.103 2.112C4.725 20.5 12 20.5 12 20.5s7.275 0 9.395-.574a2.99 2.99 0 0 0 2.103-2.112C24 15.65 24 12 24 12s0-3.65-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (opens in new tab)"
              className="cursor-pointer hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <div className="mt-10 text-center border-t border-gray-500 pt-5 text-sm">
        © {new Date().getFullYear()} MovieMaster Pro — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
