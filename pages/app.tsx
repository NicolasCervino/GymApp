import Header from "@/components/Header";
import React from "react";
import withAuth from "@/hocs/withAuth";

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default withAuth(App);
