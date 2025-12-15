import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-purple-200 border-b-4 border-purple-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-purple-900 hover:text-purple-800 transition">
              📝 MicroBlog
            </Link>
            <div className="hidden md:block w-0.5 h-8 bg-purple-400"></div>
            <p className="text-xs text-purple-800 hidden md:block font-semibold">
              Share ideas. Be kind.
            </p>
          </div>

          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-purple-900 hover:text-purple-700 hover:underline transition">
              Home
            </Link>

            {!token ? (
              <>
                <div className="w-0.5 h-6 bg-purple-400"></div>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-purple-900 hover:text-purple-700 hover:underline transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-5 py-2 bg-purple-400 text-purple-900 text-sm font-bold border-2 border-purple-900 rounded hover:bg-purple-500 transition cursor-pointer">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="w-0.5 h-6 bg-purple-400"></div>
                <Link
                  to="/create-post"
                  className="text-sm font-semibold text-purple-900 hover:text-purple-700 hover:underline transition">
                  Create Post
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-purple-900 hover:text-purple-700 hover:underline transition">
                  Dashboard
                </Link>
                <div className="w-0.5 h-6 bg-purple-400"></div>
                <button
                  onClick={logout}
                  className="px-5 py-2 bg-rose-400 text-rose-900 text-sm font-bold border-2 border-rose-900 rounded hover:bg-rose-500 transition cursor-pointer">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
