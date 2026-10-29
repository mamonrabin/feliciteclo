import AnnouncementBar from "@/components/common-section/AnnouncementBar";
import Footer from "@/components/common-section/footer/Footer";
import Navbar from "@/components/common-section/header/Navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-dvh">
      <AnnouncementBar />
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;