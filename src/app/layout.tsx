// import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import '@fortawesome/fontawesome-free/css/all.css'
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navbar } from "./_Component/Navbar/Navbar";
import Footer from "./_Component/Footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import UserProvider from "image/UserProvider";
import CountProvider from "image/CountProvider"
import { Metadata } from "next";

const Encode_SansFont = Encode_Sans({
  subsets: ['latin'],
  weight: ['100', '400', '600', '800']
})

export const metadata: Metadata = {

  description: "Best products in the market",
  icons: {
    icon: [{
      url: "../../public/images/shopping-cart.png", type: "image/png"
    }]

  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Encode_SansFont.className} `}
      >
        <UserProvider>
          <CountProvider>
            <Navbar />
            <main className="p-5">
              {children}
            </main>
            <Toaster />
            <Footer />
          </CountProvider>
        </UserProvider>
      </body>
    </html>
  );
}
