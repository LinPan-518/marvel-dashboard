import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-red-800 text-white shadow-lg hover:bg-red-500 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.3s ease" }}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
};

export default ScrollToTop;
