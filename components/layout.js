import Head from "next/head";
import Footer from "./footer";
import Navbar from "./Navbar";
import Script from "next/script";


export default function Layout({children}) {
    return (
      <>
       <Head>
    <link rel="icon" href="/images/logoo.png" type="image/gif" sizes="16x16" />
    <title>Kwon - NFT Marketplace</title>

    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="Kwon - NFT Marketplace " name="description" />
    <meta content="" name="keywords" />
    <meta content="" name="author" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>
    </Head>
      <div id="wrapper">
        <div id="top"></div>
        <div className="no-bottom no-top" id="content">
          <Navbar />
            {children}
        </div>
       <Footer/>
      </div>
      <Script src="/js/jquery.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/bootstrap.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/wow.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.isotope.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/easing.js" strategy="beforeInteractive"></Script>
      <Script src="/js/owl.carousel.js" strategy="beforeInteractive"></Script>
      <Script src="/js/validation.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.magnific-popup.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/enquire.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.plugin.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.countTo.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.countdown.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.lazy.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.lazy.plugins.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/designesia.js" strategy="beforeInteractive"></Script>
      </> 
    )
  }