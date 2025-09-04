import "../../globals.css";
import Header1 from "@/components/Header/Header1";
import Footer4Col from "@/components/Footer/Footer4Col";
import Loader from "@/components/Pages/Loading/Loading";
import ScrollToTopProgress from "@/components/Scroll/Scroll";
import Schema from "../../Schema";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="overflow-x-hidden">
          <Loader />
          <ScrollToTopProgress />
          <Schema />  {/* ← JSON-LD */}
          <Header1 />
          {children}
          <Footer4Col />
      </div>
  );
}
