// import React, { useEffect, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { IoIosMoon } from "react-icons/io"
// import { HiOutlineBars3 } from "react-icons/hi2"
// import { IoSunnyOutline } from "react-icons/io5";
// import { AiOutlineClose } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";


// const Navbar = () => {
//   //  const [showNav, setShowNav] = useState (window.innerWidth < 600 ? false : true);
//    const [showNav, setShowNav] = useState(true);
//    const [darkTheme, setDarkTheme] = useState(localStorage.getItem ('voting-app-theme'))

//    const token = useSelector((state) => state?.vote?.currentVoter?.token);




// //function to close nav menu on small screens when menu link is clicked
//    const closeNavMenu = () => {
//     if(window.innerWidth < 600) {
//       setShowNav(false);
//     } else {
//       setShowNav(true);
//     }
//    }


//    // function to change toogle theme 
//    const changeThemeHandler = () => {
//     if(localStorage.getItem('voting-app-theme') == 'dark'){
//       localStorage.setItem('voting-app-theme', '')
//     } else {
//       localStorage.setItem('voting-app-theme', 'dark')
//     }
//     setDarkTheme(localStorage.getItem('voting-app-theme'))
//    }

//    useEffect(() => {
//     document.body.className = localStorage.getItem('voting-app-theme');
//    }, [darkTheme])

//    useEffect(() => {
//      const handleResize = () => {
//        if (window.innerWidth >= 600) {
//          setShowNav(true); // always show navbar on desktop
//        }
//      };

//      window.addEventListener("resize", handleResize);
//      return () => window.removeEventListener("resize", handleResize);
//    }, []);

//   return ( 
//     <nav>
//       <div className="container nav__container">
//         <Link to="/" className='nav__logo'>Voting System</Link>
//         <div>
//           {token && showNav && <menu>
//             <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
//             <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
//             <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
//           </menu>}
//           <button className='theme__toggle-btn' onClick={changeThemeHandler}>{darkTheme ?  <IoSunnyOutline /> : <IoIosMoon  />}</button>
//           <button className='nav__toggle-btn' onClick={()=> setShowNav(!showNav)}>{showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}</button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


// import React, { useEffect, useState } from 'react'
// import { Link, NavLink, useLocation } from 'react-router-dom'
// import { IoIosMoon } from "react-icons/io"
// import { HiOutlineBars3 } from "react-icons/hi2"
// import { IoSunnyOutline } from "react-icons/io5";
// import { AiOutlineClose } from "react-icons/ai";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [showNav, setShowNav] = useState(window.innerWidth >= 600);
//   const [darkTheme, setDarkTheme] = useState(localStorage.getItem('voting-app-theme') || '');
//   const location = useLocation();

//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

//   // hide entire navbar on auth pages
//   const hideOnPaths = ['/login', '/register'];
//   if (hideOnPaths.includes(location.pathname)) return null;

//   const closeNavMenu = () => { setShowNav(window.innerWidth >= 600); };

//   const changeThemeHandler = () => {
//     const val = localStorage.getItem('voting-app-theme') === 'dark' ? '' : 'dark';
//     localStorage.setItem('voting-app-theme', val);
//     setDarkTheme(val);
//   };

//   useEffect(() => {
//     document.body.className = localStorage.getItem('voting-app-theme') || '';
//   }, [darkTheme]);

//   return (
//     <nav>
//       <div className="container nav__container">
//         <Link to="/" className='nav__logo'>Voting System</Link>
//         <div>
//           {token && showNav && (
//             <menu>
//               <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
//               <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
//               <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
//             </menu>
//           )}
//           <button className='theme__toggle-btn' onClick={changeThemeHandler}>
//             {darkTheme ? <IoSunnyOutline /> : <IoIosMoon />}
//           </button>
//           <button className='nav__toggle-btn' onClick={() => setShowNav(!showNav)}>
//             {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React, { useEffect, useState } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { IoIosMoon } from "react-icons/io";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import { IoSunnyOutline } from "react-icons/io5";
// import { AiOutlineClose } from "react-icons/ai";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const location = useLocation();

