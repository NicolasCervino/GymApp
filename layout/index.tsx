import HomeBackdrop from "../public/backdrop.jpg";

const IndexLayout = ({ children, extraClass }: { children: React.ReactNode; extraClass?: string }) => {
  return (
    <main
      className={`h-screen w-screen bg-cover bg-center flex justify-center relative bg-[#0007] bg-blend-darken ${extraClass}`}
      style={{ backgroundImage: `url(${HomeBackdrop.src})` }}
    >
      {children}
    </main>
  );
};

export default IndexLayout;
