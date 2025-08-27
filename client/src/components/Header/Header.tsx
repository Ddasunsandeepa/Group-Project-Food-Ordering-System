import React, { useEffect, useRef, useState } from "react";
import HeaderStrip from "./HeaderStrip";
import HeaderLogo from "./HeaderLogo";
import SearchBox from "./SearchBox";
import AuthContainer from "./AuthContainer";
import ActionContainer from "./ActionContainer";
import Navbar from "./Navbar";
import AllCategoriesButton from "./AllCategoriesButton";
import GoVeganSwitch from "./Other/GoVeganSwitch";

type HeaderProps = {
  showNavbar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ showNavbar = true }) => {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Observe original navbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFixedNavbar(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  // Detect idle user (no mouse movement)
  useEffect(() => {
    const shortIdleEvents = ["mousemove"];
    const longIdleEvents = ["keydown", "click"];

    const resetIdleTimer = (timeout: number) => {
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };

    const handleShortIdle = () => resetIdleTimer(3000); // 3 seconds
    const handleLongIdle = () => resetIdleTimer(15000); // 15 seconds

    // Add all event listeners
    shortIdleEvents.forEach((event) =>
      window.addEventListener(event, handleShortIdle)
    );
    longIdleEvents.forEach((event) =>
      window.addEventListener(event, handleLongIdle)
    );

    return () => {
      shortIdleEvents.forEach((event) =>
        window.removeEventListener(event, handleShortIdle)
      );
      longIdleEvents.forEach((event) =>
        window.removeEventListener(event, handleLongIdle)
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white shadow-md pb-1">
      <HeaderStrip />

      <div
        id="header-main"
        className="w-full h-auto py-5 px-10 m-2 flex flex-row justify-between items-center"
      >
        <HeaderLogo />
        <GoVeganSwitch variant="full"/>
        <SearchBox />
        <div className="flex flex-row items-center justify-between space-x-6">
          <AuthContainer variant="full"/>
          <ActionContainer />
        </div>
      </div>

      {showNavbar && (
        <>
          {/* Main navbar that scrolls with the page */}
          <div ref={navbarRef}>
            <Navbar />
          </div>

          {/* Fixed navbar appears only when original is out of view AND user is active */}
          {showFixedNavbar && !isIdle && (
            <div
              className={`fixed top-0 left-0 w-full z-50 shadow-md bg-white transition-all duration-1000 ease-in-out
        ${
          showFixedNavbar && !isIdle
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
            >
              <div className="w-full h-auto px-10 pt-4 pb-3 flex flex-row justify-between items-center">
                <AllCategoriesButton withHome={true}/>
                <GoVeganSwitch variant="mini" />
                <SearchBox />
                <div className="flex flex-row items-center justify-between space-x-12">
                  <AuthContainer variant="mini" />
                  <ActionContainer />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
