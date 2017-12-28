import React from 'react';

import { Link as RouterLink } from 'react-router';

const Link = props => (
  <RouterLink {...props} style={{ textDecoration: 'none', color: 'inherit' }} />
);

export default Link;
