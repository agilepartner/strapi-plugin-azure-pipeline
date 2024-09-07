import { Strapi } from '@strapi/strapi'
import pluginId from '../../utils/pluginId'

export default ({ strapi }: { strapi: Strapi }) => ({
	index(ctx) {
		ctx.body = strapi.plugin(pluginId).service('azurePipeline').getWelcomeMessage()
	},
	history: async (ctx) => {
		const response = await strapi.plugin(pluginId).service('azurePipeline').history()
		ctx.body = response.data
	},
	trigger: async (ctx) => {
		const response = await strapi.plugin(pluginId).service('azurePipeline').trigger()
		if (response.status === 422 && response.statusText == 'Unprocessable Entity') {
			return ctx.unprocessableEntity('Unprocessable Entity')
		}
		ctx.body = response.data
	},
	logs: async (ctx) => {
		const { jobId } = ctx.request.query
		const logURL = await strapi.plugin(pluginId).service('azurePipeline').getLogs(jobId)
		ctx.body = logURL
	},
})
