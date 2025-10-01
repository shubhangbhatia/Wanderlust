const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("Connected to DB.");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect(MONGO_URL)
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "685e47a4845bf9b1ee5becad"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}


initDB();