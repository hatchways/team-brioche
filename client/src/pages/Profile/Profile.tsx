import { Grid, Paper, Typography, ImageList, ImageListItem } from '@material-ui/core/';
import useStyles from './useStyles';
import { useParams } from 'react-router-dom';

export default function Profile(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container direction="row" justifyContent="center">
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src="/pics/cover-sample.jpg" alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src="/pics/profilepic-sample.jpg" alt="Profile Pic" />
          <Typography variant="h4">Norma Byers</Typography>
          <Typography variant="subtitle1">Loving Pet Sitter</Typography>
          <Typography variant="subtitle2">Toronto,ON</Typography>
        </Grid>
        <Grid container className={classes.aboutContainer}>
          <Typography variant="h5">About me</Typography>
          <Typography variant="body1" className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
            repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur
            iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo
            neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi
            expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.
          </Typography>
          <Grid container className={classes.galleryContainer}>
            <img className={classes.galleryPic} src="/pics/dog1.jpg" alt="Gallery Pics" />
            <img className={classes.galleryPic} src="/pics/dog2.jpg" alt="Gallery Pics" />
            <img className={classes.galleryPic} src="/pics/dog3.jpg" alt="Gallery Pics" />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.bookingContainer}>
        <Typography variant="h5">$14/hr</Typography>
      </Paper>
    </Grid>
  );
}
