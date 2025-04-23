import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ShotTracker from './components/ShotTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShotTracker />
  </StrictMode>,
)
