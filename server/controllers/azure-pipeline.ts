import { Strapi } from '@strapi/strapi'
import pluginId from '../../utils/pluginId'

export default ({ strapi }: { strapi: Strapi }) => ({
	index(ctx) {
		ctx.body = strapi.plugin(pluginId).service('azurePipeline').getWelcomeMessage()
	},
})
