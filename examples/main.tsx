import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import ActivityStreamExample from './ActivityStreamExample'
import IconLibrary from './IconLibrary'
import VideoExample from './VideoExample'
import App from './App'
import './index.css'

function Router() {
  const [currentPath, setCurrentPath] = useState('/')

  const navigate = (path: string) => {
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  switch (currentPath) {
    case '/':
      return <Home onNavigate={navigate} />
    case '/activity-stream':
      return <ActivityStreamExample onNavigate={navigate} />
    case '/icons':
      return <IconLibrary onNavigate={navigate} />
    case '/video':
      return <VideoExample />
    case '/grid':
    case '/blocks-editor':
    case '/combobox':
    case '/button':
      return <App />
    default:
      return <Home onNavigate={navigate} />
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
