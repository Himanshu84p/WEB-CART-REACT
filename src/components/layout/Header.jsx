// import { Button, IconButton } from "@mui/material";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../../store/authSlice";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);
//   console.log("authstatus is", authStatus);

//   const cart = useSelector((state) => state.cart.cart);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Assuming you store the token in local storage

//       if (token) {
//         await axios.post(
//           "http://localhost:8080/api/v1/users/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         dispatch(logout());
//         localStorage.removeItem("token"); // Optionally remove the token from local storage
//         localStorage.removeItem("user"); // Optionally remove the user from local storage
//         console.log("Logout successfully");
//         toast.success("User Logout Successfully!", {
//           position: "top-right",
//           autoClose: 2000, // Close the toast after 3 seconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         navigate("/");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   return (
//     <div>
//       <header className="fixed top-0 left-0 w-full z-30 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
//             <div className="flex justify-start lg:w-0 lg:flex-1">
//               <a href="#" className="text-2xl font-bold text-blue-800">
//                 WEB CART
//               </a>
//             </div>
//             <div className="hidden md:flex space-x-10 items-center">
//               <Link
//                 to={"/"}
//                 className="text-base font-medium text-gray-500 hover:text-gray-900"
//               >
//                 Home
//               </Link>
//               <Link
//                 to={"/products"}
//                 className="text-base font-medium text-gray-500 hover:text-gray-900"
//               >
//                 Products
//               </Link>
//               <Link
//                 to={"/cart"}
//                 className="text-base font-medium text-gray-500 hover:text-gray-900"
//               >
//                 Cart({cart?.items?.length})
//               </Link>
//               <Link
//                 to={"/"}
//                 className="text-base font-medium text-gray-500 hover:text-gray-900"
//               >
//                 Contact
//               </Link>

//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-4.35-4.35M11 17a6 6 0 110-12 6 6 0 010 12z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             {!authStatus && (
//               <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
//                 <Link
//                   to={"/login"}
//                   className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to={"/signup"}
//                   className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//             {authStatus && (
//               <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
//                 <Button variant="outlined" onClick={() => handleLogout()}>
//                   Logout
//                 </Button>
//               </div>
//             )}
//             <div className="md:hidden flex items-center">
//               <button
//                 type="button"
//                 className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//                 aria-expanded="false"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 <span className="sr-only">Open menu</span>
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg">
//             <div className="pt-4 pb-3 px-5 space-y-1">
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//               >
//                 Home
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//               >
//                 About
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//               >
//                 Services
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//               >
//                 Contact
//               </a>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-4.35-4.35M11 17a6 6 0 110-12 6 6 0 010 12z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
//               >
//                 Sign in
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Sign up
//               </a>
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import {
  Button,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const cart = useSelector((state) => state.cart.cart);
  let totalItems =
    cart?.items?.reduce((total, item) => total + item?.quantity, 0) || 0;

  console.log("totalItem", totalItems);
  let user = useSelector((state) => state.auth.userData);
  user = JSON.parse(user);
  console.log("user", user);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          "http://localhost:8080/api/v1/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("User Logout Successfully!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-30 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="text-2xl font-bold text-blue-800">
                WEB CART
              </a>
            </div>
            <div className="hidden md:flex space-x-10 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-base font-medium text-blue-600"
                    : "text-base font-medium text-gray-500 hover:text-gray-900"
                }
              >
                Home
              </NavLink>
              {authStatus && (
                <>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "text-base font-medium text-blue-600"
                        : "text-base font-medium text-gray-500 hover:text-gray-900"
                    }
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive
                        ? "text-base font-medium text-blue-600"
                        : "text-base font-medium text-gray-500 hover:text-gray-900"
                    }
                  >
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </NavLink>{" "}
                </>
              )}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-base font-medium text-blue-600"
                    : "text-base font-medium text-gray-500 hover:text-gray-900"
                }
              >
                Contact
              </NavLink>

              {authStatus && (
                <div className="relative">
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar alt="Profile Picture" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                  >
                    <MenuItem onClick={handleProfileMenuClose}>
                      {user?.name}
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      {user?.email}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
            {!authStatus && (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <NavLink
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg">
            <div className="pt-4 pb-3 px-5 space-y-1">
              <NavLink
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </NavLink>
              <NavLink
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cart
              </NavLink>
              <NavLink
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Contact
              </NavLink>
              {!authStatus && (
                <>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
              {authStatus && (
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
