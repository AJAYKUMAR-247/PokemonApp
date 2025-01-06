import axios from "axios";
import React, { useEffect, useState } from "react";
import useBookSearch from "./useBookSearch";

const InifiniteScroll = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useBookSearch(query, pageNumber);

  const handleFilterChange = (e) => {
    setQuery(e?.target?.value);
    setPageNumber(1);
  };

  return (
    <div>
      <input type="text" onChange={(e) => handleFilterChange(e)}></input>
    </div>
  );
};

export default InifiniteScroll;
