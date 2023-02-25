import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";
import LatestWorkoutBanner from "@/components/LatestWorkoutBanner";
import AppLayout from "@/layout/appLayout";

const App = () => {
  return (
    <AppLayout>
      <div className="md:ml-28">
        <SearchBar />
        <LatestWorkoutBanner />
      </div>
    </AppLayout>
  );
};

export default withAuth(App);
