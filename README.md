`@hungry/bulma-theme`
===

All variables from [`bulma`](https://bulma.io/), exported as `typescript` function with customization and interpretation abilities.
Variables are extracted via [`@hungry/sass-ts-theme-creator`](https://github.com/hungry-consulting/sass-ts-theme-creator).

[Docs](https://hungry-consulting.github.io/bulma-theme/index.html)

### Real usage scenario
* [@hungry/bulma-element](https://github.com/hungry-consulting/bulma-element)
* [@hungry/bulma-styled-theme](https://github.com/hungry-consulting/bulma-styled-theme)

### Why
* to easily customize any sass framework without guessing all variables and relation between them
* have a `mappable` theme, where you can treat any part of theme as separate computation to improve soundness of code and modularity

### How it works
* it has two parts, `runtime` and `build time`, runtime part is used for example for `styled-components` and evaluating final values, build time, is required to provide `sass` variables thru `sass-var-loader`. All you have to do is to define a theme - rest would happen in `auto-magic` manner.

### What is required for:
#### build part
* use [`webpack-sass-theme-loader`](https://github.com/hungry-consulting/webpack-sass-theme-loader) to provide overriding to your `bulma theme`

#### Defining a custom theme

### Overriding
```ts
import { theme as bulmaTheme, color, ThemeOverriding } from '@hungry/bulma-theme'

const overrideColors: ThemeOverriding = (defaultTheme) => ({
  ...defaultTheme,
  grey: '#8c9b9d',
  greyLight: '#a9afb7',
  greyLighter: '#dee2e5',
  orange: '#e67e22',
  yellow: '#f1b70e',
  green: '#2ecc71',
  turquoise: '#1abc9c',
  blue: '#3498db',
  purple: '#8e44ad',
  red: '#e74c3c',
  whiteTer: '#ecf0f1',
  yellowInvert: '#fff',
  primary: '#34495e',
})

const overrideFonts: ThemeOverriding = defaultTheme => ({
  ...defaultTheme,
  familyMonospace: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  familySansSerif: '"Inconsolata", "Consolas", "Monaco", monospace',
})

const overrideNavbar: ThemeOverriding = defaultTheme => ({
  ...defaultTheme,
  navbarHeight: '4rem',
  navbarItemColor: defaultTheme.whiteTer,
  navbarItemHoverColor: defaultTheme.primary,
  navbarItemHoverBackgroundColor: 'transparent',
  navbarItemActiveColor: defaultTheme.primary,
  navbarDividerBackgroundColor: defaultTheme.greyDarker, // divider color?
  navbarDropdownArrow: defaultTheme.white,
  navbarDropdownItemColor: defaultTheme.primary,
  navbarDropdownItemHover: 'transparent',
  navbarDropdownItemActiveBackgroundColor: 'transparent',
  navbarDropdownItemActiveColor: defaultTheme.primary,
  navbarDropdownBorderTop: `1px solid ${defaultTheme.greyDarker}`
})

const overrideButton: ThemeOverriding = defaultTheme => {
  const primaryDarken =
    color(defaultTheme.primary)
      .darken(0.05)
      .hex()

  return ({
    ...defaultTheme,
    buttonColor: defaultTheme.primary,
    buttonHoverColor: primaryDarken,
    buttonFocusColor: primaryDarken,
    buttonActiveColor: primaryDarken,
  })
}

const overrideText: ThemeOverriding = defaultTheme => {
  const primary =
    color(defaultTheme.primary)

  return ({
    ...defaultTheme,
    text: defaultTheme.primary,
    textLight: primary.lighten(0.1).hex(),
    textStrong: primary.darken(0.05).hex(),
  })
}

const overrideCore: ThemeOverriding = defaultTheme => ({
  ...defaultTheme,
  borderWidth: '10px',
  bodySize: '15px',
  titleWeight: 500,
  subtitleWeight: 400,
  size_7: '.85em',
  footerBackgroundColor: defaultTheme.whiteTer,
})

export const theme = bulmaTheme
  .map(overrideColors)
  .map(overrideFonts)
  .map(overrideNavbar)
  .map(overrideButton)
  .map(overrideText)
  .map(overrideCore)
```

### Attaching to `loader` 
It is used in  build time to provide theme variables overriding.
You have to pass exported function from your custom theme to `webpack-sass-theme-loader. More details [here](https://github.com/hungry-consulting/webpack-sass-theme-loader).