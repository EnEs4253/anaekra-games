# Çocuk Dostu Web Sitesi Tasarım Sistemi 🎨

## Renk Paleti

### Ana Renkler
```css
/* Gradient Kombinasyonları */
from-yellow-200 via-pink-200 to-purple-200    /* Ana sayfa hero */
from-green-200 via-blue-200 to-purple-200     /* Oyun sayfası */
from-purple-200 via-pink-200 to-blue-200      /* Öğrenme sayfası */
from-orange-200 via-red-200 to-pink-200       /* Ebeveyn paneli */
from-pink-200 via-purple-200 to-indigo-200    /* Hakkımızda */
```

### Buton Renkleri
```css
/* Ana Butonlar */
from-green-400 to-blue-500      /* Oyna butonu */
from-purple-400 to-pink-500     /* Öğren butonu */
from-orange-400 to-red-500      /* Ebeveyn paneli */
from-pink-400 to-purple-500     /* Hakkımızda */

/* Kategori Butonları */
from-red-400 to-pink-500        /* Boyama/Renkler */
from-blue-400 to-purple-500     /* Şekiller */
from-blue-400 to-cyan-500       /* Balık tutma */
from-green-400 to-yellow-500    /* Zıplama */
from-green-400 to-emerald-500   /* Hayvan sesleri */
from-purple-400 to-indigo-500   /* Geometrik şekiller */
```

### Navigasyon Renkleri
```css
bg-blue-500     /* Ana sayfa */
bg-green-500    /* Oyna */
bg-purple-500   /* Eğlen-Öğren */
bg-orange-500   /* Ebeveyn paneli */
bg-pink-500     /* Hakkımızda */
```

### İstatistik Kartları
```css
from-blue-100 to-blue-200       /* Mavi istatistik */
from-green-100 to-green-200     /* Yeşil istatistik */
from-purple-100 to-purple-200   /* Mor istatistik */
from-pink-100 to-pink-200       /* Pembe istatistik */
```

## Responsive Breakpoint'ler

### Mobil First Yaklaşım
```css
/* Varsayılan: Mobil (0px+) */
- Tek sütun layout
- Küçük padding (p-4)
- Kompakt butonlar
- Alt navigasyon

/* sm: (640px+) - Küçük Tablet */
- İki sütun başlangıcı
- Orta padding (sm:p-6)
- Büyük butonlar

/* md: (768px+) - Orta Tablet */
- İki sütun grid (md:grid-cols-2)
- Büyük padding (md:p-8)
- Üst navigasyon görünür

/* lg: (1024px+) - Büyük Tablet/Desktop */
- Üç-dört sütun grid (lg:grid-cols-3, lg:grid-cols-4)
- Maksimum padding
- Tam navigasyon menüsü
```

### Grid Sistemleri
```css
/* Ana Sayfa Kategoriler */
grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4

/* Oyun Sayfası */
grid-cols-1 md:grid-cols-2

/* Öğrenme Sayfası */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* İstatistik Kartları */
grid-cols-2 md:grid-cols-4
```

## Orientation Toggle Sistemi

### CSS Sınıfları
```css
/* Landscape mode aktif edildiğinde */
.landscape-mode .grid-cols-1 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

.landscape-mode .md\\:grid-cols-2 {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}

.landscape-mode .lg\\:grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
}

.landscape-mode .min-h-\\[180px\\] {
  min-height: 140px !important;
}

.landscape-mode .text-4xl {
  font-size: 2rem !important;
}

.landscape-mode .py-12 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}
```

### JavaScript Toggle Fonksiyonu
```jsx
const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');

const toggleOrientation = () => {
  setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  document.body.classList.toggle('landscape-mode');
};
```

### Toggle Butonu
```jsx
<button
  onClick={toggleOrientation}
  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
  title={orientation === 'portrait' ? 'Yatay Görünüme Geç' : 'Dikey Görünüme Geç'}
>
  {orientation === 'portrait' ? (
    <>
      <Tablet className="w-5 h-5 text-gray-600" />
      <span className="hidden sm:inline text-sm font-medium text-gray-700">Yatay</span>
    </>
  ) : (
    <>
      <Smartphone className="w-5 h-5 text-gray-600" />
      <span className="hidden sm:inline text-sm font-medium text-gray-700">Dikey</span>
    </>
  )}
</button>
```

## Tipografi

