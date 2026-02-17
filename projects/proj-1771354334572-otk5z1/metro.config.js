const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('glb');

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-glb-transformer'),
};

module.exports = defaultConfig;