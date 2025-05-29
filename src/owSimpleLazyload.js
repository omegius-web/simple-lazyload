/**
 * Simple Lazyload
 * @version 1.0.0
 * @link https://github.com/omegius-web/simple-lazyload
 */
export default class owSimpleLazyload {
  constructor(callback, observer = {}) {
    this.attribute = 'owlazyload';
    this.IO = new IntersectionObserver(this.common.bind(this, callback), observer);
  }

  init() {
    const images = document.querySelectorAll('[data-' + this.attribute + ']');

    if (images) {
      for (const image of images) {
        this.IO.observe(image);
      }
    }
  }

  custom(selectors = []) {
    if (selectors) {
      for (const selector of selectors) {

        if (document.querySelector(selector)) {
          this.IO.observe(document.querySelector(selector));
        }
      }
    }
  }

  srcset(el) {
    if (el.dataset[this.attribute + 'Srcset']) {
      el.srcset = el.dataset[this.attribute + 'Srcset'];
      el.removeAttribute('data-' + this.attribute + '-srcset');
    }
  }

  source(entries) {
    if (entries) {
      entries.forEach((entry) => {
        this.srcset(entry);
      })
    }
  }

  common(callback = function () {
  }, entries) {
    entries.forEach((entry) => {

      if (entry.isIntersecting && entry.target.dataset[this.attribute]) {
        const tagName = entry.target.tagName;
        if (tagName === 'DIV' || tagName === 'A' || tagName === 'SPAN') {
          entry.target.style.backgroundImage =
            'url("' +
            entry.target.dataset[this.attribute].replace(/,/, '"),url("') +
            '")';
        } else if (tagName === 'IMG' || tagName === 'IFRAME' || tagName === 'VIDEO') {
          if (entry.target.parentNode.tagName.match(/picture/i)) {
            this.source(entry.target.parentNode.querySelectorAll('source'));
          }

          entry.target.src = entry.target.dataset[this.attribute];
        }

        this.srcset(entry.target);

        entry.target.removeAttribute('data-' + this.attribute);
      }

      if (entry.isIntersecting && !entry.target.dataset.lazyState) {
        entry.target.dataset.lazyState = '1';
        callback(entry.target);
      }
    });
  }
}
