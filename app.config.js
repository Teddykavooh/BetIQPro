export default {
  expo: {
    name: "BetIqPro",
    slug: "betiqpro",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FEF202",
      },
      package: "com.betiqprohub.betiqpro",
    },
    // native to android
    // androidStatusBar: {
    //   backgroundColor: "#FEF202",
    //   translucent: false,
    // },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "f9389e27-319f-4a3c-b943-0dace3b79c11",
      },
    },
  },
};
