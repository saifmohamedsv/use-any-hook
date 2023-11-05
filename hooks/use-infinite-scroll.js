import { useState, useEffect } from "react";

function useInfiniteScroll(fetchMoreData) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isFetching
      ) {
        setIsFetching(true);
        fetchMoreData().then(() => {
          setIsFetching(false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData, isFetching]);

  return isFetching;
}

export default useInfiniteScroll;
