import { Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import ProfilePhoto from '../../pages/ProfileSetting/ProfileSetting';

// Render in place of unavailable features during development
const Unavailable: FunctionComponent = (): JSX.Element => {
  return <Typography>Unavailable Feature</Typography>;
};

interface RouteLink {
  name: string;
  path: string;
  component: FunctionComponent;
}

// Add new features by updating this array
const links: RouteLink[] = [
  {
    name: 'Edit profile',
    path: '/edit-profile',
    component: Unavailable,
  },
  {
    name: 'Profile photo',
    path: '/profile-photo',
    component: ProfilePhoto,
  },
  {
    name: 'Availability',
    path: '/availability',
    component: Unavailable,
  },
  {
    name: 'Payment',
    path: '/payment',
    component: Unavailable,
  },
  {
    name: 'Security',
    path: '/security',
    component: Unavailable,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Unavailable,
  },
];

export default links;
