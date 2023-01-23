const config = require('../config');
const { getUserSettings } = require('./settings');

async function rollDices(req, userId, count) {
  const { sides } = await getUserSettings(req, userId);
  const promises = [];
  const rollDice = async () => {
    const response = await req.fetch(`${config.diceApiUrl}/rolls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sides }),
    });
    if (!response.ok) {
      throw new Error(`Cannot roll dice for user ${userId}: ${response.statusText}`);
    }
    const json = await response.json();
    return json.result;
  }

  for (let i = 0; i < count; i++) {
    promises.push(rollDice());
  }

  return { result: await Promise.all(promises) };
}

async function getRollsHistory(req, userId, max) {
  max = max ?? '';
  const { sides } = await getUserSettings(req, userId);
  const response = await req.fetch(`${config.diceApiUrl}/rolls/history?max=${max}&sides=${sides}`);
  if (!response.ok) {
    throw new Error(`Cannot get roll history for user ${userId}: ${response.statusText}`);
  }
  return response.json();
}

module.exports = {
  rollDices,
  getRollsHistory,
};
