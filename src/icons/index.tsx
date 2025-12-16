import React from 'react'

/**
 * UIForge Icon Library
 * A collection of monochrome SVG icons for use across UIForge components
 */

export interface IconProps {
  size?: number
  className?: string
  color?: string
}

// Activity/Event Icons
export const CommitIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 5a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
)

export const PullRequestIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
  </svg>
)

export const IssueIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
  </svg>
)

export const CommentIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5zM1.75 2.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75z" />
  </svg>
)

export const StarIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
)

export const ForkIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
)

export const MergeIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
)

export const ReleaseIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
  </svg>
)

export const DeployIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M4.53 4.75A.75.75 0 015 6.25h6a.75.75 0 00.53-1.28l-3-3a.75.75 0 00-1.06 0l-3 3zm.47 6.47a.75.75 0 01.53-.22h6a.75.75 0 01.53 1.28l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 01-.01-1.06h.01z" />
  </svg>
)

// UI Control Icons
export const UnfoldIcon: React.FC<IconProps> = ({
  size = 20,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    {/* Top arrow pointing up with longer tail */}
    <path
      d="M10 2L6 6M10 2L14 6M10 2V7.5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Horizontal dotted line in middle */}
    <path
      d="M3 10H17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 2"
    />
    {/* Bottom arrow pointing down with longer tail */}
    <path
      d="M10 18L6 14M10 18L14 14M10 18V12.5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const FoldIcon: React.FC<IconProps> = ({
  size = 20,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    {/* Top arrows pointing inward (toward center) with longer tail */}
    <path
      d="M10 7.5L6 4M10 7.5L14 4M10 7.5V2"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Horizontal dotted line in middle */}
    <path
      d="M3 10H17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 2"
    />
    {/* Bottom arrows pointing inward (toward center) with longer tail */}
    <path
      d="M10 12.5L6 16M10 12.5L14 16M10 12.5V18"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Additional utility icons
export const CloseIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
  </svg>
)

// Tai Chi / Wellness Icons
export const TaiChiIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    {/* Yin-Yang symbol for tai chi */}
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15" fill={color} />
    <circle cx="8" cy="5" r="2" fill={color === 'currentColor' ? 'white' : '#fff'} />
    <circle cx="8" cy="11" r="2" fill={color} />
    <circle cx="8" cy="5" r="0.5" fill={color} />
    <circle cx="8" cy="11" r="0.5" fill={color === 'currentColor' ? 'white' : '#fff'} />
  </svg>
)

export const MeditationIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Person meditating */}
    <circle cx="8" cy="3" r="1.5" />
    <path d="M8 5C6.5 5 5 6 5 7.5V9C5 9 5.5 10 6 10.5L5 14H7L8 11L9 14H11L10 10.5C10.5 10 11 9 11 9V7.5C11 6 9.5 5 8 5Z" />
    <path d="M4 9L2 10M12 9L14 10" strokeWidth="1" stroke={color} fill="none" />
  </svg>
)

export const YogaIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Yoga pose silhouette */}
    <circle cx="8" cy="2.5" r="1.5" />
    <path d="M8 4.5L6 8L4 14H6L7 10H9L10 14H12L10 8L8 4.5Z" />
    <path d="M6 8L3 6M10 8L13 6" strokeWidth="1.5" stroke={color} fill="none" />
  </svg>
)

// Workout / Fitness Icons
export const DumbbellIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <rect x="1" y="6" width="2" height="4" rx="0.5" />
    <rect x="13" y="6" width="2" height="4" rx="0.5" />
    <rect x="3" y="5.5" width="1" height="5" />
    <rect x="12" y="5.5" width="1" height="5" />
    <rect x="4" y="7" width="8" height="2" rx="0.5" />
  </svg>
)

export const RunningIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <circle cx="10" cy="2.5" r="1.5" />
    <path d="M9 4.5L8 6L6 7L4 8L6 9L8 8L10 7L11 9L10 12L9 14H11L12 11L13 9L12 6L10 4.5H9Z" />
    <path d="M6 14H4L5 11" />
  </svg>
)

export const HeartRateIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path
      d="M2 8H5L6.5 5L8 11L9.5 8H14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const StrengthIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Flexed bicep */}
    <path d="M4 8C4 6 5 4 7 4C8 4 8.5 4.5 8.5 5.5C8.5 6 8.8 6.5 9.5 6.5C10.5 6.5 11 7 11 8C11 9.5 10 11 8 12C6 13 4 12 4 10V8Z" />
    <circle cx="7" cy="3" r="1.5" />
  </svg>
)

