import type {
  Reporter,
  FullConfig,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Custom Playwright reporter that generates a Markdown report file
 * for UIForge e2e test results.
 *
 * The report is appended to e2e/E2E_TEST_REPORT.md with the latest run results.
 */
class MarkdownReporter implements Reporter {
  private testResults: Map<
    string,
    {
      passed: number
      failed: number
      skipped: number
      tests: Array<{ name: string; status: string; duration: number }>
    }
  > = new Map()
  private startTime: Date = new Date()
  private config!: FullConfig

  onBegin(config: FullConfig) {
    this.config = config
    this.startTime = new Date()
    this.testResults.clear()
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const fileName = path.basename(test.location.file, '.spec.ts')

    if (!this.testResults.has(fileName)) {
      this.testResults.set(fileName, { passed: 0, failed: 0, skipped: 0, tests: [] })
    }

    const fileResults = this.testResults.get(fileName)!

    const status = result.status
    if (status === 'passed') {
      fileResults.passed++
    } else if (status === 'failed' || status === 'timedOut') {
      fileResults.failed++
    } else if (status === 'skipped') {
      fileResults.skipped++
    }

    fileResults.tests.push({
      name: test.title,
      status: status,
      duration: result.duration,
    })
  }

  onEnd(result: FullResult) {
    const reportPath = path.join(process.cwd(), 'e2e', 'E2E_TEST_REPORT.md')

    // Calculate totals
    let totalPassed = 0
    let totalFailed = 0
    let totalSkipped = 0

    this.testResults.forEach((fileResult) => {
      totalPassed += fileResult.passed
      totalFailed += fileResult.failed
      totalSkipped += fileResult.skipped
    })

    const totalTests = totalPassed + totalFailed + totalSkipped
    const duration = result.duration / 1000

    // Format date
    const dateStr = this.startTime.toISOString().split('T')[0]
    const timeStr = this.startTime.toTimeString().split(' ')[0]

    // Build report content
    let reportContent = ''

    // Check if file exists to determine if we should add header
    const fileExists = fs.existsSync(reportPath)

    if (!fileExists) {
      reportContent += `# UIForge e2e Tests\n\n`
      reportContent += `This file contains the results of automated end-to-end tests for all UIForge components.\n\n`
      reportContent += `---\n\n`
    }

    // Add latest run header
    reportContent += `## Test Run: ${dateStr} ${timeStr}\n\n`

    // Summary
    const statusEmoji = totalFailed === 0 ? '✅' : '❌'
    reportContent += `### Summary ${statusEmoji}\n\n`
    reportContent += `| Metric | Value |\n`
    reportContent += `|--------|-------|\n`
    reportContent += `| **Total Tests** | ${totalTests} |\n`
    reportContent += `| **Passed** | ${totalPassed} |\n`
    reportContent += `| **Failed** | ${totalFailed} |\n`
    reportContent += `| **Skipped** | ${totalSkipped} |\n`
    reportContent += `| **Duration** | ${duration.toFixed(2)}s |\n`
    reportContent += `| **Status** | ${result.status === 'passed' ? '✅ Passed' : '❌ Failed'} |\n\n`

    // Component results
    reportContent += `### Results by Component\n\n`
    reportContent += `| Component | Passed | Failed | Skipped | Status |\n`
    reportContent += `|-----------|--------|--------|---------|--------|\n`

    // Sort by component name
    const sortedResults = Array.from(this.testResults.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    )

    for (const [fileName, fileResult] of sortedResults) {
      const componentName = this.formatComponentName(fileName)
      const status = fileResult.failed === 0 ? '✅' : '❌'
      reportContent += `| ${componentName} | ${fileResult.passed} | ${fileResult.failed} | ${fileResult.skipped} | ${status} |\n`
    }

    reportContent += `\n`

    // Failed tests details (if any)
    if (totalFailed > 0) {
      reportContent += `### Failed Tests ❌\n\n`

      for (const [fileName, fileResult] of sortedResults) {
        const failedTests = fileResult.tests.filter(
          (t) => t.status === 'failed' || t.status === 'timedOut'
        )
        if (failedTests.length > 0) {
          const componentName = this.formatComponentName(fileName)
          reportContent += `#### ${componentName}\n\n`
          for (const test of failedTests) {
            reportContent += `- ❌ ${test.name}\n`
          }
          reportContent += `\n`
        }
      }
    }

    reportContent += `---\n\n`

    // Append or create the report
    if (fileExists) {
      // Read existing content and prepend new results after the header
      const existingContent = fs.readFileSync(reportPath, 'utf-8')
      const headerEndIndex = existingContent.indexOf('---\n\n')

      if (headerEndIndex !== -1) {
        const header = existingContent.substring(0, headerEndIndex + 5)
        const previousRuns = existingContent.substring(headerEndIndex + 5)

        // Extract the new run content (everything after the header in reportContent)
        const newRunContent = reportContent.substring(reportContent.indexOf('## Test Run:'))

        // Parse previous runs and keep last 4
        const runDelimiter = '## Test Run:'
        const runs = previousRuns.split(runDelimiter).filter((r) => r.trim())
        const runsToKeep = runs.slice(0, 4).map((r) => runDelimiter + r)

        // Write header + new run + previous runs
        fs.writeFileSync(reportPath, header + newRunContent + runsToKeep.join(''))
      } else {
        fs.writeFileSync(reportPath, reportContent)
      }
    } else {
      fs.writeFileSync(reportPath, reportContent)
    }

    console.log(`\n📄 Markdown report generated: ${reportPath}`)
  }

  private formatComponentName(fileName: string): string {
    // Convert file names like 'activity-stream' to 'Activity Stream'
    return fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
}

export default MarkdownReporter
