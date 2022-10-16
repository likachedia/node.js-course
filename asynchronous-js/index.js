const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data)=> {
//     console.log(`Breed: ${data}`);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//         if(err) return console.log(err.message);
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if(err) return console.log(err.message);
//             console.log('Random dog image saved to file');
//         })
//     })
// })

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('I could not find that file.');
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('Could not write file.');
            resolve('success');
        })
    })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // console.log(res.body.message);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(ele => ele.body.message)
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file');
    } catch {
        console.log(err);
        throw err;
    }

    return '2: promise is finished';
}

(async()=> {
    try{
        console.log('1: starting..');
        const x = await getDogPic();
        console.log(x);
        console.log('Done!');
    }catch(err) {
        console.log('ERROR')
    }
})();
/*
console.log('1: starting..');
getDogPic().then(x => {
    console.log(x);
    console.log('Done!');
}).catch(err => console.log('ERROR'));
*/
/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
       return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    }).then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    }).then(() => {
        console.log('Random dog image saved to file');
    }).catch(err => {
        console.log(err);
    })
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data)=> {
//     console.log(`Breed: ${data}`);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if(err) return console.log(err.message);
//             console.log('Random dog image saved to file');
//         })
//     }).catch(err => {
//         console.log(err.message);
//     })
// })