# uper
A command-line tool for uploading images.

[中文文档](https://github.com/BigLiao/uper.js/blob/master/README-CN.md)

## Features

- Out of the box, uper can automatically upload local images to the cloud and add the URL to clipboard.
- Automatically parse Markdown file and replace local image reference to remote URL reference.
- More the images, you can upload your files to cdn server, now supports *aliyun*, *qiniuyun*.

## Installation

The tool is based on `Node.js`, so your have to install it first.

```sh
# install
npm install -g uper

# if successed
uper --help
```

Now you can use it!

## Usage

Thanks to [sm.ms](https://sm.ms/), we can use it without and configuration. sm.ms as the default image stock, only support images, and upload same image twice will rise a error.

### Upload one file

```sh
uper <FILE_PATH>
```

It's queitly easy to use uper, just run command `uper <FILE_PATH>`, the file will be uploaded and return an URL witch will be add to clipboard automatically.

![屏幕快照 2019-08-10 下午5.49.17](https://cdn.bigliao.com/21c9cd102c820cc7019be1a777ab4e83.png)

### Multiple files

```sh
uper <GLOB_PATTERN>
```

uper supports *globing pattern* so that you can upload multiple files a time。For example, run `uper test/*` can upload all files in test directory：

![屏幕快照 2019-08-10 下午5.59.18](https://cdn.bigliao.com/ec1f1eb3d18cd3e8220a138fc2d1fc5b.png)

```sh
# upload all files in test
uper test/*

# upload cat1.jpg、cat2.jpg、cat3.jpg...
uper test/cat?.jpg

# only images
uper test/*.{jpg,png,gif}
```

Check [bash_globbing_tutorial](https://linuxhint.com/bash_globbing_tutorial/) for more about *globing pattern*。

You can alse use `uper test/* > output.txt` to persist the results.

### Parse Markdown

Uper is very useful when writing Markdown files. By replacing local image references to remote URLs automatically, you can share your Markdown anywhere.

```sh
# parse Markdown
uper -m <MARKDOWN_FILE>
```

Changes after run `uper -m README-CN.md`:

![屏幕快照 2019-08-10 下午8.11.25](https://cdn.bigliao.com/e3d73dc39e97f61d69c1bcb719900cb8.png)