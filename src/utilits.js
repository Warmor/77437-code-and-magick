'use strict';

define('utilits', function() {
// Получает Json отзывов с сервера
  var callServer = function(callback, url) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(evt) {
      var reqestObj = evt.target;
      var response = reqestObj.response;
      var loadedData = JSON.parse(response);
      callback(loadedData);
    };
    xhr.open('GET', url);
    xhr.send();
  };

  return {
    callServer: callServer
  };
});
