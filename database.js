const {Client} = require('pg');



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