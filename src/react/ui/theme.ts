import { createTheme, Theme } from '@material-ui/core/styles';

// Properly override interface so we can add colors to the palette.
// @see https://material-ui.com/customization/palette/
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'];
    link: PaletteColor;
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    link: PaletteColorOptions;
  }
}

export const colors = {
  'primary-500': '#2b0294',
  'primary-400': '#491dde',
  'primary-300': '#4f2fc9',
  'primary-200': '#5f34c9',
  'primary-100': '#725fc2',
  'primary-50': '#7b6fb2',
  'secondary-500': '#663C00',
  'secondary-400': '#7F4A00',
  'secondary-100': '#be8837',
  'secondary-50': '#cba570',
  'tertiary-500': '#003e85',
  'tertiary-400': '#0052af',
  'tertiary-100': '#559aea',
  'tertiary-50': '#8daecc',
  'grey-100': '#FAF9F7',
  'grey-200': '#DDDCDA',
  'grey-300': '#C4C4C4',
  'grey-600': '#9E9E9E',
  'grey-700': '#707070',
  'grey-800': '#424242',

  'blue-500': '#00AAFB',

  'blue-100': '#E0F5FE',
  'green-100': '#E8FAF0',
  'purple-100': '#F9E8FC',
  'red-100': '#FCE9E9',
  'orange-100': '#FEF2E0',
  'cyan-100': '#E0FEFD',
  'yellow-100': '#FDF5E9',
  'pink-100': '#FCE8F6',
  'brown-100': '#FAF9F7',

  'warning-700': '#EE9517',

  'quarternary-700': '#9DCDFA',
  'quarternary-500': '#C0DBF4',

  black: 'rgba(0, 0, 0, 0.87)',
};

export enum EmpreinttColors {
  primary,
  secondary,
  tertiary,
}

export const empreinttThemeInstance = {
  palette: {
    primary: {
      main: colors['primary-500'],
      light: colors['primary-400'],
    },
    background: {
      default: 'rgba(0,0,0,0)',
    },
    secondary: {
      main: colors['secondary-500'],
      light: colors['secondary-400'],
      contrastText: '#ffcc00',
    },
    tertiary: {
      main: colors['tertiary-500'],
      light: colors['tertiary-400'],
      contrastText: colors['tertiary-100'],
    },
    grey: {
      100: colors['grey-100'],
      200: colors['grey-200'],
      300: colors['grey-300'],
      600: colors['grey-600'],
      700: colors['grey-700'],
      800: colors['grey-800'],
    },
    link: {
      main: colors['tertiary-500'],
      light: colors['tertiary-400'],
    },
    error: {
      main: '#E54545',
      200: '#F7C7C7',
    },
    warning: {
      main: '#F2AC49',
    },
    success: {
      main: '#41D980',
      200: '#C6F4D9',
    },
    info: {
      main: '#2196F3',
      light: '#E8F4FD',
    },
    common: {
      white: '#FFFFFF',
    },
    divider: colors['grey-300'],
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Nunito',
    h1: {
      fontSize: '32px',
      lineHeight: '56px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '26px',
      lineHeight: '44px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '41px',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '22px',
      lineHeight: '37px',
    },
    h5: {
      fontSize: '18px',
      lineHeight: '30px',
      fontWeight: 'normal',
    },
    subtitle1: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      lineHeight: '120%',
      fontWeight: 'normal',
    },
    subtitle2: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      lineHeight: '150%',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      lineHeight: '23px',
      letterSpacing: '0.05em',
    },
    body2: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      lineHeight: '150%',
      letterSpacing: '1.5px',
      fontWeight: 'normal',
    },
    caption: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      lineHeight: '150%',
    },
    overline: {
      fontFamily: 'Roboto',
      fontSize: '10px',
      letterSpacing: '1.5px',
      fontWeight: 'normal',
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  // Replacing all shadows by the one we define.
  // @ts-ignore
  shadows: ['none', ...Array(24).fill('2px 2px 8px rgba(0, 0, 0, 0.13)')],
  overrides: {},
};

// @ts-ignore
export type EmpreinttThemeType =
  // @ts-ignore
  Omit<Theme, 'palette' | 'typography' | 'shape' | 'shadows'> &
    typeof empreinttThemeInstance;

// Due to the fact we're not respecting shadows format
// @ts-ignore
export const empreinttTheme = createTheme(empreinttThemeInstance);

export const EMPREINTT_OBJECTS_HIGHLIGHT_COLOR = {};
