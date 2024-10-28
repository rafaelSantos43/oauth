const { MongoClient } = require('mongodb')

const url = "mongodb+srv://dahinaquintero2024:imnYA89IPBSqD4aG@posts.rxuhou1.mongodb.net/?retryWrites=true&w=majority&appName=posts"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });


const dbName = 'test'

const connectMongodb = async (emailUser) => {
    console.log(emailUser);
    
    try {
       await client.connect()
       const db = client.db(dbName)

       const collection = db.collection('users')
       const query = { email: emailUser.trim().toLowerCase()}

       const result = await collection.find(query).toArray()
       return result
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
    } 
}

module.exports = connectMongodb