# electron-vue-qq 禁止商用

一个仿造qq样式的聊天软件

# 目前问题

无法将聊天记录保存在本地

无法创建群,只能进行一对一用户聊天

无法分辨用户新消息与历史消息

无法进行视频通信

无法收藏聊天记录

# 与主要分支区别

可以将图片保存到本地缓存，但是有bug

# 如何使用

首先分别为electron-vue和koa进行 npm install命令

其次,配置mongoDB数据库,新建一个qq_users数据库,在该数据库下创建user表和userHistory表

如何配置mongoDB数据库,请查阅,https://blog.csdn.net/weixin_43405300/article/details/120017878

启动前后端项目命令都分别在前后端的package.json中

# 测试应用

electron-vite dev

# 构筑应用

npm run prebuild && electron-builder --win --config
