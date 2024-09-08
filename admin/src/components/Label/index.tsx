import { Badge } from '@strapi/design-system';

export default function Label(status: string) {
  const isSuccess = status === 'succeeded';
  const isFailure = status === 'failed';

  const BadgeStyles = {
    textColor: 'neutral100',
    backgroundColor: isSuccess ? 'success500' : isFailure ? 'danger500' : 'neutral800',
  };

  return <Badge {...BadgeStyles}>{status}</Badge>;
}
