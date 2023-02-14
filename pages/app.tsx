import Header from "@/components/Header";
import React from "react";
import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";

const App = () => {
  return (
    <div>
      <Header />
      <SearchBar />
    </div>
  );
};

export default withAuth(App);
