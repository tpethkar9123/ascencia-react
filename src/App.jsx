import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.elementorFrontend) {
        setTimeout(() => { 
          if (window.elementorFrontend.init) window.elementorFrontend.init(); 
        }, 100);
    }
  }, [pathname]);
  return null;
}

function App() {
  const [MenuPopup, setMenuPopup] = React.useState(null);
  useEffect(() => {
    import('./components/MobileMenu').then(mod => setMenuPopup(() => mod.default)).catch(() => {});
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ascencia-malta" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
      {MenuPopup && <MenuPopup />}
    </Router>
  );
}

export default App;