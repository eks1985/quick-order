export default {
  style: {
    display: 'flex',
    position: 'relative',
    // flex: '1 0 auto'
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
  arrowSortStyle: {
    button: {
      width: '24px',
      height: '24px',
      padding: '0px'
    },
    icon: {
      height: 16,
      width: 16,
      // fill: '#aaa'
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
    common: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '3px',
      justifyContent: 'flex-start'
    },
    code: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '6px'
    },
    description: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '3px'
    },
    price: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    amount: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '3px',
      justifyContent: 'flex-end'
    },
    qty: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      padding: '3px',
      justifyContent: 'center'
    },
    add: {
      display: 'flex',
      flex: '0 0 100px',
      padding: '3px'
    }
  },
  columnStyle: {
    common: {
      display: 'flex',
      flex: '1 1 auto',
      position: 'relative',
      flexDirection: 'column',
    },
    code: {
      flex: '1 1 120px'
    },
    qty: {
      flex: '0 0 100px',
      // justifyContent: 'center'
    },
    price: {
      flex: '0 0 100px',
      // justifyContent: 'flex-end'
    },
    amount: {
      flex: '0 0 100px',
      // justifyContent: 'flex-end'
    },
    description: {
      flex: '1 1 50%'
    }
  },
  headerStyle: {
    container: {
      fontSize: '14px',
      display: 'flex',
      height: '40px',
      background: '#eee',
      padding: '5px',
      justifyContent: 'center',
      marginBottom: '3px',
      // cursor: 'pointer'
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
    amount: {
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
    left: '0px'
  },
  headerSettingsIconStyle: {
    height: '24px',
    width:'24px',
    padding: '2px'
  },
  incDecSmallQtyPane: {
    width: '12px',
    height: '28px',
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
