module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class',
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: [{
      'bloodyDracula': {
        "primary": "#ff5555",
        "primary-focus": "#ff3b3b",
        "primary-content": "#1d1e25",
        "secondary": "#b9ffb3",
        "secondary-focus": "#8aff80",
        "secondary-content": "#1d1e25",
        "accent": "#ffffb3",
        "accent-focus": "#ffff80",
        "accent-content": "#1d1e25",
        "neutral": "#22212c",
        "neutral-focus": "#1d1e25",
        "neutral-content": "#d5ccff",
        "base-100": "#302f3d",
        "base-200": "#22212c",
        "base-300": "#1d1e25",
        "base-content": "#d5ccff",
        "info": "#2094f3",
        "success": "#009485",
        "warning": "#ff9900",
        "error": "#ff5724"
      }
    }],
    base: true,
    utils: true,
  }
}
