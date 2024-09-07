import { Stack, TextInput } from '@strapi/design-system';
import React from 'react';

type TextFieldProps = {
  HintMessage?: React.ReactNode;
  [key: string]: any;
}

export default function TextField({ HintMessage, ...other }: TextFieldProps) {
  return (
    <Stack spacing={1.5}>
      <TextInput {...other} />
      {HintMessage}
    </Stack>
  );
}
