import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster/>
  </BrowserRouter>,
)

