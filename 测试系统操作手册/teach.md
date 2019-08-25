# 测试框架操作手册 1.0

## 前提说明 
+ 目前前后台测试框架整体体系还未完全建成，测试仅限于本地测试项目
+ 需要Katalon插件，请在FireFox直接中安装
+ 需要安装FireFox浏览器驱动GeckoDriver <a href='https://blog.csdn.net/qq_42543250/article/details/81290876'>参考</a> （建议浏览器和驱动均下载最新版 防止程序无法运行）
+ 拉取项目之后不建议修改项目配置防止影响程序运行。<a href='https://gitee.com/swust_huizhuoli/uiTest'>项目地址</a>

## 一、参数配置
根据个人实际电脑配置，请先调整 /resources/application.properties文件中的参数

| 参数  | 参数值 |  描述  | 可选值|
|-------|:---:|-----------|-------:|
| driver.type | firefox(默认值) | 浏览器类型| chorme|
| test.baseurl | URL  | 测试网站地址   |
| gecko.location | D:\\webGeckDriver\\geckodriver.exe  | 本地驱动所在路径   |
| bugout.img.path  |d:/   |  报错截图保存地址    |
| driver.location |E:\\\Program Files\\\MozillaFirefox/Firefox.exe   |  浏览器所在地址   |

## 二、操作步骤

### 1.录制脚本
先进入要测试的网站，点击firefox右上方的Katalon插件图标，通过New按钮创建测试 点击Record开始录制脚本。
![录制示例](../gif/luzhi.gif)

### 2.添加断言(可选)
在录制过程中，可以设置网页中某一些文本作为相关动作是否成功的判定标准。设置断言的方式是选中文本之后，右键选择assertText、assertValue。就会有类似Assertions.assertEquals("插件生成指南", driver.findElement(By.linkText("插件生成指南")).getText())这样的代码生成 其中"插件生成指南"为你选中的文本
 
### 3.导出脚本
在Katalon的编辑页面中点击Export按钮，并选择Java(WebDriver+Juit)类型。之后在Eclips中修改编辑代码

### 4.修改代码，导入正确的依赖包使用配置的Maven方法
浏览器脚本生成的代码与我们实际的需要存在差别。除了更改的class名称等，由于生成的脚本代码使用的是Juint4，而本项目配置为Juint5。所以主要还需要进行以下修改

+  将@Before 变为@BeforeAll 并导入相应的api(一般修改之后是自动导入的)
+  将@After 变为@AfterAll 并导入相应的api(一般修改之后是自动导入的)

*****
<span style='font-size:32px'>说明</span>:@BeforeAll是在所有测试用例执行之前进行的操作，一般都是开启驱动并配置相关属性。本项目中已经在所有子模块运行之前做了处理，参考/com.swust.st.uiTest/BaseTestCase.java。所以一般不需要在手动载入并启动驱动，如果有其他功能需要在开始测试之前实现，请自行添加。@AfterAll的效果与BeforeAll类似，在测试用例全部执行完成之后运行，可以使用driver.quit()退出驱动，关闭脚本开启的页面。更多方法请查看 <a href='https://danielhit.gitbooks.io/junit-5-user-guide-cn/content/'>中文文档</a>
*****
 

## 三、你可能会遇到的问题

### 3.1 测试用例导入失败
Juit5有两种导入测试用例的方法
一是 @Test编辑单个用例
 二是使用api @ParameterizedTest同时接收多个测试测试用例
<pre>
<code>
@ParameterizedTest  
	 @DisplayName("参数化文件测试")
		@CsvFileSource(resources = "/createGuideData.csv",  numLinesToSkip = 1)
</code>
</pre>

@CsvFileSource为引入一个csv文件，以其中填写的内容作为测试内容，numLinesToSkip = 1为从csv表格中的第二行开始读取数据

PS:csv文件注意生成方式，最好通过需要选择文件类型为 CSV(逗号分隔)(*.csv)来生成。直接手动修改成csv可能会有问题。另外如果你遇到这部分程序出错时，请检查各项API 是否import正确，可参考/com.swust.st.uiTest.testAggregate/createGuideByParams.java

### 3.2 关于断言
Katalon录制的断言assertEquals，使用的是比较老旧的判定。在该程序中需要改为Assertions.assertEquals，这是你需要和修改@BeforeAll一样导入它对应的Api(import static org.junit.jupiter.api.Assertions.*;)另外请注意 参数中的类型选择(string、int、chart..)肯定是需要与你传入值对应的毕竟不是js

### 3.3 代码修改没问题，运行过程中却报错怎么办
如果你确定你的代码逻辑上没有问题的话，那么问题一般都是没有找到元素造成的。也就是说你录制的时候定位的元素，可能在执行测试实际用例的时候找不到了。

这个问题很常见，通常有三种解决方法
1. 设置一个停留时间
> 我们在录制的时候每一步操作之间是有时间间隔的，但是生成的代码可不会帮你保留这个时间。所以，当代码中有进行路由跳转这种明显需要时间等待的操作时，最好设置一个等待时间 ，防止续操作找不到对应元素。
2. 换一种定位方式
> 之前讲到我们为了在录制时操作简单一般使用Katalon自带的获取Xpath方式来进行元素定位，但是这种方式不一定能精确的获取我们想要的元素。我们有时需要用driver.findElement(By.id("guideName")等更加精确的查找方式。同时 使用try{}catch{}来进行判定可以帮助我们验证是否真的获取到了某一个元素

3.建议少用Tab键来跳转表单输入
>在录制表单的时候，直接使用Tab来找到找一个输入项，这种做法并不是每一次都能成功。个人感觉Katalon 对于键盘事件的录制有一些不稳定，(其实点击事件也不是每次都能完美的记录，比如曾今遇到过选中一段带有a标签文字作为断言的时候，文段匹配的是该文本前面的一个空格，并记录我点击了该a标签。而当我使用其他普通文本作为断言的时候大多数是没问题的)


## 四、先有的自定义函数

目前系统自带的截图函数：saveScreenSho 用于保存错误截图
| 参数名  |  描述  |是否必填|
|-------|:---:|-----------|-------:|
| functionName |  |是|
| bugImgName | firefox(默认值) |是 |
| contents | 问题描述 |是|

eg：saveScreenShot("createGuide","error","错误验证_插件生成指南输出_" + act);

根据约定自定义函数保存在com.swust.st.uiTest.baseFunc文件中。






    