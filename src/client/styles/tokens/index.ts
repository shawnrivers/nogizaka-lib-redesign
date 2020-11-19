import { useTheme as useEmotionTheme } from '@emotion/react';
import { BORDER_RADIUS } from './borderRadius';
import { BREAK_POINTS } from './breakPoints';
import {
  ThemeKey,
  ColorTheme,
  LIGHT_COLOR_THEME,
  DARK_COLOR_THEME,
} from './colors';
import { Elevation, ELEVATION_LIGHT, ELEVATION_DARK } from './elevation';
import { SIZES } from './sizes';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

export type Theme = {
  key: ThemeKey;
  colors: ColorTheme;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  borderRadius: typeof BORDER_RADIUS;
  elevation: Elevation;
  breakPoints: typeof BREAK_POINTS;
  sizes: typeof SIZES;
};

export const commonStyles: Omit<Theme, 'key' | 'colors' | 'elevation'> = {
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  breakPoints: BREAK_POINTS,
  sizes: SIZES,
};

const lightTheme: Theme = {
  key: 'light',
  colors: LIGHT_COLOR_THEME,
  elevation: ELEVATION_LIGHT,
  ...commonStyles,
};

const darkTheme: Theme = {
  key: 'dark',
  colors: DARK_COLOR_THEME,
  elevation: ELEVATION_DARK,
  ...commonStyles,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const useAppTheme = () => useEmotionTheme();