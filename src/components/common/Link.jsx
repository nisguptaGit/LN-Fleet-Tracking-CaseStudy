import { memo, useMemo } from 'react';
import { Link as MuiLink } from '@mui/material';

const Link = memo(
  ({ latitude, longitude, location, zoom = 10, openInNewTab = true }) => {
    const mapUrl = `https://google.com/maps/place/${latitude},${longitude}?z=${zoom}&output=embed`;
    const tabProps = useMemo(
      () =>
        openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {},
      [openInNewTab],
    );
    return (
      <div style={{ width: '100%', margin: '20px auto' }}>
        <MuiLink
          underline={'hover'}
          color={'primary'}
          variant={'primary'}
          href={mapUrl}
          {...tabProps}
        >
          {location}
        </MuiLink>
      </div>
    );
  },
);

Link.displayName = 'Link';

export default Link;
