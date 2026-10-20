import MyLibNav from "../../../components/MyLibNav";
import PageHeader from "../../../components/PageHeader";
import React from "react";

const Library = () => {
  return (
    <div>
      <PageHeader pageName="My Library" />
      <div className="px-9 py-5">
        <MyLibNav />
      </div>
    </div>
  );
};

export default Library;
