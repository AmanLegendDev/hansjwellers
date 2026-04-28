import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    default: "Hans Jewellers Shimla",
    template: "%s | Hans Jewellers Shimla",
  },

  description:
    "Explore hallmarked gold jewellery, bridal sets, bangles, necklaces and rings from Hans Jewellers Shimla. Trusted showroom on Mall Road.",

  keywords: [
    "Hans Jewellers Shimla",
    "Gold Jewellery Shimla",
    "Mall Road Jewellery Shop",
    "22K Gold Jewellery",
    "Bridal Jewellery Shimla",
    "Jewellery Store Shimla",
  ],

  metadataBase: new URL("https://hansjwellersvercel.app"),

  openGraph: {
    title: "Hans Jewellers Shimla",
    description:
      "Trusted jewellery showroom on Mall Road Shimla offering hallmarked gold jewellery and bridal collections.",
    url: "https://hansjwellersvercel.app",
    siteName: "Hans Jewellers Shimla",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable}`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}