import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: '/',
    dir: join(appInfo.baseDir, '../build'),
  };

  exports.tbConfig = {
    accessKeyId: '',
    secretAccessKey: '',
    endpoint: '', // e.g. https://todo-test-list.cn-hangzhou.ots.aliyuncs.com
    instancename: '' // e.g. todo-test-list
  };
  return exports;
};