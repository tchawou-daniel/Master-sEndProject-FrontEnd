import {
  Card, Box, CardContent, CardActions, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Group as GroupIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, {
  FC, memo, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';

import { CompanyAssignmentWithUser } from 'types/CompanyAssignments';

import { empreinttTheme, EmpreinttThemeType } from 'react/ui/branding/theme';
import { H2 } from 'react/ui/Generic/typography';
import { PlanAvatar } from 'react/views/Management/Companies/Overview/WorkerAvatar';

import { Company } from '../../../types/Company';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    '&:hover $configurationButton': {
      opacity: 1,
    },
  },
  content: {
    position: 'relative',
    flex: 1,
  },
  configurationButton: {
    opacity: 0,
    position: 'absolute',
    top: 5,
    right: 5,
    transition: 'opacity .2s',
  },
  cardActions: {
    padding: 0,
    boxShadow: `0px -1px 0px ${empreinttTheme.palette.grey['300']}`,
    transition: 'color .2s, background-color .2s',
    '& > div:not(:first-child)': {
      margin: 0, // Reset some MUI style.
    },
  },
  cardActionButton: {
    color: empreinttTheme.palette.link.main,
    width: '100%',
    borderRadius: 0,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: empreinttTheme.palette.link.main,
      boxShadow: `0px -1px 0px ${empreinttTheme.palette.link.main}`,
    },
  },
  moreThanLimit: {
    height: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    fontWeight: 'bold',
  },
}));

const COMPANY_ASSIGNMENTS_LIMIT = 7;

interface PlanCardProps {
  companies: Company,
  assignments: CompanyAssignmentWithUser[],
}

const CompanyCard: FC<PlanCardProps> = ({
  companies,
  assignments,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const openAssignments = useCallback(() => {
    history.push(`/plans/${plan.id}/assignment?from=plantab`);
  }, [history, plan]);

  return (
    <Card elevation={0} className={clsx('plan-card', classes.root)}>
      <CardContent className={classes.content}>
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          paddingX={empreinttTheme.spacing(0.5)}
          marginY={empreinttTheme.spacing(0.25)}
        >
          <H2 color="secondary">{plan.name}</H2>
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {assignments.map(a => (
            <PlanAvatar key={a.user.id} user={a.user} />
          ))}

        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton
            aria-label="Assignments"
            className={classes.cardActionButton}
            onClick={openAssignments}
            name="goToPlanAssignments"
          >
            <GroupIcon fontSize="large" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default memo(CompanyCard);
