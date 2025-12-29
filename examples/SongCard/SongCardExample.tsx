import React, { useState, useEffect } from 'react'
import { SongCard } from './SongCard'
import { MediaListSkeleton } from '../../src/components/Skeletons/MediaListSkeleton'
import { useTheme } from '../ThemeContext'
import './SongCardExample.css'

/**
 * Sample song data for demonstration
 */
const sampleSongs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    albumArtUrl: 'https://picsum.photos/seed/song1/400/400',
    year: 1975,
    duration: '5:55',
    genre: 'Rock',
    versionCount: 3,
  },
  {
    id: 2,
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    albumArtUrl: 'https://picsum.photos/seed/song2/400/400',
    year: 1971,
    duration: '3:03',
    genre: 'Pop',
    versionCount: 1,
  },
  {
    id: 3,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    albumArtUrl: 'https://picsum.photos/seed/song3/400/400',
    year: 1982,
    duration: '4:54',
    genre: 'Pop',
    versionCount: 2,
  },
  {
    id: 4,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    albumArtUrl: 'https://picsum.photos/seed/song4/400/400',
    year: 1991,
    duration: '5:01',
    genre: 'Grunge',
    versionCount: 1,
  },
  {
    id: 5,
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    albumArtUrl: 'https://picsum.photos/seed/song5/400/400',
    year: 1976,
    duration: '6:30',
    genre: 'Rock',
    versionCount: 2,
  },
  {
    id: 6,
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album: 'Appetite for Destruction',
    albumArtUrl: 'https://picsum.photos/seed/song6/400/400',
    year: 1987,
    duration: '5:56',
    genre: 'Hard Rock',
    versionCount: 1,
  },
]

interface SongCardExampleProps {
  onBack: () => void
}

/**
 * SongCardExample - Interactive gallery demonstrating the SongCard component
 * 
 * This example shows how MediaCard can be composed into domain-specific components
 * like SongCard for music applications.
 */
