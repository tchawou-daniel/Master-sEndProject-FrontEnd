import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';

interface TextProps extends TypographyProps {
  fontWeight?: string;
}

const Text: React.FC<TextProps> = ({ children, variant, ...props }) => (
  <Typography variant={variant} {...props} component="span">
    <Box fontWeight={props.fontWeight}>{children}</Box>
  </Typography>
);

export const H1: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="h1" {...props}>
    {children}
  </Text>
);

export const H2: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="h2" {...props}>
    {children}
  </Text>
);

export const H3: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="h3" {...props}>
    {children}
  </Text>
);

export const H4: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="h4" {...props}>
    {children}
  </Text>
);

export const H5: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="h5" {...props}>
    {children}
  </Text>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="subtitle1" {...props}>
    {children}
  </Text>
);

export const Subtitle2: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="subtitle2" {...props}>
    {children}
  </Text>
);

export const BODY1: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="body1" {...props}>
    {children}
  </Text>
);

export const BODY2: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="body2" {...props}>
    {children}
  </Text>
);

export const Overline: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Text variant="overline" {...props}>
    {children}
  </Text>
);
