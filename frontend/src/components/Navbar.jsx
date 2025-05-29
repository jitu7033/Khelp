// import { useState } from "react";
// import "../styles/Navbar.css";
// import { useUser } from "../contexts/UserContext";
// import { Link } from "react-router-dom";
// import { useAdmin } from "../contexts/AdminContext";
// import Cookies from "js-cookie";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const {user} = useUser();
//   const {admin} = useAdmin();


//   return (
//     <nav className="navbar">
//      <a style={{textDecoration:"none"}} href="/"><div className="logo">Khelp</div></a>

//       <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
//         ☰
//       </div>
//       <div className={`nav-links ${isOpen ? "open" : ""}`}>
//         <a href="/">Home</a>
//         <a href="#">About</a>
//         {user || admin?(
//           <Link to="/profile">Profile</Link>
//         ): (<Link to="/login">Login</Link>)}
//         <button className="language-btn">Language</button>
//       </div>
//     </nav>
//   );
// }



import { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { admin } = useAdmin();

  // Use ref to detect clicks outside of nav-links and menu-icon
  const navRef = useRef(null);
  const menuIconRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // If menu is open and click is outside nav-links and menu icon => close menu
      if (
        isOpen &&
        navRef.current &&
        menuIconRef.current &&
        !navRef.current.contains(event.target) &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when clicking any link inside nav-links
  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <nav className="navbar">
      <a style={{ textDecoration: "none" }} href="/">
        <div className="logo">Khelp</div>
      </a>

      <div
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
        ref={menuIconRef}
      >
        ☰
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`} ref={navRef}>
        <a href="/" onClick={handleLinkClick}>
          Home
        </a>
        <a href="#" onClick={handleLinkClick}>
          About
        </a>
        {user || admin ? (
          <Link to="/profile" onClick={handleLinkClick}>
            Profile
          </Link>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>
            Login
          </Link>
        )}
        <button className="language-btn">Language</button>
      </div>
    </nav>
  );
}
