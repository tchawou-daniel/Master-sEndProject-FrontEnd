import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Meta } from '@storybook/react/types-6-0';
import React, { FC } from 'react';

export default {
  title: 'Branding/Theme',
} as Meta;

export const Colors: FC = () => (
  <>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="primary.main" color="primary.contrastText" p={2}>
          Primary * 500
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="primary.light" color="primary.contrastText" p={2}>
          Primary * 400
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="background.light" color="primary.contrastText" p={2}>
          Background Light
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="background.dark" color="primary.contrastText" p={2}>
          Background Dark
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="text.primary" color="#fff" p={2}>
          Text primary
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="text.secondary" color="#fff" p={2}>
          Text secondary
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="text.disabled" color="#fff" p={2}>
          Text disabled
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="title.main" color="primary.contrastText" p={2}>
          Title primary
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="title.light" color="primary.contrastText" p={2}>
          Title secondary
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="error.main" color="primary.contrastText" p={2}>
          Danger
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="warning.main" color="primary.contrastText" p={2}>
          Warning
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box borderRadius="5px" bgcolor="success.main" color="primary.contrastText" p={2}>
          Success
        </Box>
      </Grid>
    </Grid>
  </>
);

export const FontSizes: FC = () => (
  <>
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          H1
        </Typography>
        <Typography variant="h1">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="h1">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="h1">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          H2
        </Typography>
        <Typography variant="h2">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="h2">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="h2">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          H3
        </Typography>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>
    </Grid>

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          SUBHEADER
        </Typography>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          HEADLINE
        </Typography>
        <Typography variant="subtitle2">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="subtitle2">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="subtitle2">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          BODY
        </Typography>
        <Typography variant="body1">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="body1">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          CAPTION
        </Typography>
        <Typography variant="caption">
          <Box fontWeight="fontWeightBold">Short display headline</Box>
        </Typography>
        <Typography variant="caption">
          <Box fontWeight="fontWeightBold" color="text.secondary">
            Short display headline
          </Box>
        </Typography>
        <Typography variant="caption">
          <Box fontWeight="fontWeightBold" color="text.disabled">
            Short display headline
          </Box>
        </Typography>
      </Grid>
    </Grid>

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          LINK HEADLINE
        </Typography>
        <Typography variant="subtitle2">
          <Link href="/">En savoir plus</Link>
        </Typography>
        <Typography variant="subtitle2">
          <Link color="error" href="/">
            Supprimer
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          LINK
        </Typography>
        <Typography variant="body1">
          <Link href="/">En savoir plus</Link>
        </Typography>
        <Typography variant="body1">
          <Link color="error" href="/">
            Supprimer
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" color="primary">
          LINK CAPTION
        </Typography>
        <Typography variant="caption">
          <Link href="/">En savoir plus</Link>
        </Typography>
        <Typography variant="caption">
          <Link color="error" href="/">
            Supprimer
          </Link>
        </Typography>
      </Grid>
    </Grid>
  </>
);
