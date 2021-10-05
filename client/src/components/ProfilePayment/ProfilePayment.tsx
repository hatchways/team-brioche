import { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import { addPaymentMethodToCustomer, getAllPaymentMethodsByCustomer } from '../../helpers/APICalls/paymentService';
import withStripe from './withStripe';
import useStyles from './useStyles';

const ProfilePayment: FunctionComponent = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [savingCard, setSavingCard] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    async function getCards() {
      const paymentMethods = await getAllPaymentMethodsByCustomer();
      // setPaymentMethods(paymentMethods);
    }
    getCards();
  }, [stripe]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSavingCard(true);
    if (!stripe || !elements) {
      setSavingCard(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      card: cardElement,
    });

    if (error) {
      setError(true);
      console.log('[error]', error);
    } else {
      //await addPaymentMethodToCustomer(paymentMethod?.id);
      console.log('[PaymentMethod]', paymentMethod);
    }
    setTimeout(() => {
      setAddCard(false);
      setSavingCard(false);
    }, 3000);
  };

  return (
    <Box padding="3rem 6rem">
      <Grid container justifyContent="center" component={Paper} className={classes.container}>
        <Typography align="center" variant="h5" className={classes.heading} component="h2">
          Payment Methods
        </Typography>
        <Typography align="left" variant="body1" className={classes.subheading}>
          Saved Payment Profiles:
        </Typography>
        <Grid container justifyContent="center" alignItems="center" className={classes.cardContainer}>
          {paymentMethods.map((method, index) => (
            <p key={index}>Payment card</p>
          ))}
        </Grid>
        <Box display="flex" alignContent="flex-start" width="100%">
          {addCard ? (
            <Box style={{ width: '50%' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <CardElement />
                <Button type="submit" color="primary" variant="outlined" style={{ margin: '1rem' }}>
                  {savingCard ? <CircularProgress size="2rem" thickness={1.5} /> : 'Add card'}
                </Button>
              </form>
            </Box>
          ) : (
            <Button
              disabled={stripe ? false : true}
              onClick={() => setAddCard(true)}
              color="primary"
              variant="outlined"
              size="large"
            >
              Add new payment profile
            </Button>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default withStripe(ProfilePayment);
