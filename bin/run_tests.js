const sawn = require('sawn');

const env = process.env; // the correct test env is set in the inidivudla test runners

console.log('tests-begin');

sawn(env)
.run({ cwd: '.', cmd: 'mix', args: ['test'] })
.run({ cwd: 'apps/interface', cmd: 'node', args: ['bin/run_client_unit.js'] })
.run({ cwd: '.', cmd: 'node', args: ['bin/run_e2e.js'] })
.then(() => {
  console.log('tests-complete');
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
