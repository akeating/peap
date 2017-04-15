const sawn = require('sawn');

const env = process.env;

sawn(env)
.run({ cwd: '.', cmd: 'mix', args: ['deps.get'] })
.run({ cwd: '.', cmd: 'mix', args: ['compile'] })
.run({ cwd: 'apps/domain', cmd: 'mix', args: ['ecto.reset'] })
.run({ cwd: 'apps/interface', cmd: 'npm', args: ['install'] })
.run({ cwd: 'apps/interface', cmd: 'node_modules/protractor/bin/webdriver-manager', args: ['update'] })
.then(() => {
  console.log('install complete');
  console.log('Use \'mix phoenix.server\' to start');
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
