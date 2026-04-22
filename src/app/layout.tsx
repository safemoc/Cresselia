import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Cresselia · 新月织梦 · AI 营销视频工坊",
  description:
    "Cresselia 取自那位驱散噩梦、降下好梦的传说宝可梦。我们以 AI 生成营销视频，让品牌故事在月光下苏醒。",
  keywords: [
    "Cresselia",
    "AI 营销视频",
    "AI 视频生成",
    "品牌视频",
    "生成式 AI",
    "营销自动化",
  ],
  openGraph: {
    title: "Cresselia · 新月织梦",
    description: "让 AI 为你的品牌织一场好梦。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05030f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--bg-deep)] text-[color:var(--ink)]">
        {children}
      </body>
    </html>
  );
}