const SongCardExample: React.FC<SongCardExampleProps> = ({ onBack }) => {
  const { theme } = useTheme()
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [notifications, setNotifications] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useNexaLiveTheme, setUseNexaLiveTheme] = useState(false)

  // Dynamically load/unload NexaLive theme
  useEffect(() => {
    if (useNexaLiveTheme) {
      const link = document.createElement('link')
      link.id = 'nexalive-theme'
      link.rel = 'stylesheet'
      link.href = new URL('../themes/nexalive-theme.css', import.meta.url).href
      document.head.appendChild(link)
      document.body.classList.add('nexalive-theme')
    } else {
      const link = document.getElementById('nexalive-theme')
      if (link) {
        link.remove()
      }
      document.body.classList.remove('nexalive-theme')
    }

    return () => {
      const link = document.getElementById('nexalive-theme')
      if (link) {
        link.remove()
      }
      document.body.classList.remove('nexalive-theme')
    }
  }, [useNexaLiveTheme])

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1))
    }, 3000)
  }

  const handlePlay = (song: typeof sampleSongs[0]) => {
    setPlayingId(song.id)
    addNotification(`Playing: ${song.title} by ${song.artist}`)
    // Simulate stopping after 3 seconds
    setTimeout(() => setPlayingId(null), 3000)
  }

  const handleAddToPlaylist = (song: typeof sampleSongs[0]) => {
    addNotification(`Added to playlist: ${song.title}`)
  }

  const handleShowInfo = (song: typeof sampleSongs[0]) => {
    addNotification(`Showing info for: ${song.title}`)
  }

  return (
    <div className="song-card-example" data-theme={theme}>
      <div className="song-card-example__header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <h1>SongCard Example</h1>
        <p className="song-card-example__description">
          SongCard demonstrates how to compose the generic MediaCard component for
          domain-specific use cases. This music-focused component wraps MediaCard with
          music-specific props and actions.
        </p>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useNexaLiveTheme}
              onChange={(e) => setUseNexaLiveTheme(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>
              Use NexaLive Theme (example from <code>examples/themes/nexalive-theme.css</code>)
            </span>
          </label>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>
            This demonstrates how to create app-specific themes. Based on chriscase/nexalive project.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))}
        </div>
      )}

      {/* Currently Playing Indicator */}
      {playingId !== null && (
        <div className="playing-indicator">
          ♪ Now playing: {sampleSongs.find(s => s.id === playingId)?.title}
        </div>
      )}

      {/* Loading State Demo */}
      <section className="song-card-section">
        <h2>MediaListSkeleton - Loading State</h2>
        <p>
          Generic skeleton placeholder for loading states. Toggle loading to see the shimmer effect.
        </p>
        <button 
          className="back-button" 
          onClick={() => setIsLoading(!isLoading)}
          style={{ marginBottom: 'var(--uiforge-gap-lg)' }}
        >
          {isLoading ? 'Hide Loading State' : 'Show Loading State'}
        </button>
        {isLoading ? (
          <MediaListSkeleton count={3} theme={theme} ariaLabel="Loading songs" />
        ) : (
          <div className="song-card-grid">
            {sampleSongs.slice(0, 3).map((song) => (
              <SongCard
                key={song.id}
                {...song}
                theme={theme}
                variant="default"
                onPlay={() => handlePlay(song)}
                onAddToPlaylist={() => handleAddToPlaylist(song)}
                onShowInfo={() => handleShowInfo(song)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Variant Demonstrations */}
      <section className="song-card-section">
        <h2>Default Variant</h2>
        <p>Standard size with all features visible</p>
        <div className="song-card-grid">
          {sampleSongs.slice(0, 3).map((song) => (
            <SongCard
              key={song.id}
              {...song}
              theme={theme}
              variant="default"
              onPlay={() => handlePlay(song)}
              onAddToPlaylist={() => handleAddToPlaylist(song)}
              onShowInfo={() => handleShowInfo(song)}
            />
          ))}
        </div>
      </section>

      <section className="song-card-section">
        <h2>Compact Variant</h2>
        <p>Smaller cards for denser layouts</p>
        <div className="song-card-grid song-card-grid--compact">
          {sampleSongs.slice(0, 4).map((song) => (
            <SongCard
              key={song.id}
              {...song}
              theme={theme}
              variant="compact"
              onPlay={() => handlePlay(song)}
              onAddToPlaylist={() => handleAddToPlaylist(song)}
            />
          ))}
        </div>
      </section>

      <section className="song-card-section">
        <h2>Featured Variant</h2>
        <p>Larger cards for highlighting content</p>
        <div className="song-card-grid">
          {sampleSongs.slice(0, 2).map((song) => (
            <SongCard
              key={song.id}
              {...song}
              theme={theme}
              variant="featured"
              onPlay={() => handlePlay(song)}
              onAddToPlaylist={() => handleAddToPlaylist(song)}
              onShowInfo={() => handleShowInfo(song)}
            />
          ))}
        </div>
      </section>

      {/* Implementation Details */}
      <section className="song-card-section">
        <h2>Implementation Details</h2>
        <div className="implementation-card">
          <h3>How SongCard Uses MediaCard</h3>
          <p>
            SongCard is a wrapper around the generic MediaCard component that:
          </p>
          <ul>
            <li>Accepts music-specific props (artist, album, year, duration, genre, versionCount)</li>
            <li>Transforms them into MediaCard's generic props (title, subtitle, meta)</li>
            <li>Provides appropriate actions (Play, Add to Playlist, Info)</li>
            <li>Maintains proper accessibility with ARIA labels</li>
          </ul>
          <pre className="code-example">
{`<SongCard
  title="Bohemian Rhapsody"
  artist="Queen"
  album="A Night at the Opera"
  albumArtUrl="/album-art.jpg"
  year={1975}
  duration="5:55"
  genre="Rock"
  versionCount={3}
  onPlay={() => play()}
  onAddToPlaylist={() => addToPlaylist()}
/>`}
          </pre>
        </div>
      </section>

      {/* MediaCard Features */}
      <section className="song-card-section">
        <h2>MediaCard Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Adapts layout for mobile (stacked) and desktop (side-by-side)</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Themeable</h3>
            <p>Uses UIForge design tokens for consistent styling</p>
          </div>
          <div className="feature-card">
            <h3>♿ Accessible</h3>
            <p>Full keyboard support, ARIA labels, and focus states</p>
          </div>
          <div className="feature-card">
            <h3>🔧 Flexible</h3>
            <p>Supports render props and slots for custom content</p>
          </div>
        </div>
      </section>

      {/* MediaListSkeleton Features */}
      <section className="song-card-section">
        <h2>MediaListSkeleton Features</h2>
        <div className="implementation-card">
          <h3>Loading State Component</h3>
          <p>
            MediaListSkeleton provides a reusable loading placeholder for any list of MediaCard components:
          </p>
          <ul>
            <li>Configurable count for number of skeleton items</li>
            <li>CSS shimmer animation that respects `prefers-reduced-motion`</li>
            <li>Uses UIForge design tokens for consistent sizing and spacing</li>
            <li>SSR-friendly (no client-side JavaScript required)</li>
            <li>Theme support (light/dark mode)</li>
            <li>Full accessibility with ARIA labels and status role</li>
          </ul>
          <pre className="code-example">
{`// Basic usage
<MediaListSkeleton count={5} />

// With conditional rendering
{isLoading ? (
  <MediaListSkeleton count={3} theme="dark" />
) : (
  songs.map(song => <SongCard key={song.id} {...song} />)
)}`}
          </pre>
        </div>
      </section>
    </div>
  )
}

export default SongCardExample
