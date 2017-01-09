import React, { PropTypes } from 'react';
import { ListItem }     from 'material-ui/List';

const Component = ({
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  setCurentGuid,
  setModal
}) => {

  const getJsx = () => {
    let style = applyZebra(rowStyle.description, rowIndex);
    return (
      <div key={`${keyProp}${columnKey}`} tabIndex={-1} style={style}>
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none'}}
          onClick={
            () => {
              setCurentGuid(keyProp);
              setModal({ content: 'goodsCard', fullScreen: true });
            }
          }
        >
          <ListItem
            tabIndex={-1}
            innerDivStyle={{padding: '10px'}}
          >
            {items[keyProp].description}
          </ListItem>
        </a>
      </div>
    );
  };

  return getJsx();

};

Component.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  items: PropTypes.object.isRequired,
  columnKey: PropTypes.string.isRequired,
  applyVertBorder: PropTypes.func.isRequired,
  applyZebra: PropTypes.func.isRequired,
  rowStyle: PropTypes.object.isRequired,
  setCurentGuid: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
};

export default Component;
