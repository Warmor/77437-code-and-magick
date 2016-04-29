'use strict';

define('render-gallery', ['./gallery'], function(Gallery) {

  var gallery = document.querySelector('.photogallery');

  gallery.addEventListener('click', function(evt) {
    if (evt.target.parentNode.classList.contains('photogallery-image')) {
      var myGallery = new Gallery();
      myGallery.showGallery();
      myGallery.numberImg = evt.target.dataset.num;
      myGallery._showPhoto();
      myGallery._showNumberCurrent();
    }
  });

});