### Font Boyutları
```css
/* Başlıklar */
text-4xl sm:text-5xl     /* Ana başlık (H1) */
text-3xl sm:text-4xl     /* Alt başlık (H2) */
text-xl sm:text-2xl      /* Kart başlıkları (H3) */

/* İçerik */
text-lg sm:text-xl       /* Ana açıklama metni */
text-sm sm:text-lg       /* Kart açıklamaları */
text-xs sm:text-sm       /* Küçük metinler */
```

### Font Ağırlıkları
```css
font-bold      /* Başlıklar */
font-medium    /* Navigasyon */
font-normal    /* Normal metin */
```

## Spacing Sistemi

### Padding
```css
/* Mobil */
p-4 sm:p-6 lg:p-8        /* Genel container */
p-4 sm:p-6               /* Kartlar */
px-4 sm:px-6 lg:px-8     /* Yatay padding */
py-12 sm:py-20           /* Dikey section padding */

/* Butonlar */
px-3 sm:px-4 py-2        /* Küçük butonlar */
px-4 sm:px-6 py-2 sm:py-3 /* Orta butonlar */
px-8 py-4                /* Büyük butonlar */
```

### Margin
```css
mb-4 sm:mb-6             /* Alt margin */
mb-8 sm:mb-12            /* Büyük alt margin */
space-x-2 sm:space-x-4   /* Yatay boşluk */
space-y-4 sm:space-y-6   /* Dikey boşluk */
```

### Gap
```css
gap-4 sm:gap-6           /* Grid gap küçük */
gap-6 sm:gap-8           /* Grid gap büyük */
```

## Header Sistemi

### Basitleştirilmiş Header Yapısı
```jsx
<header className="bg-white shadow-lg border-b-4 border-yellow-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 sm:h-20">
      {/* Logo */}
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">🌟</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">ÇocukDünyası</h1>
      </div>

      {/* Orientation Toggle */}
      <div className="flex items-center space-x-2">
        {/* Toggle butonu buraya */}
      </div>
    </div>
  </div>
</header>
```

### Logo Tasarımı
```css
/* Logo container */
.logo-container {
  @apply w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 
         rounded-full flex items-center justify-center;
}

/* Logo text */
.logo-text {
  @apply text-xl sm:text-2xl font-bold text-gray-800;
}
```

## Buton Tasarımı

### Temel Buton Yapısı
```css
/* Ana Buton Sınıfları */
.btn-primary {
  @apply bg-gradient-to-r text-white font-bold shadow-lg 
         hover:shadow-xl transform hover:scale-105 
         transition-all duration-200 rounded-full;
}

/* Boyut Varyantları */
.btn-sm { @apply px-3 sm:px-4 py-2 text-xs sm:text-sm; }
.btn-md { @apply px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg; }
.btn-lg { @apply px-8 py-4 text-lg; }

/* Şekil Varyantları */
.btn-rounded { @apply rounded-full; }
.btn-square { @apply rounded-xl sm:rounded-2xl; }
```

### Hover Efektleri
```css
/* Standart Hover */
hover:shadow-xl transform hover:scale-105 transition-all duration-200

/* Aktif Durum (Mobil) */
active:scale-95 transition-all duration-300

/* Grup Hover (Kartlar için) */
group-hover:animate-bounce
group-hover:bg-white/30
```

### Orientation Toggle Butonu
```css
.orientation-btn {
  @apply flex items-center space-x-2 px-3 py-2 rounded-full 
         bg-gray-100 hover:bg-gray-200 transition-all duration-200 
         transform hover:scale-105;
}
```

## Kart Tasarımı

### Temel Kart Yapısı
```css
.card-base {
  @apply rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl 
         transition-all duration-300 cursor-pointer 
         transform hover:scale-105 active:scale-95;
}

/* Minimum Yükseklikler */
min-h-[180px] sm:min-h-[220px]  /* Küçük kartlar */
min-h-[250px] sm:min-h-[300px]  /* Orta kartlar */
min-h-[280px] sm:min-h-[320px]  /* Büyük kartlar */
```

### Gradient Arka Planlar
```css
.card-gradient {
  @apply bg-gradient-to-br text-white;
}
```

## Navigasyon Sistemi

### Alt Navigasyon (Mobil ve Tablet)
```css
/* Alt navigasyon */
.nav-mobile {
  @apply fixed bottom-0 left-0 right-0 
         bg-white border-t-2 border-yellow-300 z-50;
}

/* Navigasyon butonları */
.nav-btn {
  @apply flex flex-col items-center space-y-1 px-2 py-1 
         rounded-lg transition-all duration-200 min-w-0 flex-1;
}

/* Aktif durum */
.nav-btn-active {
  @apply text-white;
}

/* Pasif durum */
.nav-btn-inactive {
  @apply text-gray-600 hover:bg-gray-100;
}
```

