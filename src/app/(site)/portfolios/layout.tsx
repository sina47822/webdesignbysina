import "../../globals.css";
import Header1 from "@/components/Header/Header1";
import Footer4Col from "@/components/Footer/Footer4Col";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="overflow-x-hidden">
          <Header1 />
          {children}
          <Footer4Col />
      </div>
  );
}
