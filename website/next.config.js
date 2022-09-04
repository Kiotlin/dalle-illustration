const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.js',
    unstable_staticImage: true,
    unstable_flexSearch: true
})

module.exports = withNextra();