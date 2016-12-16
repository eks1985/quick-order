export default {
  style: {
    display: 'flex',
    position: 'relative'
  },
  arrowStyle: {
    button: {
      width: '28px',
      height: '28px',
      padding: '3px'
    },
    icon: {
      height: 16,
      width: 16
    }
  },
  zebraStyle: {
    background: 'rgba(238, 238, 238, 0.7)'
  },
  rowStyle: {
    container: {
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      flex: '0 0 auto',
      paddingRight: '50px'
    },
    code: {
      display: 'flex',
      flex: '0 0 120px',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    description: {
      display: 'flex',
      flex: '1 0 50%',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    price: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px',
      justifyContent: 'center',
    },
    add: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px'
    }
  },
  headerStyle: {
    container: {
      display: 'flex',
      height: '40px',
      flex: '0 0 auto',
      background: '#eee',
      position: 'relative',
      fontSize: '14px',
      paddingRight: '50px'
    },
    code: {
      display: 'flex',
      flex: '0 0 120px',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      position: 'relative'
    },
    description: {
      display: 'flex',
      flex: '1 0 50%',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
    },
    price: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
    },
    qty: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px'
    },
    add: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px'
    },
  },
  headerSettingsIBStyle: {
    position: 'absolute', 
    top: '0px', 
    right: '5px'
  },
  headerSettingsIconStyle: {
    height: '24px', 
    width:'24px', 
    padding: '2px'
  },
  incDecSmallQtyPane: {
    width: '12px', 
    cursor: 'pointer', 
    background: 'rgba(238, 238, 238, 0.5)'
  },
  qtyInputStyle: {
    width: '50px', 
    textAlign: 'right', 
    padding: '3px', 
    fontSize: '16px'
  }
};