
const configureMiddleware = require('@nara.platform/storybook/storyConfig/configureMiddleware');
const proxy = require('http-proxy-middleware');


module.exports = configureMiddleware(router => {
  //
  // for local
  // router.use('/api/timecard', proxy({
  //   target: 'http://localhost:9111',          // mock
  //   pathRewrite: { '/api/timecard': '/' },
  //
  //   secure: false,
  //   crossOrigin: true,
  // }));

  // for dev - 수정금지, 로컬설정 필요 시 상단에 설정 추가해서 오버라이딩
  router.use('/api', proxy({
    target: 'http://34.84.99.247',
    secure: false,
    crossOrigin: true,
  }));
});
