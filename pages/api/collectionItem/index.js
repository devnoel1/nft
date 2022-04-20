import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method == "POST") {
    try {
      const data = await prisma.collectionItem.create({
        data: {
          title: req.body.title,
          price: req.body.price,
          pics: req.body.pics,
          description: req.body.description,
          collectionId: req.body.collectionId,
        },
      });
 
      return res.status(200).json({ message: "item added successfuly"});
    } catch (error) {
      res.status = 500;
      res.send({ error: true, message: error.message });
    }
  }
};
