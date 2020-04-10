Thank you for your support. This page is a co-operate template.Please submit the information according to the format.   
感谢您对信息建设的支持，本页面为信息共建模版。请按照模版格式提交信息，在审核后直接汇入数据及资讯库。

If you have any data, Please contribute with illustration below.  
如果您想贡献疫情相关的数据，请参照下列说明提交。

***

**一、文件存放路径说明**

| Path     | Name         | Description  |
| :------------- |:-------------|:-----|
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
   
**二、院校页面结构化数据贡献说明**

院校文件yml格式，以slug命名，存放在对应的路径：data/institute/{{countryCode}}，<a href="https://github.com/applysquare/covid19-datahub/blob/master/data/institute/us/us-columbia.yml">示例文件</a>  

| Field     |  Write |         Description         |  Example  |
| :-------------|:-------------|:-------------------------|:------|
| slug     | **必填** |院校标识，格式：国家代码-学校官网主域名,，若不确定可点击定义好的<a href="https://docs.google.com/spreadsheets/d/1rJt3L7ZkI_HCRYnguAdGVhxExvK-wEPYhLpTYT1B9SU/edit?usp=sharing">学校slug</a>查找| us-columbia |
| nameEn     | **必填** | 院校英文名 | Columbia University |
| nameCn     | **必填** | 院校中文名 | 哥伦比亚大学 |
| countryCode     | **必填** | 院校所在国家小写代码，若不确定可点击定义好的<a href="https://docs.google.com/spreadsheets/d/1eZMJ29XtJ_9ozQf-GEJH72fSuSVEiDZMvSYU0RQ3tP0/edit?usp=sharing">国家代码</a>查找，或提取slug里"-"前的前缀    | us |
| website     | 选填 | 院校官网，以http开头 | <a href="http://www.columbia.edu/">示例link</a> |
| stateCn    | **必填** | 院校所在州或二级行政区的中文 | 纽约州 |
| stateEn    | **必填** | 院校所在州或二级行政区的英文 | New York |
| publicOrPrivate     | 选填 | 院校属性，公办：public，私立：private | private |
| coursePolicyLink     | 选填 | 院校应对疫情的学习发展应对政策所在链接 | <a href="https://covid19.columbia.edu/">示例link</a> |
| cover     | 选填 | 院校封面图，可通过申请方图片链接直接调用，示例link中的columbia替换为相应slug掉即可 |  <a href="https://cdn.applysquare.net/a2/institute/columbia/cover_app.jpg">示例link</a> |
| logo     | 选填 | 院校校徽图片，可通过申请方图片链接直接调用，示例link中的columbia替换为相应slug掉即可   | <a href="https://cdn.applysquare.net/a2/institute/columbia/logo.png">示例link</a> |
| numStateCases     | 不填 | 院校所在州或国家一级行政区确诊病例数，留白即可，申请方会有API接口自动调取  |  |
| numStateDailyNewCases     | 不填 | 院校所在州或国家一级行政区新增病例数，留白即可，申请方会有API接口自动调取 |  |
| numStateDeaths     | 不填 | 院校所在州或国家一级行政区死亡病例数，留白即可，申请方会有API接口自动调取 |  |
| numStateCures     | 不填 | 院校所在州或国家一级行政区治愈数，留白即可，申请方会有API接口自动调取 |  |
| courseOperationStatus     | **必填** | 院校运转状态，停课：suspendCourse，网课：onlineCourse，正常：normalCourse，放假：holiday | onlineCourse |
| onlineCourseStartDate     | 选填 | 院校网课开始日期，格式：YYYY-MM-DD | 2020-03-26 |
| onCompusCourseResumeDate     | 选填 | 院校复课日期，格式：YYYY-MM-DD | 2020-09-01 |
   
***  
   
**三、院校最新学习发展应对政策**    
   
文件md格式，以当前发布日期（YYYY-MM-DD）+title命名(title不超过20个字符)，存放在对应的路径：data/article/institute/{{countryCode}}/{{instituteSlug}}，<a href="https://github.com/jianghe1220/covid19-datahub/blob/master/data/article/institute/au/au-adelaide/2020-04-09-14_23_32.md">示例文件</a>     
   
   
| Field     |  Write |         Description         |  Example  |
| :-------------|:-------------|:-------------------------|:------|
| title     | **必填** |  标题，注意：当标题中含有冒号时，应在标题两侧加英文双引号  |  Will my grades be affected by COVID-19？  |
| subtitle     | 选填 |  二级标题，注意：当二级标题中含有冒号时，应在标题两侧加英文双引号  |  For All Students  |
| date     | 选填 |  该项政策的官方发布日期，注意不是当前日期，格式：YYYY-MM-DD  |  2020-04-05  |
| link     | **必填** |  政策所在官网，以http开头  |  <a href="http://www.bu.edu/provost/2020/03/09/remote-teaching-readiness-plan/">示例link</a>  |
| countryCode    | **必填** |  院校所在国家小写代码，若不确定可点击定义好的<a href="https://docs.google.com/spreadsheets/d/1eZMJ29XtJ_9ozQf-GEJH72fSuSVEiDZMvSYU0RQ3tP0/edit?usp=sharing">国家代码</a>查找，或提取instituteSlug里"-"前的前缀  |  us  |
| status     | **必填** |  发布状态，发布：published，草稿：draft，置顶：pinned  |  published  |
| instituteSlug     | **必填** |院校标识，格式：国家代码-学校官网主域名,，若不确定可点击定义好的<a href="https://docs.google.com/spreadsheets/d/1rJt3L7ZkI_HCRYnguAdGVhxExvK-wEPYhLpTYT1B9SU/edit?usp=sharing">学校slug</a>查找| us-columbia |
|      | **必填** |  正文内容，md文本格式  |  <a href="https://github.com/jianghe1220/covid19-datahub/blob/master/data/article/institute/au/au-adelaide/2020-04-09-14_23_32.md">示例文件</a>  |
