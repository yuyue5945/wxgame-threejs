const ci = require('miniprogram-ci');
const path = require('path');
const fs = require('fs');

const project = new ci.Project({
  appid: 'wx62b97c93278af4b0',
  type: 'miniGame',
  projectPath: process.cwd(),
  privateKeyPath: path.join(process.cwd(), 'private.key'),
  ignores: ['node_modules/**/*'],
});

async function upload() {
  const version = process.env.VERSION || '1.0.0';
  try {
    const result = await ci.upload({
      project,
      version,
      desc: '来自 GitHub Actions 自动上传',
      setting: {
        es6: true,
        minify: true,
        autoPrefixWXSS: true,
      },
    });
    console.log('Upload success!', result);
  } catch (err) {
    console.error('Upload failed:', err.message || err);
    process.exit(1);
  }
}

upload();
