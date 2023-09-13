import React, { useEffect } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleDrawerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when the drawer is open
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling when the drawer is closed
    }

    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when the component unmounts
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-zinc-800`}
    >
      <h5
        id="drawer-navigation-label"
        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Options
      </h5>
      <button
        type="button"
        onClick={handleOverlayClick}
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div
        className="h-full flex flex-col"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          className="relative flex-grow p-4"
          onClick={handleDrawerClick}
          role="presentation"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
