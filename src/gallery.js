'use strict';

define('gallery', function() {

  function Gallery() {
    var overlayGallery = document.querySelector('.overlay-gallery');
    var overlayGalleryClose = overlayGallery.querySelector('.overlay-gallery-close');
    var overlayGalleryPreview = overlayGallery.querySelector('.overlay-gallery-preview');
    var overlayGalleryPrev = overlayGallery.querySelector('.overlay-gallery-control-left');
    var overlayGalleryNext = overlayGallery.querySelector('.overlay-gallery-control-right');
    var previewNumberCurrent = overlayGallery.querySelector('.preview-number-current');
    var previewNumberTotal = overlayGallery.querySelector('.preview-number-total');
    var galleryImgList = document.querySelectorAll('.photogallery-image > img');

    var self = this;
    self.galleryImgListSrc = [];
    self.overlayGalleryPhoto = new Image();
    self.numberImg = 0;

    self._showPhoto = function() {
      self.overlayGalleryPhoto.src = self.galleryImgListSrc[self.numberImg];
    };

    self.showGallery = function() {
      self.galleryImgListSrc = [];
      for (var i = 0; i < galleryImgList.length; i++) {
        galleryImgList[i].dataset.num = [i];
        self.galleryImgListSrc.push(galleryImgList[i].getAttribute('src'));
      }
      overlayGallery.classList.remove('invisible');
      overlayGalleryPreview.appendChild(self.overlayGalleryPhoto);

      overlayGalleryPrev.addEventListener('click', self._tooglePhoto);
      overlayGalleryNext.addEventListener('click', self._tooglePhoto);
      overlayGalleryClose.addEventListener('click', self._hideGallery);
      window.addEventListener('keydown', self._onDocumentKeyDown);
    };

    self._showNumberCurrent = function() {
      previewNumberCurrent.innerHTML = +(self.numberImg) + 1;
      previewNumberTotal.innerHTML = self.galleryImgListSrc.length;

      if (self.numberImg < 1) {
        overlayGalleryPrev.classList.add('invisible');
      }
      if (self.numberImg > galleryImgList.length - 2) {
        overlayGalleryNext.classList.add('invisible');
      }
      if (self.numberImg > 0 && self.numberImg < galleryImgList.length - 1) {
        overlayGalleryPrev.classList.remove('invisible');
        overlayGalleryNext.classList.remove('invisible');
      }
    };

    self._onDocumentKeyDown = function(evt) {
      if (evt.keyCode === 27) {
        self._hideGallery();
      }
    };

    self._hideGallery = function() {
      overlayGallery.classList.add('invisible');
      self.overlayGalleryPhoto.src = '';
      overlayGalleryPrev.removeEventListener('click', self._tooglePhoto);
      overlayGalleryNext.removeEventListener('click', self._tooglePhoto);
      overlayGalleryClose.removeEventListener('click', self._hideGallery);
      window.removeEventListener('keydown', self._onDocumentKeyDown);
    };

    self._tooglePhoto = function(evt) {
      if (evt.target.classList.contains('overlay-gallery-control-right')) {
        self.numberImg++;
        self._showPhoto(self.numberImg);
        self._showNumberCurrent(self.numberImg);
      } else {
        self.numberImg--;
        self._showPhoto(self.numberImg);
        self._showNumberCurrent(self.numberImg);
      }
    };
  }

  return Gallery;

});
