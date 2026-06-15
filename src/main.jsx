import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/App.css';
import ErrorBoundary from './errors/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Failed to initialize application: root element not found.'
  );
}

const root = ReactDOM.createRoot(container);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);