// IT / Technology Icons
export const ServerIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <rect x="2" y="2" width="12" height="3" rx="0.5" />
    <rect x="2" y="6.5" width="12" height="3" rx="0.5" />
    <rect x="2" y="11" width="12" height="3" rx="0.5" />
    <circle cx="4" cy="3.5" r="0.5" />
    <circle cx="4" cy="8" r="0.5" />
    <circle cx="4" cy="12.5" r="0.5" />
  </svg>
)

export const DatabaseIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <ellipse cx="8" cy="3" rx="5" ry="2" />
    <path d="M3 3V13C3 14.1 5.2 15 8 15C10.8 15 13 14.1 13 13V3" />
    <path d="M3 8C3 9.1 5.2 10 8 10C10.8 10 13 9.1 13 8" />
  </svg>
)

export const CloudIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M4.5 10C2.5 10 1 8.5 1 6.5C1 4.5 2.5 3 4.5 3C4.6 3 4.7 3 4.8 3.05C5.3 1.8 6.5 1 8 1C10 1 11.5 2.5 11.5 4.5C11.5 4.6 11.5 4.7 11.5 4.8C12.9 5.1 14 6.3 14 7.75C14 9.5 12.5 11 10.75 11H4.5Z" />
  </svg>
)

export const TerminalIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75z" />
    <path
      d="M3 5.5L6 8L3 10.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <line
      x1="8"
      y1="10.5"
      x2="12"
      y2="10.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const BugIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M4.75 7.5a3.25 3.25 0 116.5 0v3.75a3.25 3.25 0 01-6.5 0V7.5z" />
    <path
      d="M5.75 7.5c0-.69.56-1.25 1.25-1.25h2c.69 0 1.25.56 1.25 1.25M4 5.5L2 4M12 5.5L14 4M4 9H1M15 9H12M4 12L2 13.5M12 12L14 13.5"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <ellipse cx="8" cy="4" rx="2.5" ry="1.5" />
  </svg>
)

export const CodeIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M5.28 3.72a.75.75 0 00-1.06 1.06L7.44 8l-3.22 3.22a.75.75 0 101.06 1.06l3.75-3.75a.75.75 0 000-1.06L5.28 3.72zM8.5 11.5a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z" />
  </svg>
)

// Space / Alien Icons
export const RocketIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M8 0C6 0 4.5 2 3.5 5L1 7L4 8L5 11L7 8.5C9 7.5 11 6 13 3C14 2 15 0 16 0C16 0 14 2 13 3C11 5 9.5 6.5 8 7.5M10 4C10.552 4 11 3.552 11 3C11 2.448 10.552 2 10 2C9.448 2 9 2.448 9 3C9 3.552 9.448 4 10 4Z" />
    <path d="M2 12C2 12 0 14 0 16C2 16 4 14 4 14" />
  </svg>
)

export const SatelliteIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <rect x="6" y="6" width="4" height="4" rx="0.5" />
    <path
      d="M4 4L2 2M4 12L2 14M12 4L14 2M12 12L14 14"
      strokeWidth="1.5"
      stroke={color}
      strokeLinecap="round"
    />
    <rect x="1" y="1" width="1.5" height="1.5" />
    <rect x="13.5" y="1" width="1.5" height="1.5" />
    <rect x="1" y="13.5" width="1.5" height="1.5" />
    <rect x="13.5" y="13.5" width="1.5" height="1.5" />
    <circle cx="8" cy="8" r="1" />
  </svg>
)

export const AlienIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Alien head shape */}
    <path d="M8 1C4 1 2 3 2 6C2 8 2 10 3 11C3.5 11.5 4 12 5 12C5.5 12 6 11.5 6.5 10.5C7 9.5 7.5 9 8 9C8.5 9 9 9.5 9.5 10.5C10 11.5 10.5 12 11 12C12 12 12.5 11.5 13 11C14 10 14 8 14 6C14 3 12 1 8 1Z" />
    {/* Eyes */}
    <ellipse cx="6" cy="5.5" rx="1.5" ry="2" fill="white" />
    <ellipse cx="10" cy="5.5" rx="1.5" ry="2" fill="white" />
    <circle cx="6" cy="5.5" r="0.75" fill={color} />
    <circle cx="10" cy="5.5" r="0.75" fill={color} />
  </svg>
)

