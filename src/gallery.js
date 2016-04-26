'use strict';

define('gallery', function() {
  var overlayGallery = document.querySelector('.overlay-gallery');
  var overlayGalleryClose = overlayGallery.querySelector('.overlay-gallery-close');
  var overlayGalleryPreview = overlayGallery.querySelector('.overlay-gallery-preview');
  var overlayGalleryPrev = overlayGallery.querySelector('.overlay-gallery-control-left');
  var overlayGalleryNext = overlayGallery.querySelector('.overlay-gallery-control-right');

  var previewNumberCurrent = overlayGallery.querySelector('.preview-number-current');
  var previewNumberTotal = overlayGallery.querySelector('.preview-number-total');
  var overlayGalleryPhoto = new Image();


  var gallery = document.querySelector('.photogallery');
  var galleryImgList = gallery.querySelectorAll('.photogallery-image > img');
  var numberImg = 0;
  var galleryImgListSrc = [];

  var showGallery = function() {
    for (var i = 0; i < galleryImgList.length; i++) {
      galleryImgList[i].dataset.num = [i];
      galleryImgListSrc.push(galleryImgList[i].getAttribute('src'));
    }
    overlayGallery.classList.remove('invisible');
    overlayGalleryPreview.appendChild(overlayGalleryPhoto);
  };

  var _showPhoto = function(num) {
    overlayGalleryPhoto.src = galleryImgListSrc[num];
  };

  var _showNumberCurrent = function(num) {
    previewNumberCurrent.innerHTML = +num + 1;
    previewNumberTotal.innerHTML = galleryImgListSrc.length;

    if (numberImg < 1) {
      overlayGalleryPrev.classList.add('invisible');
    }
    if (numberImg > galleryImgList.length - 2) {
      overlayGalleryNext.classList.add('invisible');
    }
    if (numberImg > 0 && numberImg < galleryImgList.length - 1) {
      overlayGalleryPrev.classList.remove('invisible');
      overlayGalleryNext.classList.remove('invisible');
    }
  };

  var _onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      _hideGallery();
    }
  };

  var _hideGallery = function() {
    overlayGallery.classList.add('invisible');
    overlayGalleryPhoto.src = '';
    overlayGalleryPrev.removeEventListener('click', _tooglePhoto);
    overlayGalleryNext.removeEventListener('click', _tooglePhoto);
    overlayGalleryClose.removeEventListener('click', _hideGallery);
    window.removeEventListener('keydown', _onDocumentKeyDown);
  };

  var _tooglePhoto = function(evt) {
    if (evt.target.classList.contains('overlay-gallery-control-right')) {
      numberImg++;
      _showPhoto(numberImg);
      _showNumberCurrent(numberImg);
    } else {
      numberImg--;
      _showPhoto(numberImg);
      _showNumberCurrent(numberImg);
    }
  };

  gallery.addEventListener('click', function(evt) {
    if (evt.target.parentNode.classList.contains('photogallery-image')) {
      galleryImgListSrc = [];
      numberImg = evt.target.dataset.num;
      showGallery();
      _showPhoto(numberImg);
      _showNumberCurrent(numberImg);

      overlayGalleryPrev.addEventListener('click', _tooglePhoto);
      overlayGalleryNext.addEventListener('click', _tooglePhoto);
      overlayGalleryClose.addEventListener('click', _hideGallery);
      window.addEventListener('keydown', _onDocumentKeyDown);
    }
  });

  return {
    showGallery: showGallery
  };

});
