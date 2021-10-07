import { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { useSnackBar } from '../../context/useSnackbarContext';
import { PaymentMethod } from '../../interface/PaymentMethods';
import { formatCardDate } from '../../helpers/dateTimeHelper';
import {
  createCardSetup,
  getAllPaymentMethodsByCustomer,
  updateDefaultMethod,
} from '../../helpers/APICalls/paymentService';
import withStripe from './withStripe';
import useStyles from './useStyles';
import visa from '../../Images/Visa.png';
import mastercard from '../../Images/mastercard.svg';
import defaultCardLogo from '../../Images/default.png';

const cardLogos = [
  { brand: 'visa', logo: visa },
  { brand: 'mastercard', logo: mastercard },
];

const ProfilePayment: FunctionComponent = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('');
  const [addCard, setAddCard] = useState(false);
  const [savingCard, setSavingCard] = useState(false);

  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    async function getCards() {
      getAllPaymentMethodsByCustomer()
        .then((result) => {
          setPaymentMethods(result.paymentMethods);
          setDefaultPaymentMethod(result.defaultPaymentMethod);
        })
        .catch((error) => updateSnackBarMessage(error.message || 'Can not get payment methods.'));
    }
    getCards();
  }, [updateSnackBarMessage]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSavingCard(true);
    if (!stripe || !elements) {
      setSavingCard(false);
      return;
    }

    const resetUI = () => {
      setAddCard(false);
      setSavingCard(false);
    };

    const { clientSecret, attachedDetails } = await createCardSetup();
    try {
      const { error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          card: elements.getElement(CardElement),
          billing_details: {
            name: attachedDetails.name,
            email: attachedDetails.email,
          },
        },
      });
      if (error) throw new Error();
    } catch (error) {
      updateSnackBarMessage('An error occured while processing your card. Please try a different card');
      resetUI();
      return;
    }
    resetUI();
    updateSnackBarMessage('New card successfully added');
  };

  const handleCardClick = (methodId: string) => {
    if (methodId === defaultPaymentMethod) updateSnackBarMessage('This Card is already the default Payment Card');
    updateDefaultMethod(methodId)
      .then(() => setDefaultPaymentMethod(methodId))
      .catch((err) => updateSnackBarMessage(err.message || 'An error occured, while processing your request'));
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
        <Grid container direction="row" alignItems="center" className={classes.cardContainer}>
          {paymentMethods.length ? (
            paymentMethods.map((method) => (
              <Box
                key={method.id}
                display="flex"
                flexDirection="column"
                className={classes.card}
                onClick={() => handleCardClick(method.id)}
              >
                <Box display="flex" justifyContent="space-between">
                  <img
                    src={cardLogos.find(({ brand }) => brand === method.brand)?.logo || defaultCardLogo}
                    alt={method.brand}
                    className={classes.image}
                  />
                  {defaultPaymentMethod === method.id && <CheckCircle color="primary" />}
                </Box>
                <Typography variant="body1" className={classes.bold}>
                  **** **** **** {method.last4}
                </Typography>
                <Typography variant="button" className={clsx(classes.bold, classes.light)}>
                  Exp. date {formatCardDate(method.expMonth)}/{formatCardDate(method.expYear)}
                </Typography>
                <Typography variant="h6" className={classes.bold}>
                  {method.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography align="center" variant="h6">
              No cards to display
            </Typography>
          )}
        </Grid>
        <Box display="flex" alignContent="flex-start" width="100%">
          {addCard ? (
            <form onSubmit={handleSubmit} className={classes.form}>
              <CardElement />
              <Button type="submit" color="primary" variant="outlined" className={classes.formButton}>
                {savingCard ? <CircularProgress size="2rem" thickness={1.5} /> : 'Add card'}
              </Button>
            </form>
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
