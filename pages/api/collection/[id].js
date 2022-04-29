import dbConnect from "../../../util/dbConfig";
import Collection from "../../../models/Collection";

dbConnect();

const SinleCollection = async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Collection.findById(id);

    return res.status(200).send({ status: "success", data: data });
  } catch (error) {
    res.status = 500;
    res.send({ status: "error", message: error.message });
  }
};

export default SinleCollection;
