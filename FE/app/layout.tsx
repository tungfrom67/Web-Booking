// import type React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import "./globals.css";
// import { LayoutWrapper } from "@/components/layout-wrapper";
// import ClientWrapper from "./ClientWrapper"; // Import client wrapper

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Henry XII - Đặt phòng khách sạn trực tuyến",
//   description: "Tìm và đặt phòng khách sạn, resort, căn hộ với giá tốt nhất cho chuyến đi của bạn tại Henry XII.",
//   generator: "v0.dev",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="vi" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           <LayoutWrapper>
//             <ClientWrapper>{children}</ClientWrapper>
//           </LayoutWrapper>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }





import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import ClientWrapper from "./ClientWrapper"; // Đảm bảo đường dẫn đúng

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Henry XII - Đặt phòng khách sạn trực tuyến",
  description: "Tìm và đặt phòng khách sạn, resort, căn hộ với giá tốt nhất cho chuyến đi của bạn tại Henry XII.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LayoutWrapper>
            <ClientWrapper>{children}</ClientWrapper>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}