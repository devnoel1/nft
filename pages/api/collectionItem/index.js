import dbConnect from "../../../util/dbConfig";
import CollectionItem from "../../../models/CollectionItem";

dbConnect();

const CollectionItemApi =  async (req, res) => {
  if (req.method == "POST") {
    try {
      await CollectionItem.create({
        title: req.body.title,
          price: req.body.price,
          pics: req.body.pics,
          description: req.body.description,
          collectonId: req.body.collectionId,
      })
      
      return res.status(200).send({status:"success", message: "item added successfuly" });
    } catch (error) {
      res.status = 500;
      res.send({ status:"error", message: error.message });
    }
  } else if (req.method == "GET") {
    try {
      const data = await CollectionItem.find({})
      // const data = await prisma.collectionItem.findMany();
      // const updatedData = JSON.stringify(data, (_, v) =>
      //   typeof v === "bigint" ? `${v}n` : v
      // ).replace(/"(-?\d+)n"/g, (_, a) => a);

      return res.status(200).send({status:"success",data});
    } catch (error) {
      res.status == 500;
      res.send({ status:"error", message: error.message });
    }
  }
};


export default CollectionItemApi