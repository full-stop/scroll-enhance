/**
 * @name scroll-listen
 * @version v0.1
 * @date 2020/07/06
 */

(function (root, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory.bind(this, root);
  } else {
    root.scrollListen = factory.bind(this, root);
  }
})(typeof window != "undefined" ? window : this, function (
  root,
  params,
  callback
) {
  let defaultOptions = {
    elements: "",
    throttle: false,
    onScroll: callback || function () {},
  };

  let getOffset = function (elem) {
    let top = 0;
    while (elem) {
      top += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return top;
  };
  let getWindowSize = function () {
    var docElement =
      document.scrollingElement || document.documentElement || document.body;
    return {
      width:
        window.innerWidth ||
        docElement.clientWidth ||
        docElement.clientWidth ||
        docElement.clientWidth,
      height:
        window.innerHeight ||
        docElement.clientHeight ||
        docElement.clientHeight ||
        docElement.clientHeight,
    };
  };

  let options = Object.assign(defaultOptions, params || {});
  let elements = options.elements;
  let viewSize = getWindowSize();
  let pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  let selects = null;
  let pos = [];

  if ((elements && typeof elements === "string") || elements instanceof Array) {
    selects = document.querySelectorAll(
      elements instanceof Array ? elements.join(",") : elements
    );
  }

  if (elements instanceof NodeList || elements instanceof HTMLCollection) {
    selects = elements;
  }

  if (elements instanceof HTMLElement) {
    selects = [elements];
  }

  if (selects) {
    selects.forEach((element) => {
      pos.push({
        element,
        offsetTop: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });

    pos.sort((elem1, elem2) => elem1.offsetTop - elem2.offsetTop);
  }

  function destory() {
    return root.removeEventListener("scroll", scrollHandle);
  }

  function scrollHandle(event) {
    let _scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let scrollTop = _scrollTop + viewSize.height;
    let availScrollHeight = pageHeight - viewSize.height;
    let percent = scrollTop / availScrollHeight;
    let position = "scrolling";
    let value = _scrollTop;
    let justShow = [];
    let fullShow = [];
    let show = [];
    let hide = [];

    if (percent <= 0) position = "start";
    if (percent >= 0.5 && percent < 0.6) position = "middle";
    if (percent >= 1) position = "end";

    for (let i = 0; i < pos.length; i++) {
      let temp = pos[i];
      let offsetTop = temp.offsetTop;
      let height = temp.height;

      if (scrollTop < offsetTop) {
        hide = pos.slice(i);
        break;
      } else {
        if (offsetTop + height * 0.2 >= scrollTop) justShow.push(temp);
        if (offsetTop + height >= scrollTop) fullShow.push(temp);

        show.push(temp);
      }
    }

    options.onScroll({
      percent,
      position,
      justShow,
      fullShow,
      show,
      hide,
      value,
      event,
    });
  }

  root.addEventListener("scroll", scrollHandle);

  return { destory };
});
