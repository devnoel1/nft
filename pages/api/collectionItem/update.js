import dbConnect from "../../../util/dbConfig";
import CollectionItem from "../../../models/CollectionItem";

dbConnect();

const CollectionItemUpdate = async (req, res) => {
  if (req.method == "POST") {
    try {
      const data = await CollectionItem.findByIdAndUpdate(req.body.id, {
        tokenId: req.body.tokenId,
        isListed: req.body.status,
      });

      return res.status(200).json({ status:"success",message: "item listed successfuly" });
    } catch (error) {
      res.status = 500;
      res.send({ status:"error", message: error.message });
    }
  }
};

export default CollectionItemUpdate;
