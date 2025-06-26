import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
// import { useCart } from '../CartContext'; // Original import, commented out
import AnnouncementBanner from './AnnouncementBanner.tsx'; // Import the AnnouncementBanner - ensure this file is in the same directory as Navbar.jsx

// --- Mock useCart for demonstration ---
// Since CartContext was not provided, a simple mock is used to prevent compilation errors.
// In a real application, you would ensure your CartContext.js or CartContext.tsx file
// exists at the correct path (e.g., '../CartContext').
const useCart = () => {
  // Return a mock totalItems, or implement a simple state if needed for testing
  return { totalItems: 0 }; // Defaulting to 0 items for demonstration
};
// --- End Mock useCart ---

// --- Type Definitions ---
interface SubmenuItem {
  label: string;
  slug: string;
}

interface NavItemWithSubmenu {
  label: string;
  submenu: SubmenuItem[];
}

interface NavItemWithLink {
  label: string;
  path: string;
}

// Union type to represent either a link item OR a submenu item
type NavItem = NavItemWithLink | NavItemWithSubmenu;

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Book Us", path: "/book" },
  {
    label: "Straight",
    submenu: [
      { label: "Luxe Straight", slug: "luxe-straight" },
      { label: "Bone Straight", slug: "bone-straight" },
      { label: "Jet Silk", slug: "jet-silk" },
    ],
  },
  {
    label: "Yaki",
    submenu: [
      { label: "Yaki Blowout", slug: "yaki-blowout" },
      { label: "Yaki Relaxed", slug: "yaki-relaxed" },
      { label: "Silky Yaki", slug: "silky-yaki" },
    ],
  },
  {
    label: "Wavy",
    submenu: [
      { label: "Ocean Wave", slug: "ocean-wave" },
      { label: "Deep Wavy", slug: "deep-wavy" },
      { label: "Hollywood Curls", slug: "hollywood-curls" },
    ],
  },
  {
    label: "Kinky",
    submenu: [
      { label: "Kinky Coily", slug: "kinky-coily" },
      { label: "Afro Kinks", slug: "afro-kinks" },
      { label: "Kinky Curly", slug: "kinky-curly" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const mobileMenuVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};

// Variants for the scroll-reactive navigation links
const navLinksVariants: Variants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  hidden: { y: -50, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }, // Slide up and fade out
};

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false); // New state for scroll detection
  const lastScrollY = useRef(0); // Ref to store the last scroll position

  const navigate = useNavigate();
  const { totalItems } = useCart(); // Using the mock useCart for demonstration

  const handleMouseEnter = (label: string, hasSubmenu: boolean) => {
    if (hasSubmenu) setActiveSubmenu(label);
  };
  const handleMouseLeave = () => setActiveSubmenu(null);
  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
    setActiveSubmenu(null);
    setSearchOpen(false);
  };

  const handleSubmenuClick = (category: string, slug: string) => {
    navigate(`/shop-all?category=${category.toLowerCase()}&slug=${slug}`);
    setActiveSubmenu(null);
    setMobileMenuOpen(false);
  };

  // Effect to handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      // Determine scroll direction and threshold
      const currentScrollY = window.scrollY;
      // Adjust scroll threshold to account for banner height if banner is part of initial view
      const scrollThreshold = 100; // Pixels scrolled down before hiding

      if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY.current) {
        // Scrolled down past threshold
        setScrolledDown(true);
      } else if (currentScrollY <= scrollThreshold || currentScrollY < lastScrollY.current) {
        // Scrolled up or back within threshold
        setScrolledDown(false);
      }
      lastScrollY.current = currentScrollY; // Update last scroll position
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    // The main nav container will adjust its height based on the hidden section and the banner
    <nav
      className={`w-full bg-white fixed top-0 left-0 z-50 shadow-sm transition-all duration-300 ease-in-out`}
      // Adjust height based on scroll state. Banner adds approx 32px (2rem)
      style={{ fontFamily: "'Quattrocento Sans', sans-serif",
               height: scrolledDown ? 'calc(theme(height.16) + 2rem)' : 'calc(theme(height.32) + 2rem)'
             }}
    >
      <AnnouncementBanner /> {/* The announcement banner is now part of the Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={toggleSearch}
          aria-label="Toggle search"
          className="text-[#0E0E0E] hover:opacity-70 transition-opacity duration-200 p-2 md:order-1"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
        <Link to="/" aria-label="Home" className="flex-grow flex justify-center md:order-2">
          <motion.img
            src="https://i.ibb.co/cK75v5CV/Hikky-s-Hair-Transparent-Logo-becb4dc4-4314-4131-bce9-8bc377513ecf-png-height-50-v-1742992659.png"
            alt="Logo"
            className="h-12 md:h-14 w-auto cursor-pointer"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </Link>
        <div className="flex items-center space-x-4 md:order-3">
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative text-[#0E0E0E] hover:opacity-70 transition-opacity duration-200 p-2"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-[#0E0E0E] text-white text-xs font-medium rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {totalItems}
            </span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-[#0E0E0E] hover:opacity-70 transition-opacity duration-200 p-2 md:hidden"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Horizontal line - still hidden on mobile */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6 hidden md:block"></div>

      {/* Scroll-reactive navigation links section for desktop */}
      <AnimatePresence>
        {!scrolledDown && ( // Only render when not scrolled down
          <motion.div
            className="bg-white hidden md:block w-full"
            variants={navLinksVariants}
            initial="hidden" // Start hidden or from a higher Y position
            animate="visible" // Animate to visible
            exit="hidden" // Animate to hidden when unmounting
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <ul className="flex justify-center space-x-12 py-4">
                {navItems.map((item) => {
                  const hasSubmenu = (item as NavItemWithSubmenu).submenu?.length > 0;
                  const isActive = activeSubmenu === item.label;

                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label, hasSubmenu)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {'path' in item ? (
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `text-[#0E0E0E] text-[14px] leading-[18.2px] font-normal tracking-[0.6px] hover:opacity-70 transition-all duration-300 py-2 px-1 ${
                              isActive ? "font-medium border-b-2 border-[#0E0E0E]" : ""
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ) : (
                        <span
                          className="cursor-pointer text-[#0E0E0E] text-[14px] leading-[18.2px] font-normal tracking-[0.6px] hover:opacity-70 transition-all duration-300 py-2 px-1"
                          aria-controls={hasSubmenu ? `submenu-${item.label}` : undefined}
                          aria-expanded={hasSubmenu ? isActive : undefined}
                        >
                          {item.label}
                        </span>
                      )}
                      {hasSubmenu && (item as NavItemWithSubmenu).submenu && (
                        <AnimatePresence>
                          {isActive && (
                            <motion.ul
                              id={`submenu-${item.label}`}
                              className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50 overflow-hidden"
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              onMouseLeave={handleMouseLeave}
                            >
                              {(item as NavItemWithSubmenu).submenu.map(({ label: subLabel, slug }, index) => (
                                <li key={slug}>
                                  <button
                                    onClick={() => handleSubmenuClick(item.label, slug)}
                                    className={`block w-full text-left px-6 py-4 text-[#0E0E0E] text-[14px] leading-[18.2px] font-normal tracking-[0.6px] hover:bg-gray-50 transition-colors duration-200 ${
                                      index !== (item as NavItemWithSubmenu).submenu.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                                  >
                                    {subLabel}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 md:hidden flex flex-col pt-16 pb-4" // Note: pt-16 might need adjustment if banner is always fixed
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const hasSubmenu = (item as NavItemWithSubmenu).submenu?.length > 0;
                  const isActive = activeSubmenu === item.label;
                  return (
                    <li key={item.label} className="relative">
                      {'path' in item ? (
                        <NavLink
                          to={item.path}
                          onClick={toggleMobileMenu}
                          className={({ isActive: navActive }) =>
                            `block text-[#0E0E0E] text-lg font-medium py-3 px-2 border-b border-gray-100 ${
                              navActive ? "font-bold text-black" : ""
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ) : (
                        <div>
                          <button
                            onClick={() => setActiveSubmenu(isActive ? null : item.label)}
                            className="w-full flex justify-between items-center text-[#0E0E0E] text-lg font-medium py-3 px-2 border-b border-gray-100"
                            aria-controls={hasSubmenu ? `mobile-submenu-${item.label}` : undefined}
                            aria-expanded={hasSubmenu ? isActive : undefined}
                          >
                            <span>{item.label}</span>
                            {hasSubmenu && (
                              <span className="text-gray-500 text-xl">
                                {isActive ? "−" : "+"}
                              </span>
                            )}
                          </button>
                          <AnimatePresence>
                            {isActive && hasSubmenu && (item as NavItemWithSubmenu).submenu && (
                              <motion.ul
                                id={`mobile-submenu-${item.label}`}
                                className="pl-6 py-2 bg-gray-50"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                {(item as NavItemWithSubmenu).submenu.map(({ label: subLabel, slug }) => (
                                  <li key={subLabel}>
                                    <button
                                      onClick={() => handleSubmenuClick(item.label, slug)}
                                      className="block w-full text-left py-2 px-2 text-[#0E0E0E] text-base hover:bg-gray-100 transition-colors"
                                    >
                                      {subLabel}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
