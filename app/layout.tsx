import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PreloaderGate from "./site/components/PreloaderGate";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Мастерская праздников",
  description: "Праздники под ключ: шоу, декор и фотогалерея. Placeholder-контент.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="is-preloading">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div id="site-preloader" className="site-preloader" aria-hidden="true">
          <div className="site-preloader__spinner" />
        </div>

        <div id="site-content" className="site-content" aria-live="polite">
          <PreloaderGate>{children}</PreloaderGate>
        </div>

        <Script id="site-preloader" strategy="afterInteractive">{`(function(){
  var root = document.documentElement;
  var pre = document.getElementById('site-preloader');

  function done(){
    if (!pre) {
      root.classList.remove('is-preloading');
      window.dispatchEvent(new Event('site:loaded'));
      return;
    }

    pre.classList.add('site-preloader--hide');
    window.setTimeout(function(){
      root.classList.remove('is-preloading');
      window.dispatchEvent(new Event('site:loaded'));
    }, 500);
  }

  if (document.readyState === 'complete') {
    done();
  } else {
    window.addEventListener('load', done, { once: true });
  }
})();`}</Script>
      </body>
    </html>
  );
}
