import React, { useState, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';

export default function Home() {
  const [state, setState] = useState('NEW');
  const [transactionId, setTransactionId] = React.useState(uuid4());

  const buyProduct = () => {
    setState('ORDERING');
    fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId: 1, transactionId }),
    })
      .then(() => {
        setState('ORDERED');
      })
      .catch(() => {
        setState('ERROR');
      });
  };

  return (
    <>
      <div class="card m-5" style={{ textAlign: "center" }}>
        <div class="card-body">
          <h2>One click food order</h2>
          <br />
          {
            {
              NEW:     ( <button onClick={buyProduct} type="button" className="btn btn-danger"> Order Food </ button> ),
              ORDERING: ( <><button class="btn btn-danger" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Ordering...</span>
              </button></> ),
              ORDERED: ( <button disabled type="button" className="btn btn-danger"> Ordered </ button> ),
              ERROR:   ( <button >Error! Click to Retry </button> ),
            }[state]
          }
        </div>
      </div>
    </>
  );
}
