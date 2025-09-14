const mongoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/crm_db?directConnection=true&tls=false&readPreference=primary&appName=mongosh+1.8.0&ssl=false";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;