import { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';

const DialogComponent = memo(
  ({
    isOpen,
    title,
    content,
    onSave,
    onCancel,
    onClose,
    hideSave = true,
    saveButtonText = 'Save',
    cancelButtonText = 'Cancel',
    maxWidth = 'sm',
    fullWidth = true,
    data,
    children,
    ...props
  }) => {
    const handleClose = onClose || onCancel;

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        {...props}
      >
        {title && <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>}

        <DialogContent sx={{ py: 3 }}>
          {children ? (
            children
          ) : (
            <Box>
              {typeof content === 'string' ? <span>{content}</span> : content}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button variant='outlined' color='inherit' onClick={onCancel}>
            {cancelButtonText}
          </Button>
          {hideSave ? null : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => onSave(data)}
            >
              {saveButtonText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  },
);

DialogComponent.displayName = 'DialogComponent';

export default DialogComponent;
