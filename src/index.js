import React from 'react';
import ReactDOM from 'react-dom/client';
import ListExample from "./ListExample";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {<ListExample/>}
  </React.StrictMode>
);