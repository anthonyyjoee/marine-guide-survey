module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            // You can define as many aliases as you want.
          },
          root: "./src",
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
