import { useEffect, useRef } from "react";

const useOutsideClick = (callback, listenCapturing = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("keydown", handleEscapeKey, true);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
      document.removeEventListener("keydown", handleEscapeKey, true);
    };
  }, [callback, listenCapturing]);

  return ref;
};

export default useOutsideClick;
