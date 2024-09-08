import {
  BaseHeaderLayout,
  Button,
  Link,
  Table,
  Tbody,
  TextButton,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
} from '@strapi/design-system';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import { ArrowLeft, Plus, Refresh } from '@strapi/icons';
import { useState } from 'react';
import pluginId from '../../../../utils/pluginId';
import CustomRow from '../../components/CustomRow';
import Guard from '../../components/Guard';
import PageWrapper from '../../components/PageWrapper';
import ToastMsg, { ToastMessageProps } from '../../components/ToastMsg';
import useFetchData from '../../hooks/useFetchData';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import axios from '../../utils/axiosInstance';

const THEAD_ITEMS = [
  'Run Number',
  'Pipeline Name',
  'Status',
  'Creation Date',
  'Duration',
  <VisuallyHidden key="actions" />,
];

interface Links {
  self: {
    href: string;
  };
  web: {
    href: string;
  };
  "pipeline.web": {
    href: string;
  };
  pipeline: {
    href: string;
  };
}

interface Pipeline {
  url: string;
  id: number;
  revision: number;
  name: string;
  folder: string;
}

interface PipelineRun {
  id: number;
  name: string;
  pipeline: Pipeline;
  state: string;
  result: string;
  createdDate: string;
  finishedDate: string;
  url: string;
  _links: Links;
}


const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.trigger}>
    <PluginPage />
  </CheckPagePermissions>
);

const PluginPage = () => {
  // Hooks
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState<ToastMessageProps>();
  const [toastToggle, setToastToggle] = useState(false);

  const { errors, fetchedData, isLoading, setRefetch } = useFetchData({
    url: `/${pluginId}/history`,
    method: 'GET',
  });

  // Translations
  const TITLE = useFormattedLabel('plugin.title');
  const HEADER_TITLE = useFormattedLabel('plugin.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('plugin.headers.subtitle');
  const PRIMARY_ACTION_BUTTON = useFormattedLabel('plugin.buttons.primary');
  const TOAST_SUCCESS_TITLE = useFormattedLabel('plugin.toast.success.title');
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel('plugin.toast.success.description');
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel('plugin.toast.failure.unknown.title');
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unknown.description'
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.title'
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.description'
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel('permission.toast.message');
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel('permission.toast.title');
  const SEE_MORE_BUTTON = useFormattedLabel('button.seeMore');
  const REFRESH_BUTTON = useFormattedLabel('button.refresh');
  const BACK_BUTTON = useFormattedLabel('button.back');

  // Callbacks
  async function triggerAzurePipeline() {
    try {
      setLoadingTriggerButton(true);
      await axios(`/${pluginId}/trigger`, {
        method: 'POST',
      });
      setToastMsg({
        variant: 'success',
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<Refresh />}
            onClick={() => {
              setRefetch({});
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error: any) {
      console.error(error);
      if (
        error.response.data.error?.status === 422 &&
        error.response.data.error?.name === 'UnprocessableEntityError'
      ) {
        setToastMsg({
          variant: 'danger',
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: (
            <Link
              isExternal
              href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/azure-repos-git?view=azure-devops&tabs=yaml#ci-triggers"
            >
              {SEE_MORE_BUTTON}
            </Link>
          ),
        });
      } else if (
        error.response.data.error?.status === 403 &&
        error.response.data.error?.name === 'PolicyError'
      ) {
        setToastMsg({
          variant: 'danger',
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
      } else {
        setToastMsg({
          variant: 'danger',
          title: TOAST_FAILURE_UNKNOWN_TITLE,
          message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
        });
      }
      setToastToggle(true);
    } finally {
      setLoadingTriggerButton(false);
    }
  }

  const isAccessDenied =
    errors?.message === 'ACCESS_DENIED' && errors.type === 'ROLES_AND_PERMISSIONS';
  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={
        <BaseHeaderLayout
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          navigationAction={
            <Link to="/" startIcon={<ArrowLeft />}>
              {BACK_BUTTON}
            </Link>
          }
          primaryAction={
            <Button
              onClick={triggerAzurePipeline}
              variant="default"
              size="L"
              disabled={isAccessDenied ? true : false}
              loading={loadingTriggerButton}
              startIcon={<Plus />}
            >
              {PRIMARY_ACTION_BUTTON}
            </Button>
          }
        />
      }
      pageTitle={TITLE}
    >
      {toastToggle && toastMsg && <ToastMsg
        title={toastMsg.title}
        message={toastMsg.message}
        variant={toastMsg.variant}
        closeToastHandler={() => setToastToggle(false)}
      />}
      <Guard errors={errors}>
        <Table colCount={6} rowCount={21}>
          <Thead>
            <Tr>
              {THEAD_ITEMS.map((title, i) => (
                <Th key={i}>
                  <Typography variant="sigma">{title}</Typography>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {fetchedData?.value?.map((r: PipelineRun) => {
              console.log("RUN", r)
              return <CustomRow
                key={r.pipeline.id}
                id={r.pipeline.id}
                conclusion={r.result}
                name={r.pipeline.name}
                run_number={r.id}
                run_started_at={r.createdDate}
                html_url={r._links.web.href}
                updated_at={r.finishedDate}
                created_at={r.createdDate}
                toastMsg={toastMsg}
                setToastMsg={setToastMsg}
                toastToggle={toastToggle}
                setToastToggle={setToastToggle}
              />
            })}
          </Tbody>
        </Table>
      </Guard>
    </PageWrapper>
  );
}

export default ProtectedPage


