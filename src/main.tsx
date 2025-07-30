import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Hızlı render
const root = document.getElementById('root')!;
const loadingDiv = root.children[0];

// Loading ekranını hemen kaldır
if (loadingDiv) {
  loadingDiv.remove();
}

// App'i hemen render et
createRoot(root).render(<App />);
