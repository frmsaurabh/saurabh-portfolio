import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Layout() {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showSubscribe, setShowSubscribe] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    localStorage.setItem("theme", !dark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDark(savedTheme === "dark");
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-white dark:bg-primary text-black dark:text-white min-h-screen font-sans transition-colors duration-300">
        
        {/* Helmet fallback for homepage */}
        {isHome && (
          <Helmet>
            <title>Saurabh Chandra | Simplifying Insurance Through Tech</title>
            <meta
              name="description"
              content="Empowering insurers with digital transformation, Oracle Financials automation, and AI-driven clarity in policy design."
            />
          </Helmet>
        )}

        {/* Header */}
        <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold tracking-wide text-neutral-900 dark:text-white">
            <Link to="/">Saurabh Chandra</Link>
          </h1>
          <nav className="flex gap-6 items-center text-sm font-medium">
            <NavLink to="/about" current={location.pathname}>About</NavLink>
            <NavLink to="/projects" current={location.pathname}>Projects</NavLink>
            <NavLink to="/credentials" current={location.pathname}>Credentials</NavLink>
            <NavLink to="/tech-in-action" current={location.pathname}>Tech in Action</NavLink>
            <NavLink to="/contact" current={location.pathname}>Contact</NavLink>
            <button
              onClick={toggleTheme}
              className="ml-2 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </header>

        {/* Page content */}
        <main className="max-w-6xl mx-auto px-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 text-center py-6 px-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Saurabh Chandra
            </span>{" "}
            · Built with purpose, powered by innovation.
          </p>
          <p className="text-xs mt-1 italic opacity-70">
            All projects listed under “Tech in Action” are prototypes for demonstration purposes only. Not for production use.
          </p>
        </footer>

        {/* Floating Subscribe Button */}
        <button
          onClick={() => setShowSubscribe(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Subscribe"
        >
          📩
        </button>

        {/* Subscribe Modal */}
        {showSubscribe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-xl w-full shadow-xl relative">
              <button
                onClick={() => setShowSubscribe(false)}
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
                aria-label="Close"
              >
                ×
              </button>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                📬 Subscribe to Updates
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                Get notified when I publish new projects or thought pieces on InsurTech.
              </p>

              <form
                action={process.env.REACT_APP_MAILCHIMP_URL}
                method="post"
                target="_blank"
                noValidate
                className="flex flex-col gap-3"
              >
                <input
                  type="email"
                  name="EMAIL"
                  required
                  placeholder="Your email"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                />

                {/* GDPR Consent */}
                <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    name="gdpr-consent"
                    required
                    className="mt-1"
                  />
                  I agree to receive emails from Saurabh Chandra. I understand I can unsubscribe anytime.
                </label>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs mt-3 text-gray-400 dark:text-gray-500 italic text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLink({ to, children, current }) {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`hover:underline transition ${
        isActive ? "text-accent font-semibold" : "text-gray-700 dark:text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
