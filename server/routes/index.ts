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
]
