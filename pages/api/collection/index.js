import prisma from "../../../lib/prisma";

export default async (req, res) => {

  if (req.method == "POST") {

    await prisma.collection.create({
        data:{
            title: req.body.name,
            symbol: req.body.symbol,
            desription: req.body.description,
            pics: req.body.pics,
            userId: req.body.address,
          }
    });

    return res.status(200).json({ message: "collection created successfuly" });

  } else if (req.method == "GET") {

    try {
      const data = await prisma.collection.findMany();
      const updatedData = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
  
      return res.status(200).json(updatedData);
    } catch (error) {
      res.status = 500;
      res.send({ error: true, message: error.message });
    }

  }
};
