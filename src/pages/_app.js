import "bulma/css/bulma.css";
import Link from "next/link";
import { CookiesProvider } from "react-cookie";

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link href="/">
          <a>Anasayfa</a>
        </Link>
        <Link href="/about">
          <a>Hakkımızda</a>
        </Link>
        <Link href="/login">
          <a>Giriş</a>
        </Link>
      </div>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default App;
