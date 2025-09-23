import MobileDetect from "mobile-detect";

export const callLater = (callback, delay = 100) => {
  return setTimeout(callback, delay);
};

export const isMobile = () => {
  var mobileDetect = new MobileDetect(window.navigator.userAgent);
  return mobileDetect.mobile();
};

export const isLocal = () => {
  return !/^h/.test(document.location.toString());
};

export const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const openLink = (link) => {
  window.open(link, "_blank");
};

export const getVkUrl = (purl, ptitle, pimg) => {
  var url = "http://vk.com/share.php?";
  if (purl) {
    url += "url=" + encodeURIComponent(purl);
  }
  if (ptitle) {
    url += "&title=" + encodeURIComponent(ptitle);
  }
  if (pimg) {
    url += "&image=" + encodeURIComponent(pimg);
  }
  url += "&noparse=true";

  return url;
};

export const getTgUrl = (purl) => {
  var url = "https://telegram.me/share/url?";
  if (purl) {
    url += "url=" + encodeURIComponent(purl);
  }
  return url;
};

export const downloadLink = (link, name) => {
  let a = document.createElement("a");
  a.href = link;

  if (!name) {
    name = link.substr(link.lastIndexOf("/") + 1);
    if (name.indexOf("?") >= 0) {
      name = name.substr(0, name.indexOf("?"));
    }
  }

  a.download = name;
  a.click();
};