//   const [showNav, setShowNav] = useState(window.innerWidth >= 600);
//   const [darkTheme, setDarkTheme] = useState(localStorage.getItem('voting-app-theme') || '');

//   const token = useSelector((state) => state?.vote?.currentVoter?.token);
//   const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

//   // Hide navbar on login/register pages
//   const hideNavOn = ["/login", "/register"];
//   if (hideNavOn.includes(location.pathname)) return null;

//   // Close menu on small screen
//   const closeNavMenu = () => {
//     if (window.innerWidth < 600) {
//       setShowNav(false);
//     }
//   };

//   // Theme toggle
//   const changeThemeHandler = () => {
//     const newTheme = darkTheme === "dark" ? "" : "dark";
//     localStorage.setItem("voting-app-theme", newTheme);
//     setDarkTheme(newTheme);
//   };

//   useEffect(() => {
//     document.body.className = localStorage.getItem("voting-app-theme") || "";
//   }, [darkTheme]);

//   // Ensure navbar expands on desktop resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 600) setShowNav(true);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (shouldHide) return null;

//   return (
//     <nav>
//       <div className="container nav__container">
//         <Link to="/" className="nav__logo">Voting System</Link>

//         <div>
//           {token && showNav && (
//             <menu>
//               {/* ADMIN ONLY */}
//               {isAdmin && (
//                 <NavLink to="/elections" onClick={closeNavMenu}>
//                   Elections
//                 </NavLink>
//               )}

//               {/* VOTERS + ADMINS */}
//               <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
//               <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
//             </menu>
//           )}

//           {/* Theme toggle */}
//           <button className="theme__toggle-btn" onClick={changeThemeHandler}>
//             {darkTheme ? <IoSunnyOutline /> : <IoIosMoon />}
//           </button>

//           {/* Hamburger menu */}
//           <button className="nav__toggle-btn" onClick={() => setShowNav(!showNav)}>
//             {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoIosMoon } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {

  // Get the current page path (used to hide navbar on login/register)
  const location = useLocation();

  // Show navbar automatically on large screens
  const [showNav, setShowNav] = useState(window.innerWidth >= 600);

  // Load theme from localStorage
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('voting-app-theme') || ''
  );

  // Get logged-in user info from Redux
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // Pages where navbar should not appear
  const hideNavOn = ["/login", "/register"];
  const shouldHide = hideNavOn.includes(location.pathname); 
  // (We use this AFTER hooks to avoid breaking hook order)

  // Close menu on small screens
  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    }
  };

  // Toggle dark/light theme
  const changeThemeHandler = () => {
    const newTheme = darkTheme === "dark" ? "" : "dark";
    localStorage.setItem("voting-app-theme", newTheme);
    setDarkTheme(newTheme);
  };

  // Apply theme to document body
  useEffect(() => {
    document.body.className = localStorage.getItem("voting-app-theme") || "";
  }, [darkTheme]);

  // Make sure navbar always opens on large screens when resizing window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) setShowNav(true);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SAFE early return — placed AFTER hooks to avoid React hook order issues
  if (shouldHide) return null;

  return (
    <nav>
      <div className="container nav__container">
        
        {/* Logo */}
        <Link to="/" className="nav__logo">Voting System</Link>

        <div>
          
          {/* Only show navigation links if user is logged in */}
          {token && showNav && (
            <menu>

              {/* ADMIN ONLY SECTION */}
              {isAdmin && (
                <NavLink to="/elections" onClick={closeNavMenu}>
                  Elections
                </NavLink>
              )}

              {/* VOTERS & ADMIN */}
              <NavLink to="/results" onClick={closeNavMenu}>
                Results
              </NavLink>

              <NavLink to="/logout" onClick={closeNavMenu}>
                Logout
              </NavLink>
            </menu>
          )}

          {/* Theme toggle button */}
          <button className="theme__toggle-btn" onClick={changeThemeHandler}>
            {darkTheme ? <IoSunnyOutline /> : <IoIosMoon />}
          </button>

          {/* Mobile menu toggle button */}
          <button 
            className="nav__toggle-btn" 
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