### Navigasyon Öğeleri
```jsx
const navItems = [
  { id: 'home', label: 'Ana Sayfa', emoji: '🏠', color: 'bg-blue-500' },
  { id: 'play', label: 'Oyna', emoji: '🎮', color: 'bg-green-500' },
  { id: 'learn', label: 'Öğren', emoji: '🧠', color: 'bg-purple-500' },
  { id: 'parent', label: 'Ebeveyn', emoji: '🔒', color: 'bg-orange-500' },
  { id: 'about', label: 'Hakkımızda', emoji: '👨‍👩‍👧', color: 'bg-pink-500' },
];
```

### Güvenli Alan Desteği
```css
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
```

## Animasyonlar

### Geçiş Efektleri
```css
/* Sayfa geçişleri */
transition-all duration-500 ease-in-out

/* Buton geçişleri */
transition-all duration-200

/* Kart geçişleri */
transition-all duration-300
```

### Keyframe Animasyonlar
```css
/* Tailwind built-in */
animate-bounce      /* Zıplama */
animate-pulse       /* Nabız */
animate-fade-in     /* Belirme (custom) */
```

### Hover Animasyonları
```css
/* İkon animasyonları */
group-hover:animate-bounce

/* Scale animasyonları */
hover:scale-105
active:scale-95

/* Shadow animasyonları */
hover:shadow-xl
```

## İkon Sistemi

### Lucide React İkonları
```jsx
import { 
  Home, Gamepad2, BookOpen, Shield, Info,
  Palette, Shapes, Fish, Zap, Volume2,
  Star, Heart, ArrowLeft, Clock, BarChart3,
  Users, Lock, Settings, Tablet, Smartphone,
  RotateCcw
} from 'lucide-react';
```

### İkon Boyutları
```css
w-5 h-5                   /* Küçük ikonlar (navigation) */
w-6 h-6 sm:w-8 sm:h-8     /* Orta ikonlar */
w-8 h-8 sm:w-12 sm:h-12   /* Büyük ikonlar */
w-10 h-10                 /* Logo ikonları */
```

## Emoji Kullanımı

### Kategori Emojileri
```
🎮 - Oyunlar
🧠 - Öğrenme
🔒 - Ebeveyn Paneli
👨‍👩‍👧 - Hakkımızda
🎨 - Boyama
🔷 - Şekiller
🎣 - Balık Tutma
🦘 - Zıplama
🌈 - Renkler
🐾 - Hayvan Sesleri
⭐ - Şekiller (Geometrik)
🏠 - Ana Sayfa
🌟 - Logo
```

### Boyutlar
```css
text-lg                   /* Navigasyon emoji */
text-3xl sm:text-4xl      /* Küçük emoji */
text-4xl sm:text-6xl      /* Orta emoji */
text-5xl sm:text-7xl      /* Büyük emoji */
```

## Layout Yapısı

### Container Sistemi
```css
/* Ana container */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

/* Orta container */
max-w-4xl mx-auto px-4 sm:px-6 lg:px-8

/* Küçük container */
max-w-md mx-auto px-4 sm:px-6 lg:px-8
```

### Section Yapısı
```css
/* Hero section */
.hero-section {
  @apply relative overflow-hidden py-12 sm:py-20;
}

/* Content section */
.content-section {
  @apply py-12 sm:py-20;
}

/* White background section */
.white-section {
  @apply bg-white py-12 sm:py-16;
}
```

### Page Layout Template
```jsx
<div className="min-h-screen pb-20 md:pb-8">
  {/* Header Section */}
  <section className="bg-gradient-to-r from-color-200 via-color-200 to-color-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Geri butonu */}
      <div className="flex items-center mb-6">
        <button onClick={() => onNavigate('home')} 
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
          <ArrowLeft size={24} />
          <span className="font-medium">Ana Sayfa</span>
        </button>
      </div>
      
      {/* Başlık */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Sayfa Başlığı 🎯
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Açıklama metni
        </p>
      </div>
    </div>
  </section>

  {/* Content Section */}
  <section className="py-12 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* İçerik kartları */}
      </div>
    </div>
  </section>
</div>
```

## Güvenlik ve Erişilebilirlik

### Ebeveyn Paneli
```css
/* Güvenli giriş formu */
.secure-form {
  @apply bg-white rounded-3xl shadow-xl p-8;
}

/* Şifre input */
.password-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl 
         focus:ring-2 focus:ring-orange-500 focus:border-transparent;
}
```

