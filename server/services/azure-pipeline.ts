import { Strapi } from '@strapi/strapi'
import axios from 'axios'
import buildPluginConfig from '../utils/buildPluginConfig'

export default ({ strapi }: { strapi: Strapi }) => ({
	getWelcomeMessage() {
		return 'Welcome to Strapi 🚀'
	},
	async history() {
		const config = buildPluginConfig(strapi)
		try {
			const res = await axios.get(
				`https://dev.azure.com/${config.organization}/${config.project}/_apis/pipelines/${config.pipelineId}/runs?api-version=7.2-preview.1&$top=20&branch=${config.branch}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Basic ${config.base64Token}`,
					},
				}
			)
			return res
		} catch (err) {
			console.log(err)
		}
	},
	async trigger() {
		const config = buildPluginConfig(strapi)
		try {
			const res = await axios.post(
				`https://dev.azure.com/${config.organization}/${config.project}/_apis/pipelines/${config.pipelineId}/runs?api-version=7.2-preview.1`,
				{
					resources: {
						repositories: {
							self: {
								refName: `refs/heads/${config.branch}`,
							},
						},
					},
				},
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Basic ${config.base64Token}`,
					},
				}
			)
			return res
		} catch (err) {
			return {
				status: err.response.status,
				statusText: err.response.statusText,
			}
		}
	},
	async getLogs(runId) {
		const config = buildPluginConfig(strapi)
		try {
			const res = await axios.get(
				`https://dev.azure.com/${config.organization}/${config.project}/_apis/pipelines/${config.pipelineId}/runs/${runId}/logs?api-version=7.2-preview.1`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Basic ${config.base64Token}`,
					},
				}
			)
			return res.request.res.responseUrl
		} catch (err) {
			console.log(err)
			return {
				status: err.response.status,
				statusText: err.response.statusText,
			}
		}
	},
})
