import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Layout() {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
        
        {/* ✅ Helmet fallback for homepage */}
        {isHome && (
          <Helmet>
            <title>Saurabh Chandra | Simplifying Insurance Through Tech</title>
            <meta name="description" content="Empowering insurers with digital transformation, Oracle Financials automation, and AI-driven clarity in policy design." />
          </Helmet>
        )}

        <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold tracking-wide text-neutral-900 dark:text-white">
            <Link to="/">Saurabh Chandra</Link>
          </h1>
          <nav className="flex gap-6 items-center text-sm font-medium">
            <NavLink to="/about" current={location.pathname}>About</NavLink>
            <NavLink to="/projects" current={location.pathname}>Projects</NavLink>
            <NavLink to="/credentials" current={location.pathname}>Credentials</NavLink>
            {/*<NavLink to="/blog" current={location.pathname}>Blog</NavLink>*/}
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

        <main className="max-w-6xl mx-auto px-4">
          <Outlet />
        </main>
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
