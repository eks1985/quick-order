import React, { PropTypes } from 'react';
// import { ListItem }     from 'material-ui/List';

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
        className='row-cell'
        onClick={
          () => {
            document.getElementById(rowIndex).focus();
          }
        }
      >
        <a
          tabIndex={-1}
          href="#"
          style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.870588)'}}
          onDoubleClick={
            () => {
              setCurentGuidCheckout(keyProp);
              //setModal({ content: 'goodsCard', fullScreen: true, showClose: true, style: { background: '#fff' }, data: { source: 'cart'} });
              setModal({ content: 'goodsCard', fullScreen: true, showClose: false, style: { background: '#fff' }, data: { source: 'cart'} });
            }
          }
        >
          <div
            style={{padding: '5px'}}
            className='goodsDescr'
          >
            {items[keyProp].description}
          </div>
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
