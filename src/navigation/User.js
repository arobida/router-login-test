import React from 'react';
import { match } from 'react-router-dom';

const User = (params) => {
  return (
    <h1>Welcome {params.username}</h1>
  );
}

export default User