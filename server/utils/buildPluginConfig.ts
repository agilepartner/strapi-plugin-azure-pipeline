import { Buffer } from 'buffer'
import getPluginConfig from './getPluginConfig'
import protectedValue from './protectedValue'

interface AzureDevOpsConfig {
	organization: string
	project: string
	pipelineId: string
	branch: string
	personalAccessToken: string
	base64Token: string
}

export default function buildPluginConfig(strapi, isValueProtected = false): AzureDevOpsConfig {
	const getPluginConfigByKey = getPluginConfig(strapi)
	const pat = getPluginConfigByKey('personalAccessToken')?.trim()
	const base64 = encode(`:${pat}`)

	return {
		organization: getPluginConfigByKey('organization')?.trim(),
		project: getPluginConfigByKey('project')?.trim(),
		pipelineId: getPluginConfigByKey('pipelineId')?.trim(),
		branch: getPluginConfigByKey('branch')?.trim(),
		personalAccessToken: isValueProtected ? protectedValue(pat) : pat,
		base64Token: isValueProtected ? protectedValue(base64) : base64,
	}
}

const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64')
