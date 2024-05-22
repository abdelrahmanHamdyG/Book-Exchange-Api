const pool=require("../db");
const queries=require("./queries")


const getAllClients=(req,res)=>{

    pool.query(queries.getAllClients,(error,results)=>{
        if(error) throw error
        res.status(200).json(results.rows);
        
    });
};

module.exports={
    getAllClients,
}