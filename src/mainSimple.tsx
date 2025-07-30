import { createRoot } from 'react-dom/client';
import App from './AppSimple';
import './simple.css';

const root = document.getElementById('root')!;
root.innerHTML = ''; // Loading screen'i hemen kaldır

createRoot(root).render(<App />);
