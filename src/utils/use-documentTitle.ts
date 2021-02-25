import { useEffect, useRef } from "react";

export const useDocumentTitle = (newTitle: string) => {
  let oldTitle = useRef('');

  useEffect(() => {
    oldTitle.current = document.title;
    document.title = newTitle;

    return () => {
      document.title = oldTitle.current;
    };
  }, []);
};
