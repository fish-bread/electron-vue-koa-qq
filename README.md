# electron-vue-qq

一个仿造qq样式的聊天软件

# 目前问题

无法在添加好友后,在home去进行实时更新好友列表,必须重新打开应用

无法创建群,只能进行一对一用户聊天,而且必须双方在线

无法分辨用户新消息与历史消息

# 如何使用

首先分别为electron-vue和koa进行 npm install命令

其次,配置mongoDB数据库,新建一个qq_users数据库,在该数据库下创建user表和userHistory表

启动前后端项目命令都分别在前后端的package.json中
