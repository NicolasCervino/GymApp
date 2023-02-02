import HomeBackdrop from "../public/backdrop.jpg";
import LoginBackdrop from "../public/login-backdrop4.jpg";

const IndexLayout = ({ children, type, extraClass }: { children: React.ReactNode; type: string; extraClass: string }) => {
  const background = () => {
    switch (type) {
      case "login":
        return {
          backgroundImage: `url(${LoginBackdrop.src})`,
        };
      case "home":
        return {
          backgroundImage: `url(${HomeBackdrop.src})`,
        };
    }
  };

  return (
    <main
      className={`h-screen w-screen bg-cover bg-center flex justify-center relative bg-[#0007] bg-blend-darken ${extraClass}`}
      style={background()}
    >
      {children}
    </main>
  );
};

export default IndexLayout;
