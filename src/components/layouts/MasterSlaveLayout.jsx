import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import useResizable from '../../hooks/useResizable';

const MasterSlaveLayout = memo(
  ({
    master,
    slave,
    masterWidth = 3,
    slaveWidth = 9,
    spacing = 1,
    maxHeight = '100%',
    stackOnMobile = true,
    enableResize = false,
    onWidthChange,
    ...props
  }) => {
    const { currentWidth, containerRef, handleMouseDown, isResizingRef } =
      useResizable(masterWidth, 3, 9, onWidthChange);

    const { masterWidthPercent, slaveWidthPercent } = useMemo(
      () => ({
        masterWidthPercent: enableResize ? currentWidth : masterWidth,
        slaveWidthPercent: enableResize
          ? 12 - (enableResize ? currentWidth : masterWidth)
          : slaveWidth,
      }),
      [enableResize, currentWidth, masterWidth, slaveWidth],
    );

    const containerSx = useMemo(
      () => ({
        display: 'grid',
        gridTemplateColumns: enableResize
          ? `${(masterWidthPercent / 12) * 100}% auto ${(slaveWidthPercent / 12) * 100}%`
          : `${(masterWidth / 12) * 100}% ${(slaveWidth / 12) * 100}%`,
        gap: enableResize ? 0 : spacing,
        height: '100%',
        width: '100%',
        '@media (max-width: 960px)': stackOnMobile
          ? {
              gridTemplateColumns: '1fr',
            }
          : {},
      }),
      [
        maxHeight,
        masterWidth,
        slaveWidth,
        spacing,
        stackOnMobile,
        enableResize,
        masterWidthPercent,
        slaveWidthPercent,
      ],
    );

    const panelSx = useMemo(
      () => ({
        height: '100%',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
      }),
      [],
    );

    const resizerSx = useMemo(
      () => ({
        width: '4px',
        backgroundColor: '#d0d0d0',
        cursor: 'col-resize',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: '#999',
        },
        transition: 'background-color 0.2s',
      }),
      [],
    );

    return (
      <Box ref={containerRef} sx={containerSx} {...props}>
        <Box sx={panelSx}>{master}</Box>
        {enableResize && <Box sx={resizerSx} onMouseDown={handleMouseDown} />}
        <Box sx={{ ...panelSx, ml: enableResize ? spacing : 0 }}>{slave}</Box>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    const masterUnchanged =
      prevProps.master === nextProps.master &&
      prevProps.masterWidth === nextProps.masterWidth &&
      prevProps.spacing === nextProps.spacing &&
      prevProps.stackOnMobile === nextProps.stackOnMobile &&
      prevProps.enableResize === nextProps.enableResize;

    const slaveUnchanged =
      prevProps.slave === nextProps.slave &&
      prevProps.slaveWidth === nextProps.slaveWidth;

    return masterUnchanged && slaveUnchanged;
  },
);

MasterSlaveLayout.displayName = 'MasterSlaveLayout';

export default MasterSlaveLayout;
