import Image from 'next/image'

const Footer = ()=>{
    return (
      <>
      <a href="#" id="back-to-top"></a>
      <footer className="footer-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <a href="index.html">
                  <Image
                    alt=""
                    className="f-logo"
                    src="/images/logo.png"
                    width="167"
                    height="36"
                  />
                </a>
                <div className="spacer-20"></div>
                <p>
                  Turn your artwork into publicly tradable items, Discover
                  artwork, explore communities, and support artists.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <h5>Marketplace</h5>
                <ul>
                  <li><a href="#">All NFTs</a></li>
                  <li><a href="#">Art</a></li>

                  <li><a href="#">Collectibles</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <h5>Resources</h5>
                <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Docs</a></li>
                  <li><a href="#">Newsletter</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <h5>Community</h5>
                <ul>
                  <li><a href="#">Discord</a></li>
                  <li><a href="#">Twitter</a></li>
                  <li><a href="#">Telegram</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="de-flex">
                  <div className="de-flex-col">
                    <a href="index.html">
                      <span className="copy"
                        >&copy; Copyright 2022 - Kwon NFT Marketplace</span
                      >
                    </a>
                  </div>
                  <div className="de-flex-col">
                    <div className="social-icons">
                      <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href="#"><i className="fa fa-linkedin fa-lg"></i></a>
                      <a href="#"><i className="fa fa-pinterest fa-lg"></i></a>
                      <a href="#"><i className="fa fa-rss fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </>
    )
}


export default Footer;