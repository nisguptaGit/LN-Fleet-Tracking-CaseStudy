import { memo } from 'react';
// import { List } from 'react-window';
import { Box } from '@mui/material';

const Row = memo(({ data, index, style, renderItem }) => {
  // const { items, renderItem } = data;
  // const item = items[index];

  return <Box style={style}>{renderItem(data, index)}</Box>;
});
Row.displayName = 'Row';

const VirtualList = memo(
  ({ items = [], itemSize = 50, height = 400, renderItem, ...props }) => {
    return (
      // <List
      //   height={height}
      //   itemCount={items.length}
      //   itemSize={itemSize}
      //   width='100%'
      //   itemData={{ items, renderItem }}
      //   {...props}
      // >
      //   {/* {Row} */}
      //   <Row />
      // </List>
      items.map((item, index) => (
        <Row
          key={item.id}
          data={item}
          index={index}
          style={{ height: itemSize }}
          renderItem={renderItem}
        />
      ))
    );
  },
);

VirtualList.displayName = 'VirtualList';

export default VirtualList;
