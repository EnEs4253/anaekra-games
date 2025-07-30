interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const categories = [
    { id: 'learn', title: 'Eğlen-Öğren', emoji: '🧠' },
    { id: 'play', title: 'Oyna', emoji: '🎮' },
    { id: 'quiz', title: 'Bil Bakalım', emoji: '❓' },
    { id: 'about', title: 'Hakkımızda', emoji: 'ℹ️' },
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#6B46C1', marginBottom: '20px' }}>
        Hoş Geldin! 🌈
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '40px' }}>
        Eğlenceli oyunlara hazır mısın?
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px', 
        maxWidth: '600px', 
        margin: '0 auto' 
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onNavigate(category.id)}
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
              {category.emoji}
            </div>
            <h3 style={{ margin: '0', fontSize: '18px' }}>
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
