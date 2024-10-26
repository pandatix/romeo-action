import * as core from '@actions/core'
import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation'
import * as upath from 'upath'
import * as stateHelper from './state-helper'

async function run(): Promise<void> {
  try {
    // Create our stack using a local program
    // in the ../deploy directory
    const args: LocalProgramArgs = {
      stackName: 'romeo',
      workDir: upath.joinSafe(__dirname, '..', 'deploy')
    }

    // create (or select if one already exists) a stack that uses our local program
    const stack = await LocalWorkspace.createOrSelectStack(args)

    console.info('successfully initialized stack')
    console.info('setting up config')
    await stack.setConfig('romeo:kubeconfig', {
      value: core.getInput('kubeconfig')
    })
    console.info('config set')

    console.info('deploying stack...')
    const upRes = await stack.up({ onOutput: console.info })
    console.log(
      `update summary: \n${JSON.stringify(upRes.summary.resourceChanges, null, 4)}`
    )

    const dep = await stack.exportStack()
    console.log(`stack: \n${JSON.stringify(dep.deployment)}`)

    core.setOutput('port', upRes.outputs.port)
    core.setOutput('claim-name', upRes.outputs.claimName)

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
  void run()
}
// Post
else {
  void cleanup()
}
