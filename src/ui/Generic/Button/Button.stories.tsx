import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { FC } from 'react';

import Button, {
  DefaultActionButton, CancelButton, IconButton, DefaultActionIconButton, TertiaryButton, TertiaryBlockButton,
} from './Button';

export default {
  title: 'Generic/Button',
  component: Button,
  argTypes: {
    buttonType: {
      control: {
        type: 'inline-radio',
        options: ['Button', 'IconButton'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: [
          null,
          'contained',
          'outlined',
          'iconOnly',
        ],
      },
    },
  },
} as Meta;

const PreDefinedStyles: FC = () => (
    <>
      <h2>Pre-defined styles</h2>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DefaultActionButton>Action</DefaultActionButton>
        </Grid>
        <Grid item xs={2}>
          <CancelButton>Cancel</CancelButton>
        </Grid>
        <Grid item xs={2}>
          <TertiaryButton>Tertiary</TertiaryButton>
        </Grid>
        <Grid item xs={2}>
          <TertiaryBlockButton>TertiaryB</TertiaryBlockButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <span>DefaultAction</span>
          <DefaultActionIconButton>
            <CheckCircleOutlineOutlinedIcon />
          </DefaultActionIconButton>
        </Grid>
      </Grid>
    </>
);

// TODO: refactor this story to use Storybook Controls.
export const ButtonStory: FC = () => (
    <Container>
      <PreDefinedStyles />

      <h2>Primary</h2>
      <span style={{ color: 'red' }}>Warning: No color buttons must be used inside another button or modified on-the-fly to look like buttons</span>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <h3>Default</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>Primary</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>Tertiary</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>No Color</h3>
        </Grid>
        <Grid item xs={2}>
          <h3>Disabled</h3>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button color="default" onClick={action('onClick')} size="large">
            Large
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')} size="large">
            Large
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" onClick={action('onClick')} size="large">
            Large
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" noColor onClick={action('onClick')} size="large">
            Large
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" onClick={action('onClick')} size="large" disabled>
            Large
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button color="default" onClick={action('onClick')}>
            Default
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')}>
            Default
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" onClick={action('onClick')}>
            Default
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" noColor onClick={action('onClick')}>
            Default
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')} disabled>
            Default
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button color="default" onClick={action('onClick')} size="small">
            Small
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')} size="small">
            Small
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" onClick={action('onClick')} size="small">
            Small
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" noColor onClick={action('onClick')} size="small">
            Small
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')} size="small" disabled>
            Small
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button color="default" onClick={action('onClick')} variant="outlined">
            Outlined
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={action('onClick')} variant="outlined">
            Outlined
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="tertiary" onClick={action('onClick')} variant="outlined">
            Outlined
          </Button>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Button onClick={action('onClick')} variant="outlined" disabled>
            Outlined
          </Button>
        </Grid>
      </Grid>

      <h2>With Icons</h2>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button onClick={action('onClick')} startIcon={<CheckCircleOutlineOutlinedIcon />}>
            Primary button
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={action('onClick')} disabled startIcon={<CheckCircleOutlineOutlinedIcon />}>
            Primary button
          </Button>
        </Grid>
      </Grid>
    </Container>
);

export const IconButtonStory: FC = () => (
    <Container>
      <PreDefinedStyles />

      <h2>Default (contained)</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="secondary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="tertiary">
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>

      <h2>Outlined</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton variant="outlined">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="primary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="secondary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="tertiary">
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>
      <h2>Icon only</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton variant="iconOnly">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="primary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="secondary">
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="tertiary">
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
);

export const IconButtonLoadingStory: FC = () => (
    <Container>
      <h2>Default (contained)</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="secondary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="tertiary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>

      <h2>Outlined</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton variant="outlined" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="primary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="secondary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="outlined" color="tertiary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>
      <h2>Icon only</h2>
      <Grid container spacing={3}>
        <Grid item>
          <IconButton variant="iconOnly" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="primary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="secondary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton variant="iconOnly" color="tertiary" loading>
            <GetAppIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
);

export const CustomizableButtonStory: Story = args => (
    <Container>
      <h2>Customizable button</h2>

      {args.buttonType === 'IconButton' ? (
          <IconButton onClick={action('onClick')} color={args.color} variant={args.variant}>
            <GetAppIcon />
          </IconButton>
      ) : (
          <Button
              onClick={action('onClick')}
              color={args.color}
              noColor={args.noColor}
              size={args.size}
              variant={args.variant}
              startIcon={args.withStartIcon ? <CheckCircleOutlineOutlinedIcon /> : null}
              endIcon={args.withEndIcon ? <CheckCircleOutlineOutlinedIcon /> : null}
          >
            {args.content}
          </Button>
      )}
    </Container>
);

CustomizableButtonStory.args = {
  buttonType: 'Button',
  content: 'I\'m super-button!',
  color: 'default',
  noColor: false,
  variant: 'contained',
  withStartIcon: false,
  withEndIcon: false,
  loading: false,
  tooltipTitle: '',
};
