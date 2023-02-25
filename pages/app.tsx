import withAuth from "@/hocs/withAuth";
import SearchBar from "@/components/SearchBar";
import LatestWorkoutBanner from "@/components/LatestWorkoutBanner";
import AppLayout from "@/layout/appLayout";

const App = () => {
  return (
    <AppLayout>
      <SearchBar />
      <LatestWorkoutBanner />
    </AppLayout>
  );
};

export default withAuth(App);
