
<!-- TOC -->

- [Scroll-Listen 🖱️](#scroll-listen-)
    - [简介](#简介)
    - [项目规划](#项目规划)
    - [API 设计](#api-设计)

<!-- /TOC -->

# Scroll-Listen 🖱️

## 简介

“滚动监听(Scroll-Listen)” 是一款基于 `原生js` 开发的滚动条监控插件，它可以实时的返回滚动条的位置数据，目标是让滚动更好用。

通过 `Scroll-Listen` 可以实现的功能有：

* 判断元素的可见性：可见的(show)、刚刚显示(justshow)、完全可见(fullshow)、不可见的(hide)。
* 实现基于滚动条位置的进度条。
* 获取滚动条的方向。
* .....


## 项目规划

> 在当前版本上每修复一个问题或优化一项，次版本号 +1 ～

**当前版本(ver 0.1.1)**

- 基于滚动中元素的可见性来赋予特定的行为。
- 返回当前页面滚动的进度。
- 支持 `destroy()` 解除滚动方法。

**下一版本(ver 1.0)**

- 加入节流提高性能。
- 支持特定的局部容器范围。
- 支持返回当前屏幕可见的元素（不含已经卷去的元素，虽然它们也是现实了的）。

## API 设计

使用方式：

```js
var _scroll = scrollListen({
  elements: ["li", ".list", ".box"],
  onScroll: function (params) {},
  thottle: false,
});

_scroll.destroy();
```

* `elements`: 要被检查的滚动元素，取值类型有：`String | Array[string] | HTMLEelement | NodeList | HTMLCollection`。
* `thottle` : 是否开启防抖？*预留参数*
* `params` 参数说明：

```js
{
    event:ScrollEvent,                  //原生滚动条事件对象
    justShow:[],                        //刚刚显示出来
    fullShow:[],                        //完全显示出来
    show:[],                            //显示出来的元素
    hide:[],                            //隐藏掉的元素
    progress:Number,                    //当前滚动条的滚动进度
    value:Number,                       //当前滚动的值
    position:'start | middle | end',    //当前滚动条的位置。
}
```
