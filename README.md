# 高级Web课程项目 Express 服务器

## 数据库接口
### 用户部分
1. __注册__   
URL：`/signup?username=***&password=***`    
前端：用户名、密码    
数据库：查询用户信息表，存入新用户数据  
后端：返回新用户 ID 或返回 -1 (重名用户，注册失败)        

* __登陆__
URL：`/login?username=***&password=***`    
前端：用户名、密码    
数据库：查询用户信息表
后端：返回用户 ID 或返回 -1 (用户名或密码错误，登陆失败)        

* __查看用户信息__  
URL：`/users/viewuser?userid=***`   
前端->后端：用户ID  
数据库：根据用户ID搜索用户信息表  
后端->前端：返回用户名、头像url，或返回-1（用户不存在）  

* __更换头像__  
URL: `/users/newavatar?userid=***&avatar=<avatar_url>`  
前端-->后端：图片URL  
数据库：更新用户信息表（存用户头像的url）  

* __修改密码__  
URL： `/users/newpassword?userid=***&password=***&newpassword`  
前段：用户ID、旧密码、新密码  
数据库：查找密码是否匹配，更新用户密码  
后端：返回1（修改成功），返回-1（旧密码错误，修改失败）  

### 景点部分
1. __查看景点信息__  
URL：`/sight/viewsight?sightid=***`  
前端：景观ID  
数据库：查找相应景点的所有信息  
后端：返回景点信息，或-1（无此景点）  

* __景点关键词搜索__
URL：`/sight/search?keyword=***`  
前端：关键词  
数据库：查找包含关键词的景点名称，返回景点ID  
后端：返回景点ID数组，或-1（无匹配项）  
eg：`search?keyword=博物馆`  

* __景点收藏数、足迹数、心愿单数、评分刷新__  
URL：  
`/calfav?sightid=***`    
`/calwish?sightid=***`  
`/calstep?sightid=***`  
`/calgrade?sightid=***` 
前端：景点ID  
数据库：从收藏表、足迹表、心愿单表、评分表中统计收藏数、足迹数、心愿单数、评分，并更新至景点信息  
后端：返回收藏数、足迹数、心愿单数、评分，或-1（无此景点）  

* __查询景点评论__   
URL：`/sight/commentlist?sightid=***`  
前端：景观ID  
数据库：查找包含景观ID的评论ID和时间戳  
后端：返回评论ID、时间戳列表  

* __获取景点评论__  
URL：`/sight/comment?cmtid=***`
前端：评论ID  
数据库：查找包含评论ID的评论信息  
后端：返回用户ID、时间戳、评论内容  

* __查询景点媒体__  
URL：`/sight/mediaist?sightid=***`  
前端：景观ID   
数据库：查找包含景观ID的时间戳和媒体ID列表  
后端：返回媒体ID、时间戳列表  

* __获取景点媒体__  
URL：`/sight/media?mediaid=***`  
前端：媒体ID  
数据库：查找包含媒体ID的媒体信息  
后端：返回用户ID、时间戳、媒体URL  

### 用户景点交互部分
1. __收藏、心愿单、足迹__  
URL：  
`/user/newfav?userid=***&sightid=***&type=***`  
`/user/newwish?userid=***&sightid=***&type=***`  
`/user/newstep?userid=***&sightid=***&type=***`  
前端：用户ID、景观ID、操作类型（1添加，0取消）  
数据库操作：检查是否存在该用户和景点；根据操作类型添加或删除收藏、心愿单、足迹表中的数据；计算当前景点收藏、心愿单、足迹数，更新景点信息表中信息  

* __评分__  
URL：`/user/newgrade?userid=***&sightid=***&grade=***`  
前端：用户ID、景观ID、评分  
数据库操作：检查是否存在该用户和景点；检查是否已评分，如果已评分，更新分数，如果未评分，添加分数；计算当前景点平均分、评分人数，更新景点信息表中信息  
后端：返回当前景点平均分、评分人数，或-1（不存在该用户），或-2（不存在该景点）  

* __添加评论__  
URL：`/user/newcomment?userid=***&sightid=***&timestamp=***&comment=***`  
前端：用户ID、景观ID、时间戳、评论  
数据库操作：检查是否存在该用户、景观，添加评论  
后端：返回评论ID，或-1（不存在该用户），或-2（不存在该景点）  

* __添加媒体__  
URL：`/user/newmedia?userid=***&sightid=***&timestamp=***&mediaurl=***&mediaurl=***&mediaurl=***`  
前端：用户ID、景观ID、时间戳、媒体URL列表  
数据库操作：检查是否存在该用户、景观、添加媒体URL  
后端：返回媒体ID列表，或-1（不存在该用户），或-2（不存在该景点）  

## 参考资料
1. http://blog.csdn.net/yourlin/article/details/48268361
* http://lbsyun.baidu.com/
* https://www.npmjs.com/package/oracledb
* https://github.com/oracle/node-oracledb/blob/master/doc/api.md
* http://www.tuicool.com/articles/JfqYN3I
* http://www.cnblogs.com/stone_w/p/4794747.html
* http://enable-cors.org/server_expressjs.html
* http://www.tuicool.com/articles/ENBRju
* http://www.2cto.com/database/201310/251006.html
* https://cnodejs.org/topic/56067a16272b724e5efefcce
* http://thejackalofjavascript.com/architecting-a-restful-node-js-app/