const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = Schema({
id:{
    type: String,
    required: true,
},
transations:{
    type: Schema.Types.Array,
    require:true,
}
})

module.exports = mongoose.model("User",userSchema);