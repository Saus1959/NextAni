import AniList from "../../components/aniList";
import PageHeader from "../../components/PageHeader";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <PageHeader pageName="Home" hasDate />
      <AniList />
    </div>
  );
};

export default HomePage;
