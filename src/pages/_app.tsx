
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import SplashScreen from "@/components/shared/organisms/SplashScreen";
import { SearchProvider } from "@/context/SearchContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Layout } from "@/components/shared/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Array of paths that should NOT use the landing layout
  const internalPathPrefixes = ['/auth', '/dashboard', '/admin', '/docs'];

  const isInternalPage = internalPathPrefixes.some(prefix =>
    router.pathname.startsWith(prefix) || router.asPath.startsWith(prefix)
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <SidebarProvider>
            <main className={`${plusJakartaSans.className}`}>
              <SplashScreen />
              {isInternalPage ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </main>
          </SidebarProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
