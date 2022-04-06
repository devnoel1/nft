import "../styles/css/bootstrap.min.css";
import "../styles/css/bootstrap-grid.min.css";
import "../styles/css/bootstrap-reboot.min.css";
import "../styles/css/animate.css";
import "../styles/css/owl.carousel.css";
import "../styles/css/owl.theme.css";
import "../styles/css/owl.transitions.css";
import "../styles/css/magnific-popup.css";
import "../styles/css/jquery.countdown.css";
import "../styles/css/style.css";
import "../styles/css/colors/scheme-01.css";
import "../styles/css/coloring.css";
import "../styles/fonts/elegant_font/HTML_CSS/style.css";
import "../styles/fonts/et-line-font/style.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/elegant-icons/style.css';
import Head from "next/head";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Script from "next/script";
import { WalletProvider } from "../context/WalletContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/images/logoo.png"
          type="image/gif"
          sizes="16x16"
        />
        <title>Kwon - NFT Marketplace</title>

        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="Kwon - NFT Marketplace " name="description" />
        <meta content="" name="keywords" />
        <meta content="" name="author" />
      </Head>
      <div id="wrapper">
        <div id="top"></div>
        <div className="no-bottom no-top" id="content">
          <WalletProvider>
            <Navbar />
            <Component {...pageProps} />
          </WalletProvider>
        </div>
        <Footer />
      </div>
      <Script src="/js/jquery.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/bootstrap.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/wow.min.js" strategy="beforeInteractive"></Script>
      <Script
        src="/js/jquery.isotope.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/js/easing.js" strategy="beforeInteractive"></Script>
      <Script src="/js/owl.carousel.js" strategy="beforeInteractive"></Script>
      <Script
        src="/js/jquery.magnific-popup.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/js/enquire.min.js" strategy="beforeInteractive"></Script>
      <Script
        src="/js/jquery.lazy.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/js/jquery.lazy.plugins.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/js/designesia.js" strategy="lazyOnload"></Script>
    </>
  );
}

export default MyApp;
