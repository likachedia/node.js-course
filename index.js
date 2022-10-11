const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

// import { replaceTemplate } from './modules.js/replaceTemplates';
const replaceTemplate = require('./modules/replaceTemplates');
// blocking, syncronouse code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('output created');

//asyncronouse
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('your file created!');
//             })
//         });
//     })
// })

////////////////////
//// SERVER
// const replaceTemplate = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%ID%}/g, product.id);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);

//    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//    return output;

// }
const templOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(ele => slugify(ele.productName, {lower: true}));

const server = http.createServer((req, res) => {
    const pathName = req.url;

    const {query, pathname } = url.parse(req.url, true);

    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(ele => replaceTemplate(templCard,ele)).join('');
        const output = templOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);

    } else if(pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(templProduct, product);
        res.end(output);


    } else if(pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page not found</h1>');
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})