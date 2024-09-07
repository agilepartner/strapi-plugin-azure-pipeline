export default {
	default: {},
	validator({ organization, project, pipelineId, branch, personalAccessToken }) {
		if (organization && typeof organization !== 'string') {
			throw new Error('`organization` key in yout plugin config has to be a string')
		}
		if (project && typeof project !== 'string') {
			throw new Error('`project` key in yout plugin config has to be a string')
		}
		if (pipelineId && typeof pipelineId !== 'string') {
			throw new Error('`pipelineId` key in yout plugin config has to be a string')
		}
		if (branch && typeof branch !== 'string') {
			throw new Error('`branch` key in yout plugin config has to be a string')
		}
		if (personalAccessToken && typeof personalAccessToken !== 'string') {
			throw new Error('`personalAccessToken` key in your plugin config has to be a string')
		}
	},
}
