'use strict';

define('render-gallery', ['./gallery'], function(Gallery) {

  var photogallery = document.querySelector('.photogallery');
  var photogalleryImgList = document.querySelectorAll('.photogallery-image > img');

  var overlay = {
    gallery: document.querySelector('.overlay-gallery'),
    galleryClose: document.querySelector('.overlay-gallery-close'),
    galleryPreview: document.querySelector('.overlay-gallery-preview'),
    galleryPrev: document.querySelector('.overlay-gallery-control-left'),
    galleryNext: document.querySelector('.overlay-gallery-control-right'),
    galleryNumberCurrent: document.querySelector('.preview-number-current'),
    galleryNumberTotal: document.querySelector('.preview-number-total'),
    galleryListSrc: []
  };

  for (var i = 0; i < photogalleryImgList.length; i++) {
    overlay.galleryListSrc.push(photogalleryImgList[i].getAttribute('src'));
  }

  var myGallery = new Gallery(overlay);

  photogallery.addEventListener('click', function(evt) {
    if (evt.target.parentNode.classList.contains('photogallery-image')) {
      evt.preventDefault();
      myGallery.setHash(evt.target.getAttribute('src'));
    }
  });

  window.addEventListener('hashchange', function() {
    myGallery.getHash(location.hash);
  });

  myGallery.getHash(location.hash);
});
