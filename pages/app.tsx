import Header from "@/components/Header";
import React from "react";
import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import LatestWorkoutBanner from "@/components/LatestWorkoutBanner";

const App = () => {
  return (
    <div className="min-h-screen bg-[#151515]">
      <Header />
      <SearchBar />
      <LatestWorkoutBanner />
      <Footer />
    </div>
  );
};

export default withAuth(App);
