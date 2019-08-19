/**
 * Created by Administrator on 2017/12/26.
 */
export const requestParam = function (keyValue) {
  var search = location.href.substring(location.href.indexOf("?")+1);
  var arr = search.split("&");
  for (var i = 0; i < arr.length; i++) {
      var ar = arr[i].split("=");
      if (ar[0] == keyValue) {
          if (unescape(ar[1]) == 'undefined') {
              return "";
          } else {
              return unescape(ar[1]).replace("#/","");
          }
      }
  }
  return "";
}