export const PlanetIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <circle cx="8" cy="8" r="5" />
    <ellipse
      cx="8"
      cy="8"
      rx="8"
      ry="2.5"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.6"
    />
    <circle cx="6" cy="6" r="1" opacity="0.4" fill={color === 'currentColor' ? 'white' : '#fff'} />
  </svg>
)

export const TelescopeIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M1 8L6 6L14 2L12 10L10 8L8 14H6L8 8L1 8Z" />
    <path d="M10 8L12 10" strokeWidth="1.5" stroke={color} />
  </svg>
)

// Business / Process Icons
export const ChartIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M1.5 13.5V2.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v11a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5zM5 13.5V5.5a.5.5 0 01.5-.5H6a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5zM8.5 13.5V7.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v6a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5zM12 13.5V3.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5z" />
  </svg>
)

export const MeetingIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Group of people */}
    <circle cx="5" cy="4" r="2" />
    <circle cx="11" cy="4" r="2" />
    <path d="M1 14V12C1 10.5 2.5 9 5 9C7.5 9 9 10.5 9 12V14H1Z" />
    <path d="M7 14V12C7 10.5 8.5 9 11 9C13.5 9 15 10.5 15 12V14H7Z" />
  </svg>
)

export const DocumentIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M3 1.75C3 .784 3.784 0 4.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-8.5A1.75 1.75 0 013 14.25V1.75z" />
    <path d="M10 0v3.5c0 .275.225.5.5.5H14" fill={color === 'currentColor' ? 'white' : '#fff'} />
  </svg>
)

export const CalendarIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zM2.5 7.5v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z" />
  </svg>
)

export const BriefcaseIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M6.75 0A1.75 1.75 0 005 1.75V3H1.75C.784 3 0 3.784 0 4.75v8.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H11V1.75A1.75 1.75 0 009.25 0h-2.5zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3h3z" />
  </svg>
)

// Software Development Process Icons
export const GitBranchIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
  </svg>
)

export const PullRequestDraftIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M3.25 1A2.25 2.25 0 011 3.25v9.5A2.25 2.25 0 013.25 15h9.5A2.25 2.25 0 0115 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5zM2.5 3.25a.75.75 0 01.75-.75h9.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75v-9.5z" />
    <path d="M8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z" />
  </svg>
)

export const TestingIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Beaker/flask for testing */}
    <path d="M6 1h4v1H6V1zM5.5 3h5L13 13c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2L5.5 3z" />
    <circle cx="7" cy="8" r="1" fill={color === 'currentColor' ? 'white' : '#fff'} opacity="0.5" />
    <circle
      cx="9"
      cy="10"
      r="0.75"
      fill={color === 'currentColor' ? 'white' : '#fff'}
      opacity="0.5"
    />
  </svg>
)

export const DeploymentIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    <path d="M8 0L0 3v5c0 5 3 7.5 8 8 5-.5 8-3 8-8V3L8 0z" />
    <path
      d="M7 10L4.5 7.5l1-1L7 8l3.5-3.5 1 1L7 10z"
      fill={color === 'currentColor' ? 'white' : '#fff'}
    />
  </svg>
)

export const ReviewIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Magnifying glass over document */}
    <rect x="1" y="1" width="9" height="11" rx="1" />
    <line
      x1="3"
      y1="4"
      x2="7"
      y2="4"
      stroke={color === 'currentColor' ? 'white' : '#fff'}
      strokeWidth="1"
    />
    <line
      x1="3"
      y1="6.5"
      x2="7"
      y2="6.5"
      stroke={color === 'currentColor' ? 'white' : '#fff'}
      strokeWidth="1"
    />
    <circle cx="11" cy="11" r="3" fill="none" stroke={color} strokeWidth="1.5" />
    <line
      x1="13"
      y1="13"
      x2="15.5"
      y2="15.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const BuildIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} className={className}>
    {/* Hammer/tools */}
    <path d="M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z" />
  </svg>
)

// Re-export icon maps from separate file to avoid React Fast Refresh issues
export {
  ActivityIcons,
  UIIcons,
  WellnessIcons,
  FitnessIcons,
  TechIcons,
  SpaceIcons,
  BusinessIcons,
  DevProcessIcons,
} from './iconMaps'
