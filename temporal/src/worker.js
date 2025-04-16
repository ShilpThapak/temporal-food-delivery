import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities.js';
import { TASK_QUEUE_NAME } from './shared.js';
import path from 'path';
import { fileURLToPath } from 'url';

run().catch((err) => console.log(err));

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // In production, pass options to configure TLS and other settings.
  });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workflowsPath = path.resolve(__dirname, './workflows.js');
  try {
    const worker = await Worker.create({
      connection,
      workflowsPath: workflowsPath,
      activities,
      taskQueue: TASK_QUEUE_NAME
    });
    await worker.run();
  }
  finally {
    connection.close();
  }
}