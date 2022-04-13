import { useState } from "react";

export default function CreateMultiple() {
  const [isActive, setIsActive] = useState(false);

  function onChange(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    document.getElementById("file_name").style.display = "none";
    setState({ files: [...state.files, ...filesArr] });
  }

  const handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow1 = () => {
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow2 = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  };

  const unlockClick = () => {
    setState({
      isActive: true,
    });
  };
  const unlockHide = () => {
    setState({ isActive: false });
  };
  return (
    <>
      <section
        id="subheader"
        className="text-light"
        // data-bgimage="url(/images/background/subheader.jpg) top"
        style={{ background: "url(/images/background/subheader.jpg) " }}
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Create Item</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>

                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Select method</h5>
                <div className="de_tab tab_methods">
                  <ul className="de_nav">
                    <li id="btn1" className="active" onClick={handleShow}>
                      <span>
                        <i className="fa fa-tag"></i>Fixed price
                      </span>
                    </li>
                    <li id="btn2" onClick={handleShow1}>
                      <span>
                        <i className="fa fa-hourglass-1"></i>Timed auction
                      </span>
                    </li>
                  </ul>

                  <div className="de_tab_content pt-3"></div>
                </div>

                <div className="spacer-20"></div>

                <h5>Title</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                ></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input
                  type="text"
                  name="item_price"
                  id="item_price"
                  className="form-control"
                  placeholder="enter price for one item (ETH)"
                />

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="nft__item_wrap">
                <span>
                  <img
                    src="./images/collections/coll-item-3.jpg"
                    id="get_file_2"
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>Pinky Ocean</h4>
                </span>
                <div className="nft__item_price">
                  0.08 ETH<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
