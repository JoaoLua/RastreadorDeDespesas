module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // 1. Configuração do Expo com a fonte de importação do NativeWind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      
      // 2. O NativeWind v4 deve estar AQUI (nos PRESETS), e não em plugins
      "nativewind/babel",
    ],
    plugins: [
      // Configuração do Module Resolver (para usar @/)
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src", // Ajustado para apontar para a src na raiz
          },
        },
      ],
      
      // Reanimated deve ser sempre o último plugin
      "react-native-reanimated/plugin",
    ],
  };
};