(function () {
  $.cachedScript = function (url, options) {
    // Allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url,
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
  };

  $.cachedScript("https://unpkg.com/aos@2.3.4/dist/aos.js").done(function () {
    // code
    AOS.init({
      duration: 1000,
    });
    window.setTimeout(function () {
      AOS.refresh();
    }, 500);
  });

  // swiper
  $.cachedScript("https://unpkg.com/swiper@5.2.1/js/swiper.js").done(() => {
    const bulletSwiper = document.querySelectorAll(".kolon-bullet-swiper");
    const bulletSwipers = [];
    bulletSwiper.forEach(function (item) {
      const sw = new Swiper(item.querySelector(".swiper-container"), {
        speed: 1500,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: item.querySelector(".swiper-pagination"),
          type: "bullets",
          clickable: true,
        },
      });
      bulletSwipers.push(sw);
    });

    //딤 swiper
    const dimSwiper2 = document.querySelectorAll(".kolon-dim-swiper");
    const dimSwipers2 = [];
    dimSwiper2.forEach(function (item) {
      const sw = new Swiper(item.querySelector(".swiper-container"), {
        speed: 1500,
        centeredSlides: true,
        slidesPerView: 3,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        parallax: true,
        pagination: {
          el: item.querySelector(".swiper-pagination"),
          type: "bullets",
          clickable: true,
        },
      });
      dimSwipers2.push(sw);
    });

    const ctns07swiperElement = document.querySelector("#ctns07swiper");
    const ctns07swiper = new Swiper(
      ctns07swiperElement.querySelector(".swiper-container"),
      {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        allowTouchMove: false,
      }
    );
  });
})();
