import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const ListSettings = ({
  options
}) => {
  const { catalogListSettings } = options;
  return (
    <div>
      <div>
        <RaisedButton 
          label='Сохранить'
        />
      </div>
      <div>
        {
          catalogListSettings.map(elem => {
            return <div>{elem}</div>;
          })
        }
      </div>
    </div>  
  );
};

export default connect(
  state => ({ options: state.options })
)(ListSettings);