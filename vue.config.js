// vue.config.js
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/donashare-front/" // GitHub 저장소 이름을 넣으세요
      : "/",
};
