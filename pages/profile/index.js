import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../../lib/sanityClient";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { WalletContext } from "../../context/WalletContext";
import Swal from "sweetalert2";
import axios from "axios";

const ipfs_client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    username: "",
    email: "",
    bio: "",
    site_url: "",
    twitter_username: "",
    instagram_username: "",
  });
  const { address,currentUser} = useContext(WalletContext);
  const [ userProfile, setUserProfile ] = useState({})

  const router = useRouter();

  useEffect(()=>{
    currentUserFun()
  },[currentUserFun])

  async function currentUserFun()
  {
    const query = `
          *[_type == "users" && _id == "${address}"]{
              userName,
              walletAddress,
              bio,
              email,
              siteUrl,
              twitterHandle,
              igHandle,
              profileImage
          }
          `;
      const res = await client.fetch(query);

      // console.log(response)
      
    if (res.length) {
      setUserProfile({
        username: res[0].userName,
        bio: res[0].bio,
        email: res[0].email,
        siteUrl: res[0].siteUrl,
        twitterHandle: res[0].twitterHandle,
        profileImage:res[0].profileImage,
        igHandle: res[0].igHandle,
      });

      setFileUrl(res[0].profileImage)
    }
  }

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

    if (!username || !email) return;

    const userDoc = {
      _type: "users",
      _id: address,
      userName: username,
      walletAddress: address,
      bio: bio,
      email: email,
      siteUrl: site_url,
      twitterHandle: twitter_username,
      igHandle: instagram_username,
      profileImage: fileUrl,
    };

    const result = await client.createOrReplace(userDoc);

    Swal.fire({
      title: "Successful!",
      text: "Profile Updated successfuly",
      icon: "success",
      confirmButtonText: "Cool",
    });
  }

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
                <h1>Edit Profile</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
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
                              value={userProfile.username}
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
                              value={userProfile.bio}
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
                              value={userProfile.email}
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
                              value={userProfile.siteUrl}
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
                              value={userProfile.twitterHandle}
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
                              value={userProfile.igHandle}
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
                                    : "images/author_single/author-9.jpg"
                                }
                                // src="images/author_single/author-9.jpg"
                                id="click_profile_img"
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
    </>
  );
}
