'use strict';

define('gallery', function() {

  function Gallery(overlay) {
    this.overlayGallery = overlay.gallery;
    this.overlayGalleryClose = overlay.galleryClose;
    this.overlayGalleryPreview = overlay.galleryPreview;
    this.overlayGalleryPrev = overlay.galleryPrev;
    this.overlayGalleryNext = overlay.galleryNext;
    this.overlayNumberCurrent = overlay.galleryNumberCurrent;
    this.overlayNumberTotal = overlay.galleryNumberTotal;
    this.overlayGalleryPhoto = new Image();
    this.overlayGalleryPhoto.style.maxHeight = 740 + 'px';
    this.overlayListSrc = overlay.galleryListSrc;
    this.numberImg = 0;
    this._tooglePhoto = this._tooglePhoto.bind(this);
    this._showNumberCurrent = this._showNumberCurrent.bind(this);
    this._isPhoto = this._isPhoto.bind(this);
    this._showGallery = this._showGallery.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._hideGallery = this._hideGallery.bind(this);
    this.setHash = this.setHash.bind(this);
    this.readHash = this.readHash.bind(this);
  }

  Gallery.prototype._tooglePhoto = function(state) {
    if (this.overlayGalleryNext === state.target) {
      this.numberImg++;
    } else {
      this.numberImg--;
    }
    this.setHash(this.overlayListSrc[this.numberImg]);
  };

  Gallery.prototype._showNumberCurrent = function() {
    this.overlayNumberCurrent.innerHTML = +(this.numberImg) + 1;
    this.overlayNumberTotal.innerHTML = this.overlayListSrc.length;
    if (this.numberImg < 1) {
      this.overlayGalleryPrev.classList.add('invisible');
    }
    if (this.numberImg > this.overlayListSrc.length - 2) {
      this.overlayGalleryNext.classList.add('invisible');
    }
    if (this.numberImg > 0 && this.numberImg < this.overlayListSrc.length - 1) {
      this.overlayGalleryPrev.classList.remove('invisible');
      this.overlayGalleryNext.classList.remove('invisible');
    }
  };

  Gallery.prototype._isPhoto = function(url) {
    for (var i = 0; i < this.overlayListSrc.length; i++) {
      if (this.overlayListSrc[i] === url.slice(7)) {
        this.numberImg = i;
        this.overlayGalleryPhoto.src = this.overlayListSrc[this.numberImg];
        this._showNumberCurrent();
      }
    }
  };

  Gallery.prototype._showGallery = function(url) {
    this.overlayGallery.classList.remove('invisible');
    this.overlayGalleryPreview.appendChild(this.overlayGalleryPhoto);
    this._isPhoto(url);
    this.overlayGalleryPrev.addEventListener('click', this._tooglePhoto);
    this.overlayGalleryNext.addEventListener('click', this._tooglePhoto);
    this.overlayGalleryClose.addEventListener('click', this._hideGallery);
    window.addEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this._hideGallery();
    }
  };

  Gallery.prototype._hideGallery = function() {
    this.setHash();
    this.overlayGallery.classList.add('invisible');
    this.overlayGalleryPrev.removeEventListener('click', this._tooglePhoto);
    this.overlayGalleryNext.removeEventListener('click', this._tooglePhoto);
    this.overlayGalleryClose.removeEventListener('click', this._hideGallery);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype.setHash = function(url) {
    if(url) {
      location.hash = '#photo/' + url;
    } else {
      location.hash = '';
    }
  };

  Gallery.prototype.readHash = function(url) {
    if (url.indexOf('#photo/') !== -1) {
      this._showGallery(url);
    }
  };
  return Gallery;

});
