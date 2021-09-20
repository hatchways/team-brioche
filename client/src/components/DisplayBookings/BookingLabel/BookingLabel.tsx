import { Box } from '@material-ui/core';
import Label from '../Label/Label';

interface Props {
  accepted: boolean;
  declined: boolean;
}

export default function BookingLabel({ accepted, declined }: Props): JSX.Element {
  return (
    <Box style={{ paddingRight: '0.5rem' }}>
      {accepted && !declined && <Label type="status">Accepted</Label>}
      {declined && <Label type="status">Declined</Label>}
    </Box>
  );
}
