import Footer from "@/components/Footer";
import Header from "@/components/Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#151515]">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
