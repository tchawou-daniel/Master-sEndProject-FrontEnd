import {
  Dialog, DialogActions, DialogContent, Grid, ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import React, {
  memo, FC, useMemo, useState, useCallback,
} from 'react';

import { User } from 'types/users';

import { COMMON_MESSAGES } from 'react/common/messages';
import { EmpreinttThemeType } from 'react/ui/branding/theme';

import { formatUserFullName } from 'services/users/users.service';

import useLoadMore from '../../../react/common/useLoadMore';
import { Avatar } from '../../../react/ui/Generic/Avatar';
import { CancelButton, IconButton } from '../../../react/ui/Generic/Button/Button';
import DialogTitleWithCloseButton from '../../../react/ui/Generic/DialogTitleWithCloseButton';
import { SearchModal, SearchModalListElement } from '../../../react/ui/Generic/formElements/SearchModal/SearchModal';
import { H3 } from '../../../react/ui/Generic/typography';

interface PlanAssignmentUsersModalProps {
  users: User[];
  onClickAdd: (user: User) => any;
  isLoading: boolean;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface PlanAssignmentUsersListElementProps {
  user: User;
  onClickAdd: (user: User) => any;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  nameContainer: {
    flex: '1',
    paddingLeft: '8px',
  },
  simpleSearchBorder: {
    border: `1px solid ${theme.palette.divider}`,
    borderColor: theme.palette.divider,
  },
  inputBorderNone: {
    border: 'none',
  },
  inputRound: {
    borderRadius: '24px',
  },
  inputSquared: {
    borderRadius: '4px',
  },
  cancelButton: {
    padding: '7px 20px 7px 20px',
  },
  grayedAvatar: {
    filter: 'grayscale(1)',
  },
  inactiveUsers: {
    color: theme.palette.grey['600'],
  },
}));

const PlanAssignmentUsersListElement: FC<PlanAssignmentUsersListElementProps> = ({
  user,
  onClickAdd,
}) => {
  const classes = useStyles();

  const handleClickAdd = useCallback(
    () => onClickAdd(user),
    [user, onClickAdd],
  );

  return (
    <SearchModalListElement data-email={user.email}>
      <Avatar user={user} className={clsx(user.clearedAt ? classes.grayedAvatar : '')} />

      <span className={clsx(user.clearedAt
        ? `${classes.nameContainer} ${classes.inactiveUsers}`
        : classes.nameContainer)}
      >
        {formatUserFullName(user)}
      </span>

      <IconButton
        tooltipTitle="Add to plan"
        variant="iconOnly"
        onClick={handleClickAdd}
        name={user.email}
      >
        <AddCircle />
      </IconButton>
    </SearchModalListElement>
  );
};

export const CompaniesAssignmentsUsersModal: FC<PlanAssignmentUsersModalProps> = ({
  onClickAdd,
  users,
  isLoading,
  className,
  onClose,
  isOpen,
}) => {
  const classes = useStyles();

  const [filter, setFilter] = useState<string>('');

  const filteredUsers = useMemo(() => {
    if (!filter) {
      return users;
    }

    const lower = filter.toLowerCase();
    return users.filter(u => formatUserFullName(u).toLowerCase().includes(lower));
  }, [users, filter]);

  const {
    loadMoreProgress,
    onClickLoadMore,
    elementsCapped: usersCapped,
  } = useLoadMore(filteredUsers);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <>
        <DialogTitleWithCloseButton handleClose={onClose}>
          <Grid>
            <H3 color="secondary" align="center">
              Assign Member(s)
            </H3>
          </Grid>
        </DialogTitleWithCloseButton>
        <DialogContent>
          <SearchModal
            className={className}
            isLoading={isLoading}
            filter={filter}
            onChangeFilter={setFilter}
          >
            {usersCapped.map(user => (
              <PlanAssignmentUsersListElement
                key={user.id}
                user={user}
                onClickAdd={onClickAdd}
              />
            ))}
            {onClickLoadMore && (
              <ListItem button onClick={onClickLoadMore} component="li" key="loadMore">
                <i>{COMMON_MESSAGES.LOAD_MORE} ({loadMoreProgress})</i>
              </ListItem>
            )}
          </SearchModal>
          <DialogActions>
            <CancelButton onClick={onClose} className={classes.cancelButton}>
              {COMMON_MESSAGES.CLOSE}
            </CancelButton>
          </DialogActions>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default memo(CompaniesAssignmentsUsersModal);
