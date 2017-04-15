const sawn = require('sawn');

const args = process.argv.slice(2);
const env = process.env;

console.log('client-unit-begin');

const karma = { cwd: '.', cmd: 'node_modules/.bin/karma', args: ['start', '--single-run'] };
const karmaWatch = { cwd: '.', cmd: 'node_modules/.bin/karma', args: ['start'] };

let selection = karma;
if (args.length && args[0] === '--watch') {
  selection = karmaWatch;
}

sawn(env)
.run(selection)
.then(() => {
  console.log('client-unit-complete');
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
