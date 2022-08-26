/**
 * Simple Lazyload
 * @link https://github.com/omegius-web/simple-lazyload
 */
(function(w, d){
  'use strict';
  w.owSimpleLazyload = class {
    constructor(callback, observer = {}) {
      this.attribute = 'owlazyload';
      this.IO = new IntersectionObserver(this.common.bind(this, callback), observer);
    }

    init() {
      const images = d.querySelectorAll('[data-' + this.attribute + ']');

      if (images) {
        for (const image of images) {
          this.IO.observe(image);
        }
      }
    }

    custom(selectors = []) {
      if (selectors) {
        for (const selector of selectors) {

          if (d.querySelector(selector)) {
            this.IO.observe(d.querySelector(selector));
          }
        }
      }
    }

    common(callback = function() {}, entries) {
      const self = this;
      entries.forEach(function(entry) {
        if (entry.isIntersecting && entry.target.dataset[self.attribute]) {

          if (entry.target.tagName.match(/div|a|span/i)) {

            entry.target.style.backgroundImage =
              'url("' +
              entry.target.dataset[self.attribute].replace(/,/, '"),url("') +
              '")';
          } else {
            entry.target.src = entry.target.dataset[self.attribute];
          }

          entry.target.removeAttribute('data-' + self.attribute);
        }

        if (entry.isIntersecting && !entry.target.dataset.lazyState) {
          entry.target.dataset.lazyState = '1';
          callback(entry.target);
        }
      });
    }
  }
})(window, document)