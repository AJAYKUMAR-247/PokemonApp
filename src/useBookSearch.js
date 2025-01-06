import axios from "axios";
import React, { useEffect, useState } from "react";

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
    setLoading(false);

    return () => cancel();
  }, [query, pageNumber]);

  if (loading){ return "Loading"};
  return <div></div>;
};

export default useBookSearch;
