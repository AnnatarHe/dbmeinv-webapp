// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  root: 'src',
  mount: {
    /* ... */
  },
  plugins: [
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-react-refresh',
    './plugins/snowpack-graphql-tag'
  ],
  packageOptions: {
    knownEntrypoints: [
      'react-is'
    ]
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js'
  },
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html'
    }
  ],
  buildOptions: {
    out: './public/'
  },
  alias: {
    AthenaComponents: './src/components'
  },
  // env: {
  //   NODE_ENV: process.env.NODE_ENV
  // }
}
