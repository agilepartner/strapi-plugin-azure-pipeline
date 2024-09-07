import buildPluginConfig from '../utils/buildPluginConfig'

export default (policyContext, config, { strapi }) => {
	const pluginConfig = buildPluginConfig(strapi)

	for (const key in pluginConfig) {
		let value = pluginConfig[key]
		if (!key || !value) {
			throw new PolicyError('MISSING_CONFIG', {
				type: `${key.toLowerCase()}`,
			})
		}
	}

	return true
}

class PolicyError extends Error {
	constructor(message: string, public details: { type: string }) {
		super(message)
		this.name = 'PolicyError'
	}
}
