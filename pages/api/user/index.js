import dbConnect from "../../../util/dbConfig";
import User from "../../../models/User";

dbConnect();

export default async function UserAPI(req, res) {
  if (req.method == "POST") {
    try {
      await User.update(
        { wallet_address: req.body.id },
        {
          username: req.body.username,
          email: req.body.email,
          twitterHandle: req.body.twitterHandle,
          igHandle: req.body.igHandle,
          profile_pics: req.body.profile_pics,
          site_url: req.body.site_url,
          bio: req.body.bio,
        },
        { upsert: true }
      );
      return res.status(200).send({status: "success",message: "user profile is updated successfuly",});
    } catch (error) {
      res.status = 500;
      res.send({ error: true, message: error.message });
    }
  } else if (req.method == "GET") {
    try{
        const data = await User.find({})

    return res.status(200).send({status:"success",data:data});
    }catch(error){
        res.status = 500;
      res.send({ error: true, message: error.message });
    }
  }
}
