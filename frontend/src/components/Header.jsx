import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch firstName from localStorage
  useEffect(() => {
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem("firstName");
      setUserName(storedUserName || "");
    };

    fetchUserName();
    window.addEventListener("storage", fetchUserName);
    return () => window.removeEventListener("storage", fetchUserName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    setUserName("");
    window.location.href = "/login";
  };

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-lg' : 'py-4 bg-gradient-to-r from-green-800 to-green-300'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${scrolled ? 'text-green-800' : 'text-white'}`}>
              GREEN PULSE
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className={`w-6 h-6 ${scrolled ? 'text-green-800' : 'text-white'}`} />
          </button>

          {/* Navigation */}
          <nav className={`md:flex items-center space-x-6 ${
            menuOpen 
              ? 'absolute top-full left-0 right-0 bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0' 
              : 'hidden md:flex'
          }`}>
            <ul className="md:flex md:space-x-6 items-center">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 md:py-0 hover:text-green-500 transition-colors ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/projectManagement/list" 
                  className={`block py-2 md:py-0 hover:text-green-500 transition-colors ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block py-2 md:py-0 hover:text-green-500 transition-colors ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/donors" 
                  className={`block py-2 md:py-0 hover:text-green-500 transition-colors ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Donations
                </Link>
              </li>

              {/* Profile Dropdown */}
              <li className="relative">
                {userName ? (
                  <>
                    <button 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        scrolled 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <User className="w-5 h-5" />
                      <span>{userName}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        <li>
                          <button 
                            onClick={handleEditProfile}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                          >
                            <Settings className="w-5 h-5 mr-2" />
                            Edit Profile
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                          >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <button 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        scrolled 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        <li>
                          <Link 
                            to="/login"
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                          >
                            <User className="w-5 h-5 mr-2" />
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/register"
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                          >
                            <User className="w-5 h-5 mr-2" />
                            Register
                          </Link>
                        </li>
                      </ul>
                    )}
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