### Touch Targets
```css
/* Minimum dokunma alanı (44px) */
.touch-target {
  @apply min-w-[44px] min-h-[44px];
}
```

### Accessibility
```css
/* Focus states */
focus:ring-2 focus:ring-blue-500 focus:border-transparent

/* Screen reader support */
sr-only

/* High contrast support */
contrast-more:border-gray-900
```

## Kullanım Örnekleri

### Yeni Sayfa Oluşturma
```jsx
// 1. Responsive header
<section className="bg-gradient-to-r from-color-200 via-color-200 to-color-200 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Geri butonu */}
    <div className="flex items-center mb-6">
      <button onClick={() => onNavigate('home')} 
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
        <ArrowLeft size={24} />
        <span className="font-medium">Ana Sayfa</span>
      </button>
    </div>
    
    {/* Başlık */}
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Sayfa Başlığı 🎯
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        Açıklama metni
      </p>
    </div>
  </div>
</section>

// 2. İçerik grid'i
<section className="py-12 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* Kartlar */}
    </div>
  </div>
</section>
```

### Yeni Buton Ekleme
```jsx
<button className="bg-gradient-to-r from-color-400 to-color-500 text-white 
                   px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg 
                   font-bold shadow-lg hover:shadow-xl transform hover:scale-105 
                   active:scale-95 transition-all duration-200">
  Buton Metni
</button>
```

### Orientation Toggle Ekleme
```jsx
// State tanımı
const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');

// Toggle fonksiyonu
const toggleOrientation = () => {
  setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  document.body.classList.toggle('landscape-mode');
};

// Buton komponenti
<button
  onClick={toggleOrientation}
  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
  title={orientation === 'portrait' ? 'Yatay Görünüme Geç' : 'Dikey Görünüme Geç'}
>
  {orientation === 'portrait' ? (
    <>
      <Tablet className="w-5 h-5 text-gray-600" />
      <span className="hidden sm:inline text-sm font-medium text-gray-700">Yatay</span>
    </>
  ) : (
    <>
      <Smartphone className="w-5 h-5 text-gray-600" />
      <span className="hidden sm:inline text-sm font-medium text-gray-700">Dikey</span>
    </>
  )}
</button>
```

### Kart Komponenti Oluşturma
```jsx
<div className="group cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300">
  <div className={`bg-gradient-to-br ${color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white min-h-[250px] sm:min-h-[300px] flex flex-col justify-between`}>
    <div className="text-center">
      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{emoji}</div>
      <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 group-hover:animate-bounce" />
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{title}</h3>
      <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6 leading-relaxed">{description}</p>
    </div>
    <div>
      <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-center group-hover:bg-white/30 transition-all duration-200">
        <span className="text-sm sm:text-lg font-bold">Buton Metni →</span>
      </div>
    </div>
  </div>
</div>
```

## CSS Utilities (index.css)

### Safe Area Support
```css
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Landscape Mode Overrides
```css
.landscape-mode .grid-cols-1 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

.landscape-mode .md\\:grid-cols-2 {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}

.landscape-mode .lg\\:grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
}

.landscape-mode .min-h-\\[180px\\] {
  min-height: 140px !important;
}

.landscape-mode .text-4xl {
  font-size: 2rem !important;
}

.landscape-mode .py-12 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}
```

## Component Yapısı

### App.tsx
```jsx
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'play': return <PlayPage onNavigate={setCurrentPage} />;
      case 'learn': return <LearnPage onNavigate={setCurrentPage} />;
      case 'parent': return <ParentPanel onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage onNavigate={setCurrentPage} />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="transition-all duration-500 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
}
```

### Header.tsx
```jsx
const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
    document.body.classList.toggle('landscape-mode');
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-yellow-300">
      {/* Header content */}
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-300 z-50 safe-area-pb">
        {/* Navigation items */}
      </div>
    </header>
  );
};
```

## Notlar

- Tüm renkler Tailwind CSS color palette'ini kullanır
- Responsive tasarım mobile-first yaklaşımı ile yapılır
- Animasyonlar performans için CSS transitions kullanır
- Accessibility için minimum contrast ratios sağlanır
- Touch-friendly design için minimum 44px touch targets kullanılır
- Safe area support iOS cihazlar için eklenir
- Orientation toggle özelliği dinamik CSS class değişimi ile çalışır
- Alt navigasyon tüm cihazlarda görünür ve kullanılabilir
- Header sadece logo ve orientation toggle içerir
- Tüm sayfalarda geri butonu bulunur
- Emoji ve Lucide React ikonları birlikte kullanılır