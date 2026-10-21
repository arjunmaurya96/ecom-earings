import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Poppins font – website ke andar se hi load (fast, bina Google request)
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@/styles/global.css';

import AppProviders from '@/context/AppProviders';
import { PLACEHOLDER_IMAGE } from '@/utils/image';
import App from './App';

// Koi photo load na ho to broken image ki jagah placeholder dikhe
window.addEventListener(
  'error',
  (e) => {
    const el = e.target;
    if (el?.tagName !== 'IMG' || el.src.endsWith(PLACEHOLDER_IMAGE)) return;
    // srcset / <picture> hatao, warna browser wapas wahi tooti photo try karega
    el.removeAttribute('srcset');
    if (el.parentElement?.tagName === 'PICTURE') el.parentElement.querySelectorAll('source').forEach((s) => s.remove());
    el.src = PLACEHOLDER_IMAGE;
  },
  true,
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
