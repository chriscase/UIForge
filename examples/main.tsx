import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import ActivityStreamExample from './ActivityStreamExample'
import IconLibrary from './IconLibrary'
import VideoExample from './VideoExample'
import UseResponsiveExample from './UseResponsiveExample'
import UseDynamicPageCountExample from './UseDynamicPageCountExample'
import SidebarExample from './SidebarExample'
import AppDemo from './App'
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
    case '/use-responsive':
      return <UseResponsiveExample />
    case '/use-dynamic-page-count':
      return <UseDynamicPageCountExample />
    case '/sidebar':
      return <SidebarExample />
    case '/grid':
    case '/blocks-editor':
    case '/combobox':
    case '/button':
      return <AppDemo />
    default:
      return <Home onNavigate={navigate} />
  }
}

export default function App() {
  return <Router />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
