import React, { PropTypes } from 'react';
import { ListItem }     from 'material-ui/List';

const Component = ({
  currentCheckout,
  keyProp,
  rowIndex,
  items,
  columnKey,
  applyVertBorder,
  applyZebra,
  rowStyle,
  setCurentGuidCheckout,
  setModal
}) => {

  const applyCurrentRowBorder = (style) => {
    let extendedStyle = { ...style, background: 'rgba(255, 215, 0, 0.2)' };
    return currentCheckout === rowIndex ? { ...style, ...extendedStyle }: style;
  }

  const getJsx = () => {
    let style = applyCurrentRowBorder(applyZebra(rowStyle.description, rowIndex));
    return (
      <div
        key={`${keyProp}${columnKey}`}
        tabIndex={-1}
        style={style}
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none'}}
          onClick={
            () => {
              setCurentGuidCheckout(keyProp);
              setModal({ content: 'goodsCard', fullScreen: true, showClose: true, style: { background: '#fff' }, data: { source: 'cart'} });
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
  setCurentGuidCheckout: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
};

export default Component;
