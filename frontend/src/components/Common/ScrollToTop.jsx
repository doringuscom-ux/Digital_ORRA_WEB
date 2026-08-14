import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If state specifies scroll to form or target, handle it, else scroll to top
    if (state?.scrollToForm) {
      setTimeout(() => {
        const formElem = document.querySelector('.contact-form-card');
        if (formElem) {
          formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, state]);

  return null;
}
