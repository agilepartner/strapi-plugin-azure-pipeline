import { Box, Flex, Loader } from '@strapi/design-system';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import { PropsWithChildren, ReactNode } from 'react';
import useFormattedLabel from '../../hooks/useFormattedLabel';

const PADDING_X = 10;
const PADDING_Y = 2;

function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel('loadingMsg');
  return (
    <Flex justifyContent="center">
      <Loader>{LOADING_MESSAGE}</Loader>
    </Flex>
  );
}

interface PageWrapperProps {
  baseHeaderLayout: ReactNode
  pageTitle: string
  isLoading: boolean
}

export default function PageWrapper({ children, baseHeaderLayout, pageTitle, isLoading }: PropsWithChildren<PageWrapperProps>) {
  return (
    <>
      <SettingsPageTitle name={pageTitle} />
      {baseHeaderLayout}
      <Box
        paddingRight={PADDING_X}
        paddingLeft={PADDING_X}
        paddingTop={PADDING_Y}
        paddingBottom={PADDING_Y}
      >
        {isLoading ? <PageLoading /> : <>{children}</>}
      </Box>
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  baseHeaderLayout: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
