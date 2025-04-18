import { Client, Connection } from '@temporalio/client';

const client = makeClient();

function makeClient() {
  const connection = Connection.lazy({
    address: 'localhost:7233',
    // In production, pass options to configure TLS and other settings.
  });
  return new Client({ connection });
}

export function getTemporalClient() {
  return client;
}