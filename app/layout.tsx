import "./globals.css";
import Header from "@/app/Header/Header";
import Footer from "@/app/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
