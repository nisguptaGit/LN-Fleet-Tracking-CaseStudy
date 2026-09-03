import { memo } from 'react';
import { Box, Typography } from '@mui/material';

const BasicCard = memo(
  ({ icon: Icon, title, value, children, isFullWidth = false }) => {
    return (
      <Box
        sx={{
          p: 1.5,
          bgcolor: '#f9fbfd',
          borderRadius: '12px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.02)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '50px',
          justifyContent: 'center',
          borderLeft: '4px solid #76b5f5',
          height: '100%',
          width: '100%',
          flexGrow: 1,
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          {Icon && (
            <Icon sx={{ fontSize: '0.95rem', color: 'text.secondary' }} />
          )}
          <Typography
            variant='caption'
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'text.secondary',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          {children ? (
            children
          ) : (
            <Typography
              variant='body2'
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: '0.95rem',
                lineHeight: 1.3,
                wordBreak: 'break-all',
              }}
            >
              {value || 'N/A'}
            </Typography>
          )}
        </Box>
      </Box>
    );
  },
);

BasicCard.displayName = 'BasicCard';

export default BasicCard;
