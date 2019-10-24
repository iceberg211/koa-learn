
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middleware/auth')

/**
 * 小程序登陆流程，在小程序中登陆然后获取到code, 
 * 发送到微信code2session接口，获取openId,然后根据openId进行用户存储
 */
class WXManager {
  static async codeToToken(code) {
    // code 小程序生成 微信
    // openid 唯一标识，
    // 通过微信服务来确定
    // unionid会相同，跨多个小程序会使用
    // appId和appsecret
    const url = `${global.config.wx.loginUrl}?appid=${global.config.wx.appId}&&secret=${global.config.wx.appSecret}&&js_code=${code}&&grant_type=authorization_code`;

    const result = await axios.get(url)

    if (result.status !== 200) {
      throw new global.errs.AuthFailed("openid获取失败");
    }

    const errCode = result.data.errcode
    const errMsg = result.data.errmsg
    if (errCode) {
      throw new global.errs.AuthFailed("openid获取失败: " + errMsg)
    }

    // opedId
    // 建立档案 user uid
    // openId

    // 判断数据库是否存在微信用户 opendid
    let user = await User.getUserByOpenid(result.data.openid);
    // 如果不存在，就创建一个微信小程序用户
    if (!user) {
      user = await User.createUserByOpenid(result.data.openid);
    }
    // 颁发令牌，普通用户
    return generateToken(user.id, Auth.AUSE)
  }
}

module.exports = {
  WXManager
}