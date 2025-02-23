import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

document.querySelector('html')?.setAttribute('data-bs-theme','dark');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
