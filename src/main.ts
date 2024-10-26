import * as core from '@actions/core'
import * as stateHelper from './state-helper'
import * as iac from './iac'

async function run(): Promise<void> {
  try {
    const stack = await iac.getStack()

    await stack.setConfig('romeo:kubeconfig', {
      value: core.getInput('kubeconfig')
    })

    console.info('Deploying Romeo...')
    const upRes = await stack.up({ onOutput: console.info })

    core.setOutput('port', upRes.outputs.port.value)
    core.setOutput('claim-name', upRes.outputs.claimName.value)
  } catch (error) {
    core.setFailed(`Action failed: ${(error as Error)?.message ?? error}`)
  }
}

async function cleanup(): Promise<void> {
  try {
    const stack = await iac.getStack()

    const upRes = await stack.destroy({ onOutput: console.info, remove: true })
    console.log(
      `update summary: \n${JSON.stringify(upRes.summary.resourceChanges, null, 4)}`
    )

    core.info('Romeo environment destroyed.')
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
