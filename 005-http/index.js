const http = require('http');
const fs = require('fs');
require('dotenv').config();
const APIKey = process.env.APIKey
const PORT = process.env.PORT
let query = 'New York'
const url = `http://api.weatherstack.com/current?access_key=${APIKey}&query=${query}`

let args = process.argv.slice(2).join(' ');

if (args.length > 0) {
    query = args;
} 

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8'
    });
    res.end('<h1>Привет, мир!</h1>', 'utf8'); // закончить отправку ответа
});

http.get(url, (res) => {
    const { statusCode } = res
    if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})


server.listen(PORT || 3000, () => {
    console.log(`App listening on port ${PORT}`);
}); 