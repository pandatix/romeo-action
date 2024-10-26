import * as core from '@actions/core'
import * as stateHelper from './state-helper'

export function run(): void {
  try {
    console.log('SHANFLAG run SHANFLAG')
  } catch {
    core.setFailed('failed')
  }
}

export function cleanup(): void {
  try {
    console.log('SHANFLAG cleanup SHANFLAG')
  } catch {
    core.setFailed('failed')
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
