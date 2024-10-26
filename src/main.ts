import * as core from '@actions/core'
import * as stateHelper from './state-helper'

async function run(): Promise<void> {
  try {
    core.info('Running the main action...')

    // Your main action code goes here
    const input = core.getInput('example_input')
    core.info(`Example input: ${input}`)

    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 1000))

    core.info('Main action completed successfully.')
  } catch (error) {
    core.setFailed(`Action failed: ${(error as Error)?.message ?? error}`)
  }
}

async function cleanup(): Promise<void> {
  try {
    core.info('Running cleanup...')

    // Your cleanup code goes here
    // e.g., deleting temporary files, closing open connections, etc.
    await new Promise(resolve => setTimeout(resolve, 500))

    core.info('Cleanup completed successfully.')
  } catch (error) {
    core.warning(`Cleanup failed: ${(error as Error)?.message ?? error}`)
  }
}

// Main
if (!stateHelper.IsPost) {
  run()
}
// Post
else {
  cleanup()
}
