import { activityInfo } from '@temporalio/activity';
export async function purchase(id) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Purchased ${id}!`);
  return activityInfo().activityId;
}