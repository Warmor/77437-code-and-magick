'use strict';

define('gallery', function() {

  function Gallery(overlay) {
    var self = this;

    this.overlayGallery = overlay.gallery;
    this.overlayGalleryClose = overlay.galleryClose;
    this.overlayGalleryPreview = overlay.galleryPreview;
    this.overlayGalleryPrev = overlay.galleryPrev;
    this.overlayGalleryNext = overlay.galleryNext;
    this.overlayNumberCurrent = overlay.galleryNumberCurrent;
    this.overlayNumberTotal = overlay.galleryNumberTotal;
    this.overlayGalleryPhoto = new Image();
    self.overlayGalleryPhoto.style.maxHeight = 740 + 'px';
    this.overlayListSrc = overlay.galleryListSrc;
    this.numberImg = 0;


    this._tooglePhoto = function(state) {
      if (self.overlayGalleryNext === state.target) {
        self.numberImg++;
      } else {
        self.numberImg--;
      }
      self.setHash(self.overlayListSrc[self.numberImg]);
    };

    this._showNumberCurrent = function() {
      self.overlayNumberCurrent.innerHTML = +(self.numberImg) + 1;
      self.overlayNumberTotal.innerHTML = self.overlayListSrc.length;
      if (self.numberImg < 1) {
        self.overlayGalleryPrev.classList.add('invisible');
      }
      if (self.numberImg > self.overlayListSrc.length - 2) {
        self.overlayGalleryNext.classList.add('invisible');
      }
      if (self.numberImg > 0 && self.numberImg < self.overlayListSrc.length - 1) {
        self.overlayGalleryPrev.classList.remove('invisible');
        self.overlayGalleryNext.classList.remove('invisible');
      }
    };

    this._isPhoto = function(url) {
      for (var i = 0; i < self.overlayListSrc.length; i++) {
        if (self.overlayListSrc[i] === url.slice(7)) {
          self.numberImg = i;
          self.overlayGalleryPhoto.src = self.overlayListSrc[self.numberImg];
          self._showNumberCurrent(i);
        }
      }
    };

    this._showGallery = function(url) {
      self.overlayGallery.classList.remove('invisible');
      self.overlayGalleryPreview.appendChild(self.overlayGalleryPhoto);
      self._isPhoto(url);
      this.overlayGalleryPrev.addEventListener('click', self._tooglePhoto);
      this.overlayGalleryNext.addEventListener('click', self._tooglePhoto);
      this.overlayGalleryClose.addEventListener('click', self._hideGallery);
      window.addEventListener('keydown', self._onDocumentKeyDown);
    };

    this._onDocumentKeyDown = function(evt) {
      if (evt.keyCode === 27) {
        self._hideGallery();
      }
    };

    this._hideGallery = function() {
      self.setHash();
      self.overlayGallery.classList.add('invisible');
      self.overlayGalleryPrev.removeEventListener('click', self._tooglePhoto);
      self.overlayGalleryNext.removeEventListener('click', self._tooglePhoto);
      self.overlayGalleryClose.removeEventListener('click', self._hideGallery);
      window.removeEventListener('keydown', self._onDocumentKeyDown);
    };

    this.setHash = function(url) {
      if(url) {
        location.hash = '#photo/' + url;
      } else {
        location.hash = '';
      }
    };

    this.getHash = function(url) {
      if (~url.indexOf('#photo/')) {
        self._showGallery(url);
      }
    };
  }

  return Gallery;

});
