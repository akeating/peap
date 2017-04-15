const sawn = require('sawn');

const env = process.env;
env.MIX_ENV = 'teste2e';

console.log('e2e-begin');

sawn(env)
.run({ cwd: 'apps/domain', cmd: 'mix', args: ['ecto.reset'] })
.run({ cwd: 'apps/interface', cmd: 'npm', args: ['run', 'webpack-test-e2e'] })
.run({ cwd: 'apps/interface', cmd: 'mix', args: ['s'], waitFor: /Running/ })
.run({ cwd: 'apps/interface', cmd: 'node_modules/.bin/protractor', args: [] })
.then(() => {
  console.log('e2e-complete');
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
