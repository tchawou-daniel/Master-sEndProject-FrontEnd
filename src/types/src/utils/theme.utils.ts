export type ThemeType = {
  colors: Record<string, { hex: string, rgb: [number, number, number] }>,
};

export const theme: ThemeType = {
  colors: {
    white: {
      hex: '#FFFFFF',
      rgb: [255, 255, 255],
    },
    black: {
      hex: '#000000',
      rgb: [0, 0, 0],
    },
    grey: {
      hex: '#F0F0F0',
      rgb: [240, 240, 240],
    },
    primary_main: {
      hex: '#FFBF00',
      rgb: [255, 191, 0],
    },
    primary_light: {
      hex: '#FFDD67',
      rgb: [255, 221, 103],
    },
    secondary_main: {
      hex: '#663C00',
      rgb: [102, 60, 0],
    },
    secondary_light: {
      hex: '#7F4A00',
      rgb: [127, 74, 0],
    },
    tertiary_main: {
      hex: '#6A35FF',
      rgb: [106, 53, 255],
    },
    tertiary_light: {
      hex: '#856BFF',
      rgb: [133, 107, 255],
    },
  },
};
