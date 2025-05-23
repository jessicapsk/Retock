import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
// For React <18, it would be: import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // For React 18
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}