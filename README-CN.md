# uper
一个上传图片到云端的命令行工具🔧

## 功能

- 开箱即用的上传功能，一键获取云端URL，结果自动添加到剪贴板
- 一键解析 Markdown 文件，自动替换里面的本地图片路径为 URL
- 上传本地文件到云，目前支持*smms*、*阿里云*、*七牛云*


## 安装

本工具基于 `Node.js`开发，需要安装`Node` 和 `npm`环境。

没有安装的同学可以先去官网下载和安装 [**Node.js**]([https://nodejs.org](https://nodejs.org/))，已经安装过的话直接 `npm install -g uper`就行。

```sh
# 查看 npm 版本
npm -v

# 通过 npm 安装 uper
npm install -g uper

# 安装成功
uper --help
```

## 配置

### 自带smms 图床

感谢 [sm.ms](https://sm.ms/) 提供的免费图床，让我们不需要配置即可使用。

安装好后直接 `uper <IMAGE_PATH>` 即可。

注意 sm.ms 只支持上传图片。


### 上传到自己的云空间
目前支持*阿里云*、*七牛云*。

下面以*七牛云*为例。

没有七牛云的同学可以去[官网](https://www.qiniu.com/)注册一个，每月有 10GB 的免费空间可以使用。但是使用七牛云有一个问题，就是要绑定自己的域名 (这将是配置里的`baseURL`)，七牛云测试域名会自动回收。

然后在`对象存储`中新建一个`bucket`，然后在`个人中心` > `秘钥管理`里设置一个秘钥。

接下来开始配置 uper ，在终端执行`uper config -a`，出现可选的服务器，选第一个`qiniu`，然后按提示输入前面获取的配置项：

![屏幕快照 2019-08-10 下午5.36.55](https://cdn.bigliao.com/8501cb418b586bc31598256941e04ab8.png)

上传成功后自动测试上传一张图片。

配置文件默认存放在 `$HOME/.uperc`里，可以手动编辑配置文件。

你也可以添加多个配置，上传的时候将使用默认配置。

## 使用

### 上传单个文件

```sh
uper <FILE_PATH>
```

使用 uper 非常简单，命令为`uper <file>`，会把 `file` 上传到服务器器然后返回文件的 `URL`，并自动把`URL`添加到剪贴板中。

![屏幕快照 2019-08-10 下午5.49.17](https://cdn.bigliao.com/21c9cd102c820cc7019be1a777ab4e83.png)

### 上传多个文件

```sh
uper <GLOB_PATTERN>
```

uper 支持 *globing pattern* ，可以批量上传多个文件。例如运行`uper test/*`会上传 test 目录下的文件：

![屏幕快照 2019-08-10 下午5.59.18](https://cdn.bigliao.com/ec1f1eb3d18cd3e8220a138fc2d1fc5b.png)

```sh
# 上传 test 目录下的文件
uper test/*

# 上传所有 test 目录内的 cat1.jpg、cat2.jpg、cat3.jpg...
uper test/cat?.jpg

# 只上传图片
uper test/*.{jpg,png,gif}
```

关于 *globing pattern*，可以查看[bash_globbing_tutorial](https://linuxhint.com/bash_globbing_tutorial/)。

你可以用`uper test/* > output.txt` 来保存返回结果。

### 上传 Markdown 图片

uper 是写 Markdown 的好帮手，它可以自动把文档中的本地图片链接替换为云端链接，让你的 Markdown 可以随意分享。

```sh
# 解析 Markdown
uper -m <MARKDOWN_FILE>
```

比如对此文档执行 `uper -m README-CN.md` 的前后对比：

![屏幕快照 2019-08-10 下午8.11.25](https://cdn.bigliao.com/e3d73dc39e97f61d69c1bcb719900cb8.png)

## 后续功能

- 添加支持：腾讯云、亚马逊云
- 添加修改配置命令

