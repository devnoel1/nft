import Image from "next/image";

export default function collection() {
    return (
        <>
            <section
                id="profile_banner"
                aria-label="section"
                className="text-light"
                data-bgimage="url(/images/background/4.jpg) top"></section>

            <section aria-label="section" className="d_coll no-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d_profile">
                                <div className="profile_avatar">
                                    <div className="d_profile_img">
                                        <img src="images/author/author-9.jpg" alt="" />
                                        <i className="fa fa-check"></i>
                                    </div>

                                    <div className="profile_name">
                                        <h4>
                                            Cute Astronout Collection
                                            <div className="clearfix"></div>
                                            <span id="wallet" className="profile_wallet"
                                            >DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span
                                            >
                                            <button id="btn_copy" title="Copy Text">Copy</button>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="de_tab tab_simple">
                                <ul className="de_nav">
                                    <li className="active"><span>On Sale</span></li>
                                    <li><span>Owned</span></li>
                                </ul>
                                <div className="de_tab_content">
                                    <div className="tab-1">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                <div className="nft__item">
                                                    <div className="author_list_pp">
                                                        <a
                                                            href="author.html"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Creator: Lori Hart"
                                                        >
                                                            <Image
                                                                className="lazy"
                                                                src="/images/author/author-9.jpg"
                                                                alt=""
                                                                height="200"
                                                                width="200"
                                                            />
                                                            <i className="fa fa-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="nft__item_wrap">
                                                        <div className="nft__item_extra">
                                                            <div className="nft__item_buttons">
                                                                <button>Buy Now</button>
                                                            </div>
                                                        </div>
                                                        <a href="item-details.html">
                                                            <Image
                                                                src="/images/items/static-7.jpg"
                                                                className="lazy nft__item_preview"
                                                                alt=""
                                                                height="600"
                                                                width="600"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="nft__item_info">
                                                        <a href="item-details.html">
                                                            <h4>Cute Astronout</h4>
                                                        </a>s
                                                        <div className="nft__item_click">
                                                            <span></span>
                                                        </div>
                                                        <div className="nft__item_price">
                                                            0.005 ETH<span></span>
                                                        </div>
                                                        <div className="nft__item_action">
                                                            <a href="#">Buy Now</a>
                                                        </div>
                                                        <div className="nft__item_like">
                                                            <i className="fa fa-heart"></i>
                                                            <span>32</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-2">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                <div className="nft__item">
                                                    <div className="author_list_pp">
                                                        <a
                                                            href="author.html"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Creator: Lori Hart"
                                                        >
                                                            <Image
                                                                className="lazy"
                                                                src="/images/author/author-9.jpg"
                                                                alt=""
                                                                height="200"
                                                                width="200"
                                                            />
                                                            <i className="fa fa-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="nft__item_wrap">
                                                        <div className="nft__item_extra">
                                                            <div className="nft__item_buttons">
                                                                <button>Buy Now</button>
                                                            </div>
                                                        </div>
                                                        <a href="item-details.html">
                                                            <Image
                                                                src="/images/items/static-7.jpg"
                                                                className="lazy nft__item_preview"
                                                                alt=""
                                                                height="600"
                                                                width="600"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="nft__item_info">
                                                        <a href="item-details.html">
                                                            <h4>Cute Astronout</h4>
                                                        </a>s
                                                        <div className="nft__item_click">
                                                            <span></span>
                                                        </div>
                                                        <div className="nft__item_price">
                                                            0.005 ETH<span></span>
                                                        </div>
                                                        <div className="nft__item_action">
                                                            <a href="#">Buy Now</a>
                                                        </div>
                                                        <div className="nft__item_like">
                                                            <i className="fa fa-heart"></i>
                                                            <span>32</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}