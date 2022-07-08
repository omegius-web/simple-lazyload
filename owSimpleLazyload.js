(function(w, d){
  'use strict';
  w.owSimpleLazyload = class {
    constructor(callback, observer = {}) {
      this.IO = new IntersectionObserver(this.common.bind(undefined, callback), observer);
    }

    init() {
      const images = d.querySelectorAll('[data-lazyload]');

      if (images) {
        for (const image of images) {
          this.IO.observe(image);
        }
      }
    }

    common(callback = function() {}, entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && entry.target.dataset.lazyload) {

          if (entry.target.classList.contains('simpleLazyJs')) {

            entry.target.style.backgroundImage =
              'url("' +
              entry.target.dataset.lazyload.replace(/,/, '"),url("') +
              '")';
          } else {
            entry.target.src = entry.target.dataset.lazyload;
          }

          entry.target.removeAttribute('data-lazyload');
        }

        if (entry.isIntersecting && !entry.target.dataset.lazyState) {
          entry.target.dataset.lazyState = '1';
          callback(entry.target);
        }
      });
    }
  }
})(window, document)