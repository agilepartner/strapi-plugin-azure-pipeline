export default [
	{
		method: 'GET',
		path: '/',
		handler: 'azurePipeline.index',
		config: {
			policies: [],
			auth: false,
		},
	},
	{
		method: 'GET',
		path: '/config',
		handler: 'config.getPluginConfig',
		config: {
			policies: [
				// 'admin::isAuthenticatedAdmin',
				// {
				//   name: 'admin::hasPermissions',
				//   config: {
				//     actions: [`plugin::${pluginId}.settings`],
				//   },
				// },
			],
			auth: false,
		},
	},
]
