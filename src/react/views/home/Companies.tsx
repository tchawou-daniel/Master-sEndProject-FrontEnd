import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));
const Companies = () => {
  const classes = useStyles();
  console.log('companies2');
  return (
    <h1>Companies</h1>
  );
};
ReactDOM.render(<Companies />, document.getElementById('root'));

export default Companies;
