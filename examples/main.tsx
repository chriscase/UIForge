import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import ActivityStreamExample from './ActivityStreamExample'
import IconLibrary from './IconLibrary'
import VideoExample from './VideoExample'
import UseResponsiveExample from './UseResponsiveExample'
import UseDynamicPageCountExample from './UseDynamicPageCountExample'
import SidebarExample from './SidebarExample'
import SafeAreaExample from './SafeAreaExample'
import MobileHeaderExample from './MobileHeaderExample'
import CourseForgeMobileHeaderExample from './CourseForgeMobileHeaderExample'
import AppDemo from './App'
import { ThemeContext, AppTheme } from './ThemeContext'
import './index.css'

function Router() {
  const [currentPath, setCurrentPath] = useState('/')
  // Default to dark theme and persist in localStorage
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('uiforge-theme')
    // Validate saved value is a valid theme
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
    return 'dark'
  })

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('uiforge-theme', theme)
    // Also update document-level class for global styling
    document.documentElement.setAttribute('data-theme', theme)
    // Use classList to preserve any existing classes on body
    if (theme === 'light') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }, [theme])

  const navigate = (path: string) => {
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  const routeContent = (() => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={navigate} />
      case '/activity-stream':
        return <ActivityStreamExample onNavigate={navigate} />
      case '/icons':
        return <IconLibrary onNavigate={navigate} />
      case '/video':
        return <VideoExample onNavigate={navigate} />
      case '/use-responsive':
        return <UseResponsiveExample onNavigate={navigate} />
      case '/use-dynamic-page-count':
        return <UseDynamicPageCountExample onNavigate={navigate} />
      case '/sidebar':
        return <SidebarExample onNavigate={navigate} />
      case '/safe-area':
        return <SafeAreaExample onNavigate={navigate} />
      case '/mobile-header':
        return <MobileHeaderExample onNavigate={navigate} />
      case '/courseforge-mobile-header':
        return <CourseForgeMobileHeaderExample onNavigate={navigate} />
      case '/grid':
      case '/blocks-editor':
      case '/combobox':
      case '/button':
        return <AppDemo onNavigate={navigate} />
      default:
        return <Home onNavigate={navigate} />
    }
  })()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {routeContent}
    </ThemeContext.Provider>
  )
}

export default function App() {
  return <Router />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
