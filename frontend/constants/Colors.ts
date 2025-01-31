/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#1E1A1D";
const tintColorDark = "#f4f4f4";

const darkNavy = '#002642';
const lightNavy = '#2a347a';
const lightBrown ='#f1dba0';
const darkBrown = '#b78c3e'
const lightGray = '#f4f4f4';

const yellowGreen ='#A6C954';
const dunBrown = '#D0C8B3';
const darkMossGreen = '#3D4D19';
const brightRed = '#BC2C1A';

export const Colors = {
  light: {
    text: darkNavy,
    background: lightGray,
    tint: tintColorLight,
    icon: darkNavy,
    tabIconDefault: darkNavy,
    tabIconSelected: darkNavy,
    buttonBackground: darkNavy,
    buttonText: lightGray,
    outlineText: darkNavy,
    borderLight: darkNavy,
    solidButtonText: lightGray,
    backgroundBrown: darkBrown,
    colorLightGreen: yellowGreen,
    colorDarkBrown: darkBrown,
    colorLightBrown: dunBrown,
    colorDarkGreen: darkMossGreen,
    colorNavy: darkNavy,
    colorRed: brightRed
  },
  dark: {
    text: "#f4f4f4",
    background: darkNavy,
    tint: tintColorDark,
    icon: lightGray,
    tabIconDefault: lightGray,
    tabIconSelected: tintColorDark,
    buttonBackground: lightGray,
    buttonText:darkNavy,
    borderDark: lightGray,
    outlineText: lightGray,
    backgroundBrown: lightBrown,
    colorLightGreen: yellowGreen,
    colorDarkBrown: darkBrown,
    colorLightBrown: dunBrown,
    colorDarkGreen: darkMossGreen,
    colorNavy: darkNavy,
    colorRed: brightRed
  },
};
