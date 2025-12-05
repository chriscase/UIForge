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
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
    {/* Top arrow pointing up with tail */}
    <path
      d="M9 3L6.5 5.5M9 3L11.5 5.5M9 3V6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Horizontal dotted line in middle */}
    <path
      d="M4 9H14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 2"
    />
    {/* Bottom arrow pointing down with tail */}
    <path
      d="M9 15L6.5 12.5M9 15L11.5 12.5M9 15V12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const FoldIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
    {/* Top arrows pointing inward (toward center) with tail */}
    <path
      d="M9 6L6.5 3.5M9 6L11.5 3.5M9 6V3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Horizontal dotted line in middle */}
    <path
      d="M4 9H14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 2"
    />
    {/* Bottom arrows pointing inward (toward center) with tail */}
    <path
      d="M9 12L6.5 14.5M9 12L11.5 14.5M9 12V15"
      stroke={color}
      strokeWidth="2"
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

// Export a map for easy lookup
export const ActivityIcons = {
  commit: CommitIcon,
  pr: PullRequestIcon,
  issue: IssueIcon,
  comment: CommentIcon,
  star: StarIcon,
  fork: ForkIcon,
  merge: MergeIcon,
  release: ReleaseIcon,
  deploy: DeployIcon,
}

export const UIIcons = {
  unfold: UnfoldIcon,
  fold: FoldIcon,
  close: CloseIcon,
  check: CheckIcon,
}
