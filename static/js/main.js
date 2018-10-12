"use strict";

var lastKnownScrollY = 0;
var currentScrollY = 0;
var ticking = false;
var idOfHeader = 'header';
var eleHeader = null;
var classes = {
  pinned: 'fixed_header',
  unpinned: 'fixed_header_out'
};

function onScroll() {
  currentScrollY = window.pageYOffset;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }

  ticking = true;
}

function update() {
  if (currentScrollY < lastKnownScrollY) {
    pin();
  } else if (currentScrollY > lastKnownScrollY) {
    unpin();
  }

  lastKnownScrollY = currentScrollY;
  ticking = false;
}

function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);
    eleHeader.classList.add(classes.pinned);
  }
}

function unpin() {
  if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.pinned);
    eleHeader.classList.add(classes.unpinned);
  }
}

window.onload = function () {
  eleHeader = document.getElementById(idOfHeader);
  document.addEventListener('scroll', onScroll, false);
};

(function ($) {
  // Svg plugin
  $(document).ready(function () {
    svg4everybody();
  });
  $(window).on('resize load', function () {
    if ($(window).outerWidth() > 767) {
      $('.nav').removeAttr('style');
      $('#nav-icon3').removeClass('open');
      $('.filter').removeAttr('style');
      $('header').removeClass('white_header');
    } else {
      $('.nav_collections').removeAttr('style');
      $(document).off('mouseenter', 'header .enter', enterLink);
      $(document).off('mouseleave', 'header .nav_collections', leaveLink);
      $(document).off('mouseleave', '.filter .nav_collections', leaveLink);
    }
  });
  $(".article_list a[href*='#']").mPageScroll2id(); // Nav pages global

  $('.menu_click').on('click', function () {
    $('.menu_wrap').toggleClass('menu_wrap_active');
  }); // Menu fixed

  function menuFixed() {
    if ($(window).scrollTop() < 110) {
      $('#header').removeClass('fixed_header');
    }
  }

  $(window).bind('scroll', menuFixed); // Article nav fixed

  var articleNav = $('.article_nav');

  function articleFixed() {
    if ($(window).scrollTop() > 300) {
      articleNav.addClass('article_active');
    } else {
      articleNav.removeClass('article_active');
    }
  }

  $(window).on('scroll', articleFixed); // Page scroll to
  // $("a[rel='m_PageScroll2id']").mPageScroll2id();
  // Index slider

  var swiper = new Swiper('.slider_wrap .swiper-container', {
    speed: 1000,
    loop: true,
    parallax: true,
    simulateTouch: false,
    navigation: {
      nextEl: '.btn_next',
      prevEl: '.btn_prev'
    }
  }); // Index Catalog slider

  var mySwiper = undefined;

  function initSwiper() {
    var screenWidth = $(window).width();

    if (screenWidth < 767) {
      mySwiper = new Swiper('.collections-page .swiper-container, .index-page .catalog_wrap .swiper-container', {
        loop: true,
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 25,
        centeredSlides: true,
        simulateTouch: true
      });
    } else {
      mySwiper = new Swiper('.collections-page .swiper-container, .index-page .catalog_wrap .swiper-container', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 10,
        simulateTouch: false
      });
    }
  }

  initSwiper();
  $(window).bind('load resize', function () {
    initSwiper();
  });
  var mySwiper1 = undefined;

  function initSwiper1() {
    var screenWidth = $(window).width();

    if (screenWidth < 767) {
      mySwiper1 = new Swiper('.product_catalog .swiper-container', {
        loop: true,
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 25,
        centeredSlides: true,
        simulateTouch: true
      });
    } else {
      mySwiper1 = new Swiper('.product_catalog .swiper-container', {
        slidesPerView: 3,
        slidesPerColumn: 1,
        spaceBetween: 10,
        simulateTouch: false
      });
    }
  }

  initSwiper1();
  $(window).bind('load resize', function () {
    initSwiper1();
  });
  var controlActiveProducts = $('.swiper_control__item');
  var ProductSlides = new Swiper('.product_slider .swiper-container', {
    speed: 500,
    loop: false,
    spaceBetween: 5,
    simulateTouch: true,
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 5
      }
    }
  });
  ProductSlides.on('slideChange', function () {
    var index = ProductSlides.realIndex;
    controlActiveProducts.children().removeClass('active_mini');
    controlActiveProducts.children().eq(index).addClass('active_mini');
  });
  controlActiveProducts.on('click', function () {
    console.log('click');
    ProductSlides.slideTo($(this).index(), 500);
  }); // Active Placeholder

  function activePlaceholder() {
    $(this).parent().addClass('active_placeholder');
  }

  function removePlaceholder() {
    if ($(this).val() == 0) {
      $(this).parent().removeClass('active_placeholder');
    }
  }

  $(document).on('focusin', '.form_email', activePlaceholder);
  $(document).on('focusout', '.form_email', removePlaceholder); // Burger

  $('.other-page #nav-icon3').on('click', function () {
    $(this).toggleClass('open');
    $('.nav').fadeToggle(100);
    $('body').toggleClass('overflowBody');
  });
  $('.index-page #nav-icon3').on('click', function () {
    $(this).toggleClass('open');
    $('header').toggleClass('white_header'); // $('.nav').fadeToggle(100);

    $('body').toggleClass('overflowBody');
  }); // Send complete

  $(document).on('click', '.form button', function (e) {
    e.preventDefault();
    $('.form_submit').hide();
    $('.form_send').show();
  }); // Filter

  function enterLink() {
    $(this).next().stop(true).fadeIn(100);
    $(this).addClass('black');
  }

  function leaveLink() {
    $(this).stop(true).fadeOut(0);
    $(this).prev().removeClass('black');
  }

  function leaveLink() {
    $(this).stop(true).fadeOut(0);
    $(this).prev().removeClass('black');
  }

  $(document).on('mouseenter', 'header .enter', enterLink);
  $(document).on('mouseleave', 'header .nav_collections', leaveLink);
  $(document).on('mouseleave', '.filter .nav_collections', leaveLink);
  $(document).on('click', '.btn_drop', function (e) {
    e.preventDefault();
    $(this).next().stop(true).fadeToggle(300);
    $(this).toggleClass('black');
  });
  $(document).on('click', '.filter__icon', function (e) {
    e.preventDefault();
    $('.filter').slideToggle(300);
  }); // Limited Product Banner Click

  $(document).on('click', '.state', function (e) {
    e.preventDefault();
    $(this).parent().fadeOut(200);
    $(this).parent().next().fadeIn(200);
  });
  $(document).on('click', '.state2', function (e) {
    e.preventDefault();
    $(this).parent().fadeOut(200);
    $(this).parent().parent().next().fadeIn(200);
  }); // Range

  var elem = document.querySelector('input[type="range"]');

  var rangeValue = function rangeValue() {
    var newValue = elem.value;
    var target = document.querySelector('.value');
    target.innerHTML = newValue + "$";

    if (newValue == 500) {
      target.innerHTML = "Any Price";
    }
  };

  elem.addEventListener("input", rangeValue);
})(jQuery);