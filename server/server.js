// Initiate Express, Sequelize, Moment JS, etc
const express = require("express");
const app = express();
const path = require("path");
const {readUpdates} = require("./utils/ReadUpdates");
const net = require('net');

// Request ready
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    // Pass to next layer of middleware
    next();
});

// Expose CSS and js files
// app.use(express.static(path.join(__dirname, "../build")));

app.get("/json/updates", async(req, res) => {
    let updates = readUpdates.getUpdates()
    res.json(updates);
});

// React Frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/'));
// });

// Setup 404 page
// app.use((req, res, next) => {
//     res.status("404").send("We hit a 404 wall").end();
// });


// Listen for requests
function getAvailablePort (startingAt) {

    function getNextAvailablePort (currentPort, cb) {
        const server = net.createServer()
        server.listen(currentPort, _ => {
            server.once('close', _ => {
                cb(currentPort)
            })
            server.close()
        })
        server.on('error', _ => {
            getNextAvailablePort(++currentPort, cb)
        })
    }

    return new Promise(resolve => {
        getNextAvailablePort(startingAt, resolve)
    })
}
async function startServer() {
    let port = 3001 || process.env.XSURGE || await getAvailablePort(3000);

    app.listen(port, () => {
        console.log(`JSON server listening at ${port}`);
    });
}
startServer();