import { ContentBlock } from './BlocksEditor'

/**
 * Escape HTML to prevent XSS vulnerabilities
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Validate and sanitize URL to prevent XSS
 */
function sanitizeUrl(url: string): string {
  // Remove any whitespace
  const trimmed = url.trim()

  // Block potentially dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
  const lower = trimmed.toLowerCase()

  for (const protocol of dangerousProtocols) {
    if (lower.startsWith(protocol)) {
      return '' // Return empty string for dangerous URLs
    }
  }

  return trimmed
}

/**
 * Convert blocks to HTML
 */
export function blocksToHTML(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      let content = escapeHtml(block.content)

      // Apply text formatting
      if (block.format?.bold) content = `<strong>${content}</strong>`
      if (block.format?.italic) content = `<em>${content}</em>`
      if (block.format?.underline) content = `<u>${content}</u>`
      if (block.format?.code) content = `<code>${content}</code>`

      switch (block.type) {
        case 'heading1':
          return `<h1>${content}</h1>`
        case 'heading2':
          return `<h2>${content}</h2>`
        case 'heading3':
          return `<h3>${content}</h3>`
        case 'quote':
          return `<blockquote>${content}</blockquote>`
        case 'code':
          return `<pre><code>${escapeHtml(block.content)}</code></pre>`
        case 'image': {
          const safeUrl = sanitizeUrl(block.imageUrl || '')
          const safeAlt = escapeHtml(block.imageAlt || '')
          return safeUrl ? `<img src="${safeUrl}" alt="${safeAlt}" />` : ''
        }
        case 'list':
          return `<ul><li>${content}</li></ul>`
        default:
          return `<p>${content}</p>`
      }
    })
    .join('\n')
}

/**
 * Convert blocks to Markdown
 */
export function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      let content = block.content

      // Apply text formatting
      if (block.format?.bold) content = `**${content}**`
      if (block.format?.italic) content = `*${content}*`
      if (block.format?.code) content = `\`${content}\``

      switch (block.type) {
        case 'heading1':
          return `# ${content}`
        case 'heading2':
          return `## ${content}`
        case 'heading3':
          return `### ${content}`
        case 'quote':
          return `> ${content}`
        case 'code':
          return `\`\`\`\n${block.content}\n\`\`\``
        case 'image':
          return `![${block.imageAlt || ''}](${block.imageUrl || ''})`
        case 'list':
          return `- ${content}`
        default:
          return content
      }
    })
    .join('\n\n')
}

/**
 * Convert blocks to JSON string
 */
export function blocksToJSON(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks, null, 2)
}
