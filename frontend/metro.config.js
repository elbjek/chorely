const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");



module.exports = (() => {
  const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return withNativeWind(config, {input: './global.css'});
})();