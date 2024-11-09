import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback: () => void, options: IntersectionObserverInit) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(bottomRef.current);
      }
    };
  }, [callback, options]);

  return bottomRef;
};

export default useIntersectionObserver;
