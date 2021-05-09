const mongoose = require('mongoose');

// jcUser
// 5ntkozV7TTdhOAlW
// mongodb+srv://jcUser:*****@cluster0.xovqe.mongodb.net/hospitaldb

const dbConnection = async () => {
    
    try{
   
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        
    } catch ( error ) {
        console.log(error);
        throw new Error ('Error a la hora de iniciar la BD. Ver logs');
    }

}

module.exports = {
    dbConnection
}

