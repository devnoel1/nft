import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { id } = req.query;

  try {
    const data = await prisma.collection.findMany();
    const updatedData = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
    .replace(/"(-?\d+)n"/g, (_, a) => a);

    return res.status(200).json(updatedData);
  } catch (error) {
    res.status = 500;
    res.send({ error: true, message: error.message });
  }
};
