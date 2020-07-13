<!-- TOC -->

- [scrollEnhance 🖱️](#scrollenhance-)
    - [简介](#简介)
    - [项目规划](#项目规划)
    - [API 设计](#api-设计)

<!-- /TOC -->

# scrollEnhance 🖱️

## 简介

“滚动增强(scrollEnhance)” 是一款基于 `原生js` 开发的滚动条增强插件，它的的目的就是让滚动条更好用。

通过 `scrollEnhance` 可以实现的功能有：

- 判断元素的可见性：可见的(show)、刚刚显示(justshow)、完全可见(fullshow)、不可见的(hide)。
- 返回吸顶的元素。
- 返回滚动进度。
- 控制滚动事件是否节流。
- 获取滚动条的方向。
- 获取滚动条的状态，开始或者结束。
- 兼容原生滚动条事件的事件对象。
- .....

## 项目规划

> 在当前版本上每修复一个问题或优化一项，次版本号 +1 ～

**当前版本(ver 0.1.1)**

- 判断元素的可见性。
- 返回当前页面滚动的进度。
- 支持 `destroy()` 解除滚动方法。
- 兼容原生滚动条事件的事件对象。

**下一版本(ver 1.0)**

- 加入节流提高性能。
- 支持返回当前屏幕中可见的元素（不含已经卷去的元素，虽然它们也是显示了的）。
- 返回吸顶的元素。
- 获取滚动条的方向。
- 获取滚动条的状态，开始或者结束。

**NEXT 版本**

- 支持特定的局部容器范围。
- 重构返回参数，将所有的状态位置都继承到元素对象本身？
- 通过组合构造函数的方式来重构代码。

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

- `elements`: 要被检查的滚动元素，取值类型有：`String | Array[string] | HTMLEelement | NodeList | HTMLCollection`。
- `thottle` : 是否开启防抖？_预留参数_
- `params` 参数说明：

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
