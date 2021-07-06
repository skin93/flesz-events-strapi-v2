import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton variant='rect' width={210} height={118} />
      <Skeleton variant='text' width={210} />
      <Skeleton variant='text' width={100} />
    </div>
  );
};

export default SkeletonCard;
