// Create web server
// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = require('./comments');
const port = 3000;
const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/addComment') {
        const comment = urlObj.query.comment;
        comments.add(comment, () => {
            res.end('add comment success');
        });
    } else if (pathname === '/getComments') {
        comments.get((data) => {
            res.end(data);
        });
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});