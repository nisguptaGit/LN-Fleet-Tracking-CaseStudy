import { useState, useCallback } from 'react';
import useToggle from './useToggle';

const useDialog = (initialData = null) => {
  const {
    isActive: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [data, setData] = useState(initialData);
  const [saveCallback, setSaveCallback] = useState(null);
  const [cancelCallback, setCancelCallback] = useState(null);

  const open = useCallback(
    (config = {}) => {
      setTitle(config.title || '');
      setContent(config.content || null);
      setData(config.data || initialData);
      setSaveCallback(() => config.onSave);
      setCancelCallback(() => config.onCancel);
      openModal();
    },
    [initialData, openModal],
  );

  const close = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleSave = useCallback(
    (result) => {
      if (saveCallback) {
        saveCallback(result, data);
      }
    },
    [saveCallback, data],
  );

  const handleCancel = useCallback(() => {
    if (cancelCallback) {
      cancelCallback();
    }
    close();
  }, [cancelCallback, close]);

  return {
    isOpen,
    title,
    content,
    data,
    open,
    close,
    handleSave,
    handleCancel,
  };
};

export default useDialog;
