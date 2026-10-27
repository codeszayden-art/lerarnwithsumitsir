import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.css';


import "@/styles/age-calculator.css";
import "@/styles/books.css";
import "@/styles/carrer.css";
import "@/styles/enquire-now.css";
import "@/styles/ndaFoundation.css";
import "@/styles/contact-us.css";

import "@/styles/why-lws.css";
import "@/styles/tat-mock.css";  
// import "@/styles/tat-mock.css";
import "@/styles/mock-tests.css";
import "@/styles/oir/OirTest.css";
import "@/styles/oir/OirMockOne.css";
import "@/styles/ppdt/ppdt.css";
import "@/styles/ppdt/ppdt-mock-test-one.css";
import "@/styles/wat-mock.css";
import "@/styles/blog.css";
import "@/styles/results.css";
import "@/styles/personal-interview.css";
import "@/styles/srt.css";
import "@/styles/video.css";
import "@/styles/faq.css";
import "@/styles/gallery.css";  
import "@/styles/about.css";

import App from '@/App';
import { registerServiceWorker } from '@/pwa/register';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

document.getElementById('boot')?.remove();
registerServiceWorker();
