import "bulma/css/bulma.css";
import { CookiesProvider } from "react-cookie";

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default App;
