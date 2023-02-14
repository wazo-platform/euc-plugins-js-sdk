const webpack = require('webpack');

async function softphonePlugin(context, opts) {
  return {
    name: 'softphone-plugins',
    configureWebpack(config, isServer, utils, content) {
      return {
        resolve: {
          fallback: {
            assert: require.resolve("assert"),
            buffer: require.resolve('buffer'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
            http: require.resolve('stream-http'),
            stream: require.resolve('stream-browserify'),
            zlib: require.resolve('browserify-zlib'),
          }
        },

        plugins: [
          new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
          }),
        ],

        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            }
          ],
        },
      }
    },
  };
}

module.exports = softphonePlugin;
