import React, { PropTypes } from 'react';
import { ListItem }     from 'material-ui/List';

const Component = ({
  key, 
  i,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  setCurentGuid,
  setModal
}) => {
  
  const getJsx = () => {
    let style = applyZebra(rowStyle.description, i);
    return (
      <div key={`${key}${columnKey}`} tabIndex={-1} style={style}>
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none'}}
          onClick={
            () => {
              setCurentGuid(key);
              setModal({ content: 'goodsCard', fullScreen: true });
            }
          }
        >
          <ListItem
            tabIndex={-1}
            innerDivStyle={{padding: '10px'}}
          >
            {items[key].description}
          </ListItem>
        </a>
      </div>
    );
  };
  
  return getJsx();
  
};

Component.propTypes = {
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.number.isRequired,
  applyVertBorder: PropTypes.func.isRequired,
  applyZebra: PropTypes.func.isRequired,
  rowStyle: PropTypes.object.isRequired,
  setCurentGuid: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
};

export default Component;