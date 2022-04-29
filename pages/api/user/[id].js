import dbConnect from "../../../util/dbConfig";
import User from "../../../models/User";

dbConnect();

export default async function APi(req, res){
    const { id } = req.query

    try{
      await User.findOneOrCreate({wallet_address:id},{wallet_address:id,username:"unknown"})

      const data = await User.findOne({wallet_address:id}).exec()

      res.status(200).send({status:"success",data:data})
    }catch(error)
    {
      res.status = 500;
      res.send({ status: "error", message: error.message });
    }
}