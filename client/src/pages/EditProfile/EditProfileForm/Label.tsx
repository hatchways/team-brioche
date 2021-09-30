import { Grid, InputLabel, Typography } from '@material-ui/core';
interface Props {
  cls: string;
  labelName: string;
  htmlFor: string;
}
const Label = ({ cls, labelName, htmlFor }: Props): JSX.Element => {
  return (
    <Grid item>
      <InputLabel htmlFor={htmlFor}>
        <Typography className={cls} variant="button" display="block" gutterBottom>
          {labelName}
        </Typography>
      </InputLabel>
    </Grid>
  );
};
export default Label;
