import { useState, useContext, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Swal from "sweetalert2";
import axios from "axios";

const ipfs_client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function UserProfile({data}){
  const [fileUrl, setFileUrl] = useState(data?.profile_pics || null);
  const [formInput, updateFormInput] = useState({
    username: data.username || "",
    email: data?.email || "",
    bio: data?.bio || "",
    site_url: data?.site_url || "",
    twitter_username: data?.twitterHandle || "",
    instagram_username: data?.igHandle || "",
  });  

  // console.log(data.username)

  async function onProfileImage(e) {
    const file = e.target.files[0];
    try {
      const added = await ipfs_client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function updateProfile() {
    const {
      username,
      email,
      bio,
      site_url,
      twitter_username,
      instagram_username,
    } = formInput;

    const user = await axios
      .post("/api/user", {
        id: data.wallet_address,
        username: username,
        email: email,
        site_url: site_url,
        bio: bio,
        twitterHandle: twitter_username,
        igHandle: instagram_username,
        profile_pics: fileUrl,
      })
      .then(function (data) {
        // console.log(data)
        if (data.data.status == "success") {
          Swal.fire({
            title: "Successful!",
            text: "Profile Updated successfuly",
            icon: "success",
            confirmButtonText: "Cool",
          });
        } else {
          console.log(data)
          Swal.fire({
            title: "Not Successful!",
            text: "Something went wrong ",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handlePics = () => {
    document.getElementById("upload_profile_img").click();
  };

  // console.log(data)

  return (
    <section id="section-main" aria-label="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <form
              id="form-create-item"
              className="form-border"
              method="post"
              action="#"
            >
              <div className="de_tab tab_simple">
                <ul className="de_nav">
                  <li className="active">
                    <span>
                      <i className="fa fa-user"></i>Profile
                    </span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  <div className="tab-1">
                    <div className="row wow fadeIn">
                      <div className="col-lg-8 mb-sm-20">
                        <div className="field-set">
                          <h5>Username</h5>
                          <input
                            type="text"
                            value={formInput.username}
                            className="form-control"
                            placeholder="Enter username"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                username: e.target.value,
                              })
                            }
                          />

                          <div className="spacer-20"></div>

                          <h5>Bio</h5>
                          <textarea
                            value={formInput.bio}
                            className="form-control"
                            placeholder="Tell the world who you are!"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                bio: e.target.value,
                              })
                            }
                          ></textarea>

                          <div className="spacer-20"></div>

                          <h5>Email Address*</h5>
                          <input
                            type="text"
                            value={formInput.email}
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                email: e.target.value,
                              })
                            }
                          />

                          <div className="spacer-20"></div>

                          <h5>
                            <i className="fa fa-link"></i> Your site
                          </h5>
                          <input
                            type="text"
                            value={formInput.site_url}
                            className="form-control"
                            placeholder="Enter Website URL"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                site_url: e.target.value,
                              })
                            }
                          />

                          <div className="spacer-20"></div>

                          <h5>
                            <i className="fa fa-twitter"></i> Twitter username
                          </h5>
                          <input
                            type="text"
                            value={formInput.twitter_username}
                            className="form-control"
                            placeholder="Enter Twitter username"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                twitter_username: e.target.value,
                              })
                            }
                          />

                          <div className="spacer-20"></div>

                          <h5>
                            <i className="fa fa-instagram"></i> Instagram
                            username
                          </h5>
                          <input
                            type="text"
                            value={formInput.instagram_username}
                            className="form-control"
                            placeholder="Enter Instagram username"
                            onChange={(e) =>
                              updateFormInput({
                                ...formInput,
                                instagram_username: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div id="sidebar" className="col-lg-4">
                        <h5>
                          Profile image
                          <i
                            className="fa fa-info-circle id-color-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                          ></i>
                        </h5>
                        <img
                          src={
                            fileUrl
                              ? fileUrl
                              : "/images/author_single/author-9.jpg"
                          }
                          // src="images/author_single/author-9.jpg"
                          onClick={handlePics}
                          className="d-profile-img-edit img-fluid"
                          alt=""
                        />
                        <input
                          type="file"
                          id="upload_profile_img"
                          onChange={onProfileImage}
                        />

                        <div className="spacer-30"></div>

                        {/* <h5>
                            Profile banner
                            <i
                              className="fa fa-info-circle id-color-2"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                            ></i>
                          </h5>
                          <img
                            src="images/author_single/author_banner.jpg"
                            id="click_banner_img"
                            className="d-banner-img-edit img-fluid"
                            alt=""
                          />
                          <input type="file" id="upload_banner_img" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spacer-30"></div>
              <button
                type="button"
                className="btn-main"
                onClick={updateProfile}
              >
                Update profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
