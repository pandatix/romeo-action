import * as core from '@actions/core'

/**
 * Indicates whether the POST action is running
 */
export const IsPost = !!core.getState('isPost')
