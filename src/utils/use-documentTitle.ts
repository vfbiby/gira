import { useEffect, useRef } from "react";

export const useDocumentTitle = (newTitle: string) => {
  let oldTitle = useRef('');

  useEffect(() => {
    oldTitle.current = document.title;
    console.log("title when loading", oldTitle.current);
    document.title = newTitle;
    return () => {
      console.log("title when unLoading", oldTitle.current);
      document.title = oldTitle.current;
    };
  }, [oldTitle]);
};
