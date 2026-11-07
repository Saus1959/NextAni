"use client";
import SearchHeader from "../../../components/SearchHeader";
import SearchGrid from "../../../components/SearchGrid";
import { useState } from "react";

const Search = () => {
  const [inpVal, setInpVal] = useState("");

  return (
    <div>
      <SearchHeader onChange={(e) => setInpVal(e.target.value)} val={inpVal} />
      <hr className="mt-5" />
      <SearchGrid inpVal={inpVal} />
    </div>
  );
};

export default Search;
