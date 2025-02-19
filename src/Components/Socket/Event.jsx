import React from 'react';

const Event =({ events })=> {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event?.message }</li>
      )
    }
    </ul>
  );
}

export default Event