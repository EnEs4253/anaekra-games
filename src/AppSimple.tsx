import { useState } from 'react';
import HomePage from './pages/HomePageSimple';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'home') {
    return <HomePage onNavigate={setCurrentPage} />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>Bu Sayfa Hazırlanıyor</h2>
      <p>Yakında bu özellik aktif olacak!</p>
      <button
        onClick={() => setCurrentPage('home')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
}

export default App;
