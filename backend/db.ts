import {Client} from "pg";
import dotenv from 'dotenv';
dotenv.config();

const DBString = String(process.env.DBString);
const pgClient = new Client({connectionString:DBString});

const connectDB = async ()=>{
    try {
        await pgClient.connect();
        console.log("DB Connected");
    } catch (error) {
        console.error("Error in DB connection" , error)
    }
}
export  {connectDB,pgClient};