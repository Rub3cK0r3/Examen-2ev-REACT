import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TareaProvider } from './context/context.tsx'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TareaProvider>
        <App />
      </TareaProvider>
    </BrowserRouter>
  </StrictMode>,
)
