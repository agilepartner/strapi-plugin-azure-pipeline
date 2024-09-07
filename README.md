# Strapi plugin strapi-plugin-azure-pipeline

A strapi plugin to rebuild and deploy your SSG website via Azure Pipeline.

This plugin is inspired by [strapi-plugin-update-static-content](https://github.com/everythinginjs/strapi-plugin-update-static-content)

## Setup

```sh
npm install strapi-plugin-azure-pipeline
```

## Configure

```typescript
// config/plugins.ts

export default () => ({
  ...

  "azure-pipeline": {
    enabled: true,
    config: {
      organization: env("AZURE_DEVOPS_ORGANIZATION"),
      project: env("AZURE_DEVOPS_PROJECT"),
      pipelineId: env("AZURE_DEVOPS_PIPELINE_ID"),
      branch: env("AZURE_DEVOPS_BRANCH"),
      personalAccessToken: env("AZURE_DEVOPS_PERSONAL_ACCESS_TOKEN"),
    },
  },

  ...
});
```
