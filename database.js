const {Client} = require('pg');

const client = new Client({
    host: "66.228.40.55",
    user: "postgres",
    port: 5432,
    database: "surge",
    password: "super_secret_postgres_password"
})

client.connect();

client.query('SELECT token_holders from tokens', (err, result)=>{
    if(!err){
        console.log(result.rows);
    } else {
        console.log(err.message);
    }
    client.close();
});

client.query('SELECT farm_holders from farms', (err, result)=>{
    if(!err){
        console.log(result.rows);
    } else {
        console.log(err.message);
    }
    client.close();
});