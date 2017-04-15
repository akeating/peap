const sawn = require('sawn');

const env = process.env;

sawn(env)
.run({ cwd: '.', cmd: 'rm', args: ['-rf', '_build'] })
.run({ cwd: '.', cmd: 'rm', args: ['-rf', 'node_modules'] })
.run({ cwd: 'apps/interface', cmd: 'rm', args: ['-rf', 'node_modules'] })
.run({ cwd: '.', cmd: 'rm', args: ['-rf', 'deps'] })
.then(() => {
  // console.log('clean-complete');
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
