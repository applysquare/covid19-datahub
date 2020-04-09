Thank you for your support. This page is a co-operate template.Please submit the information according to the format.   
感谢您对信息建设的支持，本页面为信息共建模版。请按照模版格式提交信息，在审核后直接汇入数据及资讯库。

If you have any data, Please contribute with illustration below.  
如果您想贡献疫情相关的数据，请参照下列说明提交。

***

**一、文件存放路径说明**

| Path     | Name         | Description  |
| ------------- |:-------------:| -----:|
| area     | 国家地区 | 储存国家地区信息 |
| article      | 资料库  |  储存各种整理/汇总/加工后的资料，分主题存放 |
| article/airline     | 航班信息  |  各航空公司的政策、航线新闻、机票动向 |
| article/case  | 疫情案例(日记)  |  各类疫情阶段的见闻、纪实、居家隔离或者回国的记录，给人真实案例作为参考 |
| article/institute/{{countryCode}} | 某个国家院校的学习发展应对政策  |  单个国家存放院校学习发展应对政策文件的位置 |
| article/policy  | 政策分析  |  各类针对政策的解读分析，各国、各类政策汇总 |
| article/resource-and-aid  | 资源援助  |  各类针对疫情的援助信息、资源汇总、求助电话 |
| article/tutorial | 指南 |  各类针对疫情如何应对突发事件、保护个人安全、处理院校与学业的的应对指南 |
| article/visa| 签证信息 |  各类针对疫情签证变化的汇总 |
| article/learning|   学习资源 |  对疫情阶段的学习技巧与学习资源汇总，内部一条数据是一篇文章 |
| institute/{{countryCode}} | 某个国家院校数据    |   单个国家存放院校的位置 |
| qa | 问答   |  整理对提问的回答，一条数据为一个主题(多个问答)|
| update | 资讯   |  未经加工的、高频的新闻动态通知公告，内部按月份储存 |
| update/YYYY-MM | 某月资讯   |  当前月份的新闻动态通知公告 |

***

**二、院校结构化数据**

院校文件yml格式，以slug命名，存放在对应的路径：institute/{{countryCode}}  

| Field     | Description         | Example  |
| ------------- |:-------------:| -----:|
| slug     | 学校的标识，格式：国家代码-学校官网主域名,，可点击定义好的<a href="http://example.com/" title="学校slug">查找| us-mit |

