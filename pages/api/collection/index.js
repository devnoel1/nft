import dbConnect from "../../../util/dbConfig";
import Collection from "../../../models/Collection";

dbConnect();

async function CollectionApi(req, res) {
  if (req.method == "POST") {
    try {
      await Collection.create({
        title: req.body.name,
        symbol: req.body.symbol,
        description: req.body.description,
        pics: req.body.pics,
        userId: req.body.address,
      });
      return res
        .status(200)
        .send({ status: "success", message: "collection created successfuly" });
    } catch (error) {
      res.status = 500;
      res.send({ status: 'error', message: error.message });
    }
  } else if (req.method == "GET") {
    try {
      const data = await Collection.find({});

      return res.status(200).send({ status: "success", data: data });
    } catch (error) {
      res.status = 500;
      res.send({ status: "error", message: error.message });
    }
  }
}

export default CollectionApi;
