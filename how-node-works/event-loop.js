const fs = require('fs');

setTimeout(() => console.log('Timer 1 fiished'), 0);
setImmediate(() => console.log('Immediate 1 fiished'));

fs.readFile("test-file.txt", ()=> {
    console.log("I/O finished");

    setTimeout(() => console.log('Timer 2 fiished'), 0);
    setTimeout(() => console.log('Timer 2 fiished'), 3000);
    setImmediate(() => console.log('Immediate 2 fiished'));

    process.nextTick(()=> console.log('Proccess.nexttick'))
})