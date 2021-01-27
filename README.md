## 猫猫的Bot

### 计划实现功能
- [ ] echo
- [x] 直播提醒
- [ ] 复读
- [x] 迫真AI
- [x] 自助禁言
- [ ] 小游戏
- [ ] 信息查询

#### 缺失文件
`/config/index.js`
```
module.exports = {
  config: {
    type: 'cqhttp:http',
    port: 8080,
    server: 'http://localhost:/*PortName*/'
  },
  GroupId: [
    /* QQ Group ID */
  ]
}
```

`/sender/live/list.js`
```
module.exports = {
  '/* Bilibili Stream Number */': '/* Notice */'
}
```