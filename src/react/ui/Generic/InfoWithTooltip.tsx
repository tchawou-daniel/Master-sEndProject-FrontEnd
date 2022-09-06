import { Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, {
  memo, FC, ReactElement,
} from 'react';

interface InfoWithTooltipProps {
  children: ReactElement | string;
}

const ICON_STYLE = {
  display: 'inline-block',
  fontSize: '1em',
  marginLeft: '0.5em',
  verticalAlign: 'bottom',
};

const InfoWithTooltip: FC<InfoWithTooltipProps> = ({
  children,
}) => (
  <Tooltip placement="top" title={children} arrow={false}>
    <InfoOutlined style={ICON_STYLE} />
  </Tooltip>
);

export default memo(InfoWithTooltip);
