const express=require("express")
const ourRoutes=require("./src/routes");

console.log("5");

const app=express()
const port=3000

app.get("/",(req,res)=>{

    res.send("hello")

})

app.use("/api/v1",ourRoutes);

app.listen(port,()=>{

    console.log("listening on port 3000");
})