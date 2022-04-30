import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { WalletContext } from "../../context/WalletContext";
import Swal from "sweetalert2";
import axios from "axios";
import { baseURL } from "../../config";
import UserProfile from "../../components/Profile";

const ipfs_client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {
  const { address, currentUser } = useContext(WalletContext);
  const [userProfile, setUserProfile] = useState();

  const router = useRouter();

  // Define isMounted
  const isMounted = useRef(null);

  useEffect(() => {
    if (!router.isReady) return;
    const wallet_address = router.query.address;

    isMounted.current = true;

    // console.log(wallet_address)
    getUser(wallet_address);
    // On mount

    return () => (isMounted.current = false);
  });

  async function getUser(wallet_address) {
    const datalist = await axios.get(`/api/user/${wallet_address}`);
    const usersProfile = datalist?.data != "" ? datalist?.data : [];
    // console.log(usersProfile)
    setUserProfile(usersProfile.data);
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
      <UserProfile data={userProfile} />
    </>
  );
}
