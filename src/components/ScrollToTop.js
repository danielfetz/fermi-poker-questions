import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll to top when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
