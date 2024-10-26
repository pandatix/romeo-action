import {
  LocalProgramArgs,
  LocalWorkspace,
  LocalWorkspaceOptions,
  Stack
} from '@pulumi/pulumi/automation'
import * as upath from 'upath'

export async function getStack(): Promise<Stack> {
  // Create our stack using a local program
  // in the ../deploy directory
  const args: LocalProgramArgs = {
    stackName: 'romeo',
    workDir: upath.joinSafe(__dirname, '..', 'deploy')
  }
  const opts: LocalWorkspaceOptions = {
    envVars: {
      PULUMI_CONFIG_PASSPHRASE: ''
    }
  }

  // create (or select if one already exists) a stack that uses our local program
  return LocalWorkspace.createOrSelectStack(args, opts)
}
