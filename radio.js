/**
 *
 *  ~~ RADIO CONTROL ~~
 *
 */

const http = require('http');
const mpd = require('mpd');
const cmd = mpd.cmd;

// our http server will listen for radio actions to do
const http_server = http.createServer((req, res) => {
    // do some stuff based on the requested path, pretty simple
    switch (req.url) {
        case '/':
            // song info in a nice html manner i guess
            mpd_client.sendCommand(cmd("currentsong", []), (err, msg) => {
                if (err) throw err;
                let song = mpd.parseKeyValueMessage(msg);
                res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
                res.end('<p>Playing: ' + song.Artist + ' - ' + song.Title + '</p><p><a href="/next">next</a> | <a href="/prev">previous</a></p>');
            });
        break;
        case '/now':
            // song info in raw text
            mpd_client.sendCommand(cmd("currentsong", []), (err, msg) => {
                if (err) throw err;
                let song = mpd.parseKeyValueMessage(msg);
                res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                res.end(song.Artist + ' - ' + song.Title);
            });
        break;
        case '/next':
            // next song please
            mpd_client.sendCommand(cmd("next", []), (err, msg) => {
                if (err) throw err;
                res.writeHead(303, { 'Location': '/' });
                res.end();
            });
        break;
        case '/prev':
            // previous song please
            mpd_client.sendCommand(cmd("previous", []), (err, msg) => {
                if (err) throw err;
                res.writeHead(303, { 'Location': '/' });
                res.end();
            });
        break;
        default:
            // dunno whatcha want
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('huh?');
    }
});

// set up our connection to the local mpd instance
const mpd_client = mpd.connect({
    port: 6600,
    host: 'localhost',
});

// wait for the mpd client to be ready
mpd_client.on('ready', () => {
    console.log('node-mpd client connected to local mpd server');

    // start listening for commands once mpd is ready
    http_server.listen(8080, () => {
        console.log('listening on http/8080 for actions');
    });
});
