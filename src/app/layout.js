import { Inter } from "next/font/google";
import "./globals.css";
import '../../public/styles/tailwind.css';
import ReduxProvider from './Provider';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Macc Essentials",
  description: "e-commerce webite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
