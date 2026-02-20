import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <div />
  </StrictMode>,
)
