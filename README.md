# 高级 Web 课程项目 Express 服务器

## 数据库接口
### 用户部分
* __注册__   
URL：`/user/signup?username=***&password=***`    
前端：用户名、密码    
数据库：查询用户信息表，存入新用户数据  
后端：返回新用户 ID 或返回 -1 (重名用户，注册失败)        
* __登陆__
URL：`/user/login?username=***&password=***`    
前端：用户名、密码    
数据库：查询用户信息表
后端：返回用户 ID 或返回 -1 (用户名或密码错误，登陆失败)        
* __查看用户信息__  
URL：`/user/viewuser?userid=***`   
前端-：用户ID  
数据库：根据用户ID搜索用户信息表  
后端：返回用户名、头像url，或返回 -1（用户不存在）  
* __更换头像__  
URL: `/user/newavatar?userid=***&avatar=<avatar_url>`  
前端：图片URL  
数据库：更新用户信息表（存用户头像的url）  
* __修改密码__  
URL： `/user/newpassword?userid=***&password=***&newpassword`  
前段：用户ID、旧密码、新密码  
数据库：查找密码是否匹配，更新用户密码  
后端：返回1（修改成功），返回 -1（旧密码错误，修改失败）  
* __获取用户收藏、心愿单、足迹列表__  
URL：  
`/user/viewfav?userid=***`     
`/user/viewwish?userid=***`  
`/user/viewstep?userid=***`  
前端：用户ID  
数据库：根据用户I获取收藏、心愿单、足迹中景观ID列表  
后端：景观ID列表  ，或 -1（用户不存在）  

### 景点部分
* __查看景点信息__  
URL：`/sight/viewsight?sightid=***`  
前端：景观ID  
数据库：查找相应景点的所有信息  
后端：返回景点信息，或 -1（无此景点）  
* __景点关键词搜索__
URL：`/sight/search?keyword=***`  
前端：关键词  
数据库：查找包含关键词的景点名称，返回景点ID  
后端：返回景点ID数组，或 -1（无匹配项）  
eg：`/sight/search?keyword=博物馆`  
* __景点列表查询__
URL：`/sight/searchlist?scenelist=***&scenelist=***`  
前端：关键词  
数据库：查找数据库中含有的景点名称，返回景点ID  
后端：返回景点ID数组，或 -1（无匹配项）  
eg：`/sight/searchlist?scenelist=上海博物馆&scenelist=上海自然博物馆` 
* __获取景点标签列表__  
URL：`/tag/search?sightid=***`  
前端：景观ID  
数据库：查找与景观ID相关联的标签ID
后端：返回相关联标签ID列表
* __查看标签__   
URL：`/tag/view?tagid=***&sightid=1`  
前端：标签ID、景观ID   
数据库：查找标签ID信息；统计该标签该景观下人数  
后端：返回标签信息，或 -1（标签ID不存在）   
* __景点收藏数、足迹数、心愿单数、评分刷新__  
URL：  
`/calfav?sightid=***`    
`/calwish?sightid=***`  
`/calstep?sightid=***`  
`/calgrade?sightid=***` 
前端：景点ID  
数据库：从收藏表、足迹表、心愿单表、评分表中统计收藏数、足迹数、心愿单数、评分，并更新至景点信息  
后端：返回收藏数、足迹数、心愿单数、评分，或 -1（无此景点）  
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
* __收藏、心愿单、足迹__  
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
后端：返回当前景点平均分、评分人数，或 -1（不存在该用户），或 -2（不存在该景点）  
* __添加评论__  
URL：`/user/newcomment?userid=***&sightid=***&timestamp=***&comment=***`  
前端：用户ID、景观ID、时间戳、评论  
数据库操作：检查是否存在该用户、景观，添加评论  
后端：返回评论ID，或 -1（不存在该用户），或 -2（不存在该景点）  
* __添加媒体__  
URL：`/user/newmedia?userid=***&sightid=***&timestamp=***&mediaurl=***&mediaurl=***&mediaurl=***`  
前端：用户ID、景观ID、时间戳、媒体URL列表  
数据库操作：检查是否存在该用户、景观、添加媒体URL  
后端：返回媒体ID列表，或 -1（不存在该用户），或 -2（不存在该景点）  
* __添加/删除标签__  
URL: `/tag/newtag?sightid=***&userid=***&tag=***&tagtype=***`  
前端：景观ID、用户ID、标签、标签类型
数据库：判断是否已有该标签，若无则添加该标签；
判断该标签是否已与该景点和用户关联，若无则在标签关系表中建立关系，若有则在标签关系表中取消关系；
重新计算该景点该标签人数、标签关联景点数；若标签关联景点数等于零，输出该标签


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
