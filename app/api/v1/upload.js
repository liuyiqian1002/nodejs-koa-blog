const qiniu = require('qiniu')
const ACCESS_KEY = '-QAgjxwTS3I1SYT76dyOR9nXoHQT09FhLRuW_PLh';
const SECRET_KEY = 'Az5IM_xpADvKBxfEpiiY4PhlDRVGc9c-ieKDk2wI';
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

const { Auth } = require('@middlewares/auth');
const AUTH_ADMIN = 16;

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const Router = require('koa-router')

const router = new Router({
    prefix: '/api/v1'
})

// 创建回复
router.post('/upload/token', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // console.log('mac', mac)
    const options = {
        scope: 'qqinns',
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        expires: 7200
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    ctx.response.status = 200;
    const data = {
        token: putPolicy.uploadToken(mac)
    }
    // console.log(data,'data')
    ctx.body = res.json(data)
})

module.exports = router

