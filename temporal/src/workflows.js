import { proxyActivities, sleep } from '@temporalio/workflow';

const { purchase } = proxyActivities({
  startToCloseTimeout: '1 minute',
});

export async function oneClickBuy(id) {
  const result = await purchase(id); // calling the activity
  await sleep('10 seconds'); // sleep to simulate a longer response.
  console.log(`Activity ID: ${result} executed!`);
  return result;
}