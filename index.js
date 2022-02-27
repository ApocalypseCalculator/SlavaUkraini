const childProcess = require('child_process');
const chalk = require('chalk');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let workerCount = 1;

if(argv.workers && !isNaN(argv.workers) && parseInt(argv.workers) > 0) {
    workerCount = parseInt(argv.workers);
}

for(let i = 1; i < workerCount+1; i++) {
    let process = childProcess.spawn('node', ['attack.js'], {
    })
    process.on('exit', () => {
        console.log(chalk.yellow(`Worker #${i} exited.`));
    })
    process.on('spawn', () => {
        console.log(chalk.green(`Worker #${i} spawned.`));
    })
    process.on('error', () => {
        console.log(chalk.red(`Worker #${i} encountered an error.`));
    })
    process.stderr.on('data', (err) => {
        console.log(chalk.bgYellow('error: ' + err));
    })
    process.stdout.on('data', (data) => {
        console.log(`Hit ${data}`);
    })
}