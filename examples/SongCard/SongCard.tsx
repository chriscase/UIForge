import React from 'react'
import { MediaCard } from '../../src/components/MediaCard'
import { Button } from '../../src/components/Button'
import './SongCard.css'

/**
 * Props for the SongCard component
 */
export interface SongCardProps {
  /**
   * Song title
   */
  title: string
  /**
   * Artist name
   */
  artist: string
  /**
   * Album name
   */
  album?: string
  /**
   * Album artwork URL
   */
  albumArtUrl: string
  /**
   * Year of release
   */
  year?: string | number
  /**
   * Duration of the song (e.g., "3:45")
   */
  duration?: string
  /**
   * Music genre
   */
  genre?: string
  /**
   * Number of versions available
   */
  versionCount?: number
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Visual variant of the card
   */
  variant?: 'default' | 'compact' | 'featured'
  /**
   * Click handler for playing the song
   */
  onPlay?: () => void
  /**
   * Click handler for adding to playlist
   */
  onAddToPlaylist?: () => void
  /**
   * Click handler for showing more info
   */
  onShowInfo?: () => void
  /**
   * Custom className for additional styling
   */
  className?: string
}

/**
 * SongCard - A music-specific wrapper around MediaCard
 * 
 * This component demonstrates how to compose MediaCard for domain-specific use cases.
 * It handles music-specific props and provides appropriate actions.
 * 
 * @example
 * ```tsx
 * <SongCard
 *   title="Bohemian Rhapsody"
 *   artist="Queen"
 *   album="A Night at the Opera"
 *   albumArtUrl="/album-art.jpg"
 *   year={1975}
 *   duration="5:55"
 *   genre="Rock"
 *   versionCount={3}
 *   onPlay={() => console.log('Playing...')}
 * />
 * ```
 */
export const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  album,
  albumArtUrl,
  year,
  duration,
  genre,
  versionCount,
  theme = 'light',
  variant = 'default',
  onPlay,
  onAddToPlaylist,
  onShowInfo,
  className = '',
}) => {
  // Build metadata object from available props
  const meta: Record<string, string> = {}
  
  if (album) meta.album = album
  if (year) meta.year = String(year)
  if (duration) meta.duration = duration
  if (genre) meta.genre = genre
  if (versionCount && versionCount > 1) {
    meta.versions = `${versionCount} versions`
  }

  // Build actions
  const actions = (
    <div className="song-card-actions">
      {onPlay && (
        <Button
          variant="primary"
          size="small"
          theme={theme}
          onClick={(e) => {
            e.stopPropagation()
            onPlay()
          }}
          aria-label={`Play ${title}`}
        >
          ▶ Play
        </Button>
      )}
      {onAddToPlaylist && (
        <Button
          variant="outline"
          size="small"
          theme={theme}
          onClick={(e) => {
            e.stopPropagation()
            onAddToPlaylist()
          }}
          aria-label={`Add ${title} to playlist`}
        >
          + Playlist
        </Button>
      )}
      {onShowInfo && (
        <Button
          variant="secondary"
          size="small"
          theme={theme}
          onClick={(e) => {
            e.stopPropagation()
            onShowInfo()
          }}
          aria-label={`Show info for ${title}`}
        >
          ℹ Info
        </Button>
      )}
    </div>
  )

  return (
    <MediaCard
      title={title}
      subtitle={artist}
      mediaUrl={albumArtUrl}
      mediaAlt={`Album artwork for ${album || title}`}
      meta={meta}
      actions={actions}
      theme={theme}
      variant={variant}
      className={`song-card ${className}`}
      ariaLabel={`${title} by ${artist}`}
    />
  )
}
