const fs = require('fs');
const path = require('path');

const emailCounterPath = path.resolve(__dirname, '../fixtures/email-counter.json');

function getAndIncrementEmailCounter() {
  if (!fs.existsSync(emailCounterPath)) {
    fs.writeFileSync(emailCounterPath, JSON.stringify({ counter: 1 }, null, 2));
  }

  const data = JSON.parse(fs.readFileSync(emailCounterPath, 'utf-8'));
  const current = data.counter;

  data.counter += 1;
  fs.writeFileSync(emailCounterPath, JSON.stringify(data, null, 2));

  return current;
}

module.exports = { getAndIncrementEmailCounter };
