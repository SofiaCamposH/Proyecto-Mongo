import mongoose from "mongoose";
const articleSchema = new mongoose.Schema ({
    title:{type:String,required:true,},
    description: {type:String,},
    content:{type:String,requerired:true,},
},{timestamps:true})
const ArticleModel =mongoose.model("article", articleSchema)

export default ArticleModel 