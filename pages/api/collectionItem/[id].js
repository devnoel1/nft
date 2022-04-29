import dbConnect from "../../../util/dbConfig";
import CollectionItem from "../../../models/CollectionItem";

dbConnect();

const CollectionItemDetailsApi = async (req,res)=>{
    if(req.method == "GET")
    {
        const { id } = req.query

        try{
          
        const data = await CollectionItem.findById(id)
    
        res.status(200).send({status:"success",data:data})

        }catch(error){
            res.status = 500;
            res.send({ status:"error", message: error.message });
        }
    }
    else if(req.method == "POST")
    {
        res.status(200).send({message:"request not allowed"});
    }
}

export default CollectionItemDetailsApi