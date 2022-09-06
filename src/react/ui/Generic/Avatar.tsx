import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddAPhotoOutlined } from '@material-ui/icons';
import MuiAvatarGroup, { AvatarGroupProps as MuiAvatarGroupProps } from '@material-ui/lab/AvatarGroup';
import clsx from 'clsx';
import React, {
  CSSProperties, FC, useMemo, FunctionComponent, SVGProps,
} from 'react';

import { empreinttTheme, EmpreinttThemeType } from 'react/ui/branding/theme';

import { ReactComponent as CrownSvg } from '../../../assets/images/customIcons/crown.svg';
import { UserComputed } from '../../../types/users';

export enum DecorationKeys {
  CROWN = 'CROWN',
}

export const DecorationValues: Record<DecorationKeys, { Tag: FunctionComponent<SVGProps<SVGSVGElement>>, styles: object }> = {
  [DecorationKeys.CROWN]: {
    Tag: CrownSvg,
    styles: {
      fill: '#FFC109', height: '50%', width: '50%', position: 'absolute', left: '25%', top: 'calc(10% - 23px)',
    },
  },
};

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    position: 'relative',
    top: 0,
  },
  avatar: {
    color: theme.palette.common.white,
    zIndex: 1,
    position: 'relative',
  },
  decorationWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

interface AvatarProps extends MuiAvatarProps {
  user: UserComputed;
  onClick?: () => void;
  style?: CSSProperties;
  addAPicture?: boolean;
  decorations?: DecorationKeys[],
}

export const Avatar: FC<AvatarProps> = ({
  user,
  onClick,
  style,
  addAPicture,
  decorations,
  ...props
}) => {
  const classes = useStyles();
  const alt = `${user?.firstName} ${user?.lastName}`;
  const className = clsx(props.className, classes.avatar);

  const avatarStyle = useMemo(() => ({
    ...style,
    // If we have an onClick function, set cursor pointer.
    cursor: onClick ? 'pointer' : 'initial',
  }), [style, onClick]);

  const rootStyle = useMemo(() => ({
    ...style,
    top: 0,
  }), [style]);

  const getInitial = (value: string) => value.charAt(0).toUpperCase() ?? '?';

  const userInitials = `${user?.firstName && getInitial(user.firstName)}${user?.lastName && getInitial(user.lastName)}`;

  const content = useMemo(() => {
    if (props.children) {
      return props.children;
    }
    if (!addAPicture) {
      return userInitials;
    }
    return (<AddAPhotoOutlined style={{ color: empreinttTheme.palette.link.main, fontSize: 30 }} />);
  }, [userInitials, props, addAPicture]);

  return (
    <Box style={rootStyle} className={classes.root}>
      <MuiAvatar {...props} alt={alt} src={user?.pictureURL || undefined} className={className} onClick={onClick} style={avatarStyle}>
        {content}
      </MuiAvatar>

      {(decorations || []).map((d) => {
        const { Tag, styles } = DecorationValues[d];
        return (
          <div className={classes.decorationWrapper} key={d}>
            <Tag style={styles} />
          </div>
        );
      })}
    </Box>
  );
};

interface AvatarGroupProps extends MuiAvatarGroupProps {
  users: UserComputed[];
}

const avatarGroupStyles = makeStyles((theme: EmpreinttThemeType) => ({
  avatar: {
    color: theme.palette.common.white,
    width: '43px',
    height: '43px',
    marginLeft: '-8px',
    border: `2px solid ${theme.palette.common.white}`,
    fontSize: empreinttTheme.typography.caption.fontSize,
    '&:first-child': {
      marginLeft: '0',
    },

    '&:last-child': {
      color: empreinttTheme.palette.secondary.main,
      backgroundColor: empreinttTheme.palette.primary.main,
    },
  },
}));

export const AvatarGroup: FC<AvatarGroupProps> = ({ users, ...props }) => {
  const classes = avatarGroupStyles();
  return (
    <MuiAvatarGroup {...props} classes={{ avatar: classes.avatar }}>
      {(users || []).map(user => <Avatar key={user.id} user={user} className={classes.avatar} />)}
    </MuiAvatarGroup>
  );
};
