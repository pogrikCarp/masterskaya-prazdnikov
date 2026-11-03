import type { Metadata } from "next";
import { DynaPuff, Inter, M_PLUS_Rounded_1c, Manrope, Roboto_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PreloaderGate from "./site/components/PreloaderGate";
import RequestModalProvider from "./site/components/RequestModalProvider";
import { getSiteUrl, siteSeo } from "./site/content/seo";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const comboTitle = M_PLUS_Rounded_1c({
  subsets: ["cyrillic", "latin"],
  weight: "900",
  variable: "--font-combo-title",
  display: "swap",
});

const comboPrice = DynaPuff({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-combo-price",
  display: "swap",
});

const comboCopy = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: "900",
  variable: "--font-combo-copy",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteSeo.defaultTitle,
    template: siteSeo.titleTemplate,
  },
  description: siteSeo.description,
  applicationName: siteSeo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteSeo.locale,
    url: siteUrl,
    siteName: siteSeo.name,
    title: siteSeo.defaultTitle,
    description: siteSeo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.defaultTitle,
    description: siteSeo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="is-preloading">
      <body className={`${inter.variable} ${manrope.variable} ${comboTitle.variable} ${comboCopy.variable} ${comboPrice.variable} font-sans antialiased`}>
        <div id="site-preloader" className="site-preloader" aria-hidden="true">
          <div className="site-preloader__spinner" />
        </div>

        <div id="site-content" className="site-content" aria-live="polite">
          <RequestModalProvider>
            <PreloaderGate>{children}</PreloaderGate>
          </RequestModalProvider>
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
