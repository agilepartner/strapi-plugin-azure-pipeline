import { IconButton, IconButtonGroup, Td, Tooltip, Tr } from '@strapi/design-system';
import { ExternalLink, Eye } from '@strapi/icons';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { useState } from 'react';
import pluginId from '../../../../utils/pluginId';
import axios from '../../utils/axiosInstance';
import Label from '../Label';
import { ToastMessageProps } from '../ToastMsg';

interface ToastHandler {
  toastMsg: ToastMessageProps | undefined;
  setToastMsg: React.Dispatch<React.SetStateAction<ToastMessageProps | undefined>>;
  toastToggle: boolean;
  setToastToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CustomRowProps extends ToastHandler {
  id: number;
  conclusion?: string;
  name: string;
  run_number: number;
  run_started_at: string;
  html_url: string;
  updated_at: string;
  created_at: string;
};

export default function CustomRow({
  id,
  conclusion,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at,
}: CustomRowProps) {

  const isThereAConclusion = Boolean(conclusion);
  const [disabledLogsButton, setDisabledLogsButton] = useState(isThereAConclusion ? false : true);
  const msDiffResult = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

  async function logsHandler(id: number) {
    setDisabledLogsButton(true);
    try {
      let logsUrl = await axios({
        method: 'get',
        url: `/${pluginId}/logs`,
        params: {
          jobId: id,
        },
      });
      window.open(`${logsUrl.data}`, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setDisabledLogsButton(false);
    }
  }

  return (
    <Tr aria-rowindex={id}>
      <Td>{run_number}</Td>
      <Td>{name}</Td>
      <Td>{conclusion ? Label(conclusion) : '-'}</Td>
      <Td>{creationDate}</Td>
      {!isThereAConclusion ? (
        <Td>in progress</Td>
      ) : (
        <Td>{`${mins ? mins + 'm' : ''} ${Math.trunc(secs)}s`}</Td>
      )}
      <Td>
        <IconButtonGroup>
          <Tooltip description="logs">
            <IconButton
              disabled={disabledLogsButton}
              aria-label="logs"
              onClick={() => logsHandler(id)}
              icon={<Eye />}
            />
          </Tooltip>
          <Tooltip description="view more">
            <a href={html_url} target="_blank" rel="noreferrer">
              <IconButton aria-label="view more" icon={<ExternalLink />} />
            </a>
          </Tooltip>
        </IconButtonGroup>
      </Td>
    </Tr>
  );
}
