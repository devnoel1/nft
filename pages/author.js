export default function author() {
    return (
        <>
            <section
                id="profile_banner"
                aria-label="section"
                className="text-light"
                data-bgimage="url(images/background/subheader.jpg) top"
            ></section>
            <section aria-label="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d_profile de-flex">
                                <div className="de-flex-col">
                                    <div className="profile_avatar">
                                        <img src="images/author_single/author-9.jpg" alt="" />
                                        <i className="fa fa-check"></i>
                                        <div className="profile_name">
                                            <h4>
                                                Ryan Tellem
                                                <span className="profile_username">@ryantellem</span>
                                                <span id="wallet" className="profile_wallet"
                                                >DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span
                                                >
                                                <button id="btn_copy" title="Copy Text">Copy</button>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">500 followers</div>
                    </div>
                    <div className="de-flex-col">
                      <a href="#" className="btn-main">Follow</a>
                    </div>
                  </div> --> */}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="de_tab tab_simple">
                                <ul className="de_nav">
                                    <li className="active"><span>On Sale</span></li>
                                    <li><span>Created</span></li>
                                    <li><span>Sold</span></li>
                                </ul>
                                <div className="de_tab_content">
                                    <div className="tab-1">
                                    </div>

                                    <div className="tab-2"></div>
                                    <div className="tab-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}