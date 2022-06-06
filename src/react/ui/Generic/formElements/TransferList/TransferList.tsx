import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';
import Button from 'react/ui/Generic/Button/Button';

export interface TransferListItem {
  label: string;
  id: string;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => createStyles({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const not = (a: TransferListItem[], b: TransferListItem[]): TransferListItem[] => a.filter(value => b.indexOf(value) === -1);

const intersection = (a: TransferListItem[], b: TransferListItem[]): TransferListItem[] => a.filter(value => b.indexOf(value) !== -1);

const TransferList: FC<{
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
}> = ({ leftItems, rightItems }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<TransferListItem[]>([]);
  const [left, setLeft] = React.useState<TransferListItem[]>(leftItems);
  const [right, setRight] = React.useState<TransferListItem[]>(rightItems);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TransferListItem) => (): void => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = (): void => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = (): void => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = (): void => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = (): void => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList: FC<any> = (items: TransferListItem[]) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((item: TransferListItem) => {
          const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <ListItem key={item.id} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.label} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default TransferList;
