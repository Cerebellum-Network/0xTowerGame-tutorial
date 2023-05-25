module.exports = (env, options) => {
  return {
    mode: "production",
    entry: {
      main: "./src",
      sdk: "./games-sdk.js",
    },

    output: {
      publicPath: "/dist/",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  };
};
