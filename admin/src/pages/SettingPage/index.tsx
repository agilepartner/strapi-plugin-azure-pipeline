import { BaseHeaderLayout, Link, Stack, Typography } from '@strapi/design-system';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import pluginId from '../../../../utils/pluginId';
import Guard from '../../components/Guard';
import PageWrapper from '../../components/PageWrapper';
import TextField from '../../components/TextField';
import useFetchData from '../../hooks/useFetchData';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingPage />
  </CheckPagePermissions>
);

const SettingPage = () => {
  // Hooks
  const { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: 'GET',
  });

  const { organization, project, pipelineId, branch, personalAccessToken } = fetchedData;

  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  const ORGANIZATION = useFormattedLabel('settings.fields.organization');
  const PROJECT = useFormattedLabel('settings.fields.project');
  const PIPELINEID = useFormattedLabel('settings.fields.pipelineid');
  const BRANCH = useFormattedLabel('settings.fields.branch');
  const TOKEN = useFormattedLabel('settings.fields.token');

  const BUTTON_DETAILS = useFormattedLabel('button.details');

  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={<BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />}
      pageTitle={PAGE_TITLE}
    >
      <Guard errors={errors}>
        <Stack spacing={6}>
          <TextField
            label={ORGANIZATION}
            aria-label={ORGANIZATION}
            name="organization"
            value={organization}
            disabled
            required
          />
          <TextField
            label={PROJECT}
            aria-label={PROJECT}
            name="project"
            value={project}
            disabled
            required
          />
          <TextField
            label={PIPELINEID}
            aria-label={PIPELINEID}
            name="pipeline_id"
            value={pipelineId}
            disabled
            required
          />
          <TextField
            label={BRANCH}
            aria-label={BRANCH}
            name="branch"
            value={branch}
            disabled
            required
          />
          <TextField
            label={TOKEN}
            aria-label={TOKEN}
            name="personalAccessToken"
            value={personalAccessToken}
            disabled
            required
            HintMessage={
              <Typography variant="omega">
                <Link
                  href="https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows"
                  isExternal
                >
                  {BUTTON_DETAILS}
                </Link>
              </Typography>
            }
          />
        </Stack>
      </Guard>
    </PageWrapper>
  )
}

export default ProtectedPage
