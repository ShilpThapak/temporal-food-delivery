import { oneClickBuy } from '../../../temporal/src/workflows';
import { getTemporalClient } from '../../../temporal/src/client';
import { TASK_QUEUE_NAME } from '../../../temporal/src/shared';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body; // Use req.body instead of req.json()

  const { itemId, transactionId } = body;

  if (!itemId) {
    return res.status(400).json({ error: "Must send the itemID to buy" });
  }

  try {
    await getTemporalClient().workflow.start(oneClickBuy, {
      taskQueue: TASK_QUEUE_NAME,
      workflowId: transactionId,
      args: [itemId],
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Workflow start error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}