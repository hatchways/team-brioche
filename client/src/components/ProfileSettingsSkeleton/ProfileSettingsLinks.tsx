import { Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import ProfilePhoto from '../../pages/ProfileSetting/ProfileSetting';
import ProfilePayment from './../ProfilePayment/ProfilePayment';

// Render in place of unavailable features during development
interface Props {
  text?: string;
}
const Unavailable: FunctionComponent<Props> = ({ text }): JSX.Element => {
  // if this somehow makes it to production
  const inProduction = process.env.NODE_ENV === 'production';
  return (
    <Typography align="center" variant="h6">
      Unavailable Feature {!inProduction && text}
    </Typography>
  );
};
interface RouteLink {
  name: string;
  path: string;
  component: JSX.Element;
}
const displayText = 'please modify the profileSettingsLinks.tsx file to add feature';
// Add new features by updating this array
const links: RouteLink[] = [
  {
    name: 'Edit profile',
    path: '/edit-profile',
    component: <Unavailable text={displayText} />,
  },
  {
    name: 'Profile photo',
    path: '/profile-photo',
    component: <ProfilePhoto />,
  },
  {
    name: 'Availability',
    path: '/availability',
    component: <Unavailable text={displayText} />,
  },
  {
    name: 'Payment',
    path: '/payment',
    component: <ProfilePayment />,
  },
  {
    name: 'Security',
    path: '/security',
    component: <Unavailable text={displayText} />,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: <Unavailable text={displayText} />,
  },
];
export default links;
