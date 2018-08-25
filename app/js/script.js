$(document).ready(function() {
    // Animate
    // wow = new WOW({
    //     boxClass: 'wow',
    //     animateClass: 'animated',
    //     offset: 0,
    //     mobile: true,
    //     live: true
    // });
    // wow.init();

    // Append in mob-menu
    function appendInMobMenu() {
        $('body, html').css('overflow', 'hidden');
        var width = $(window).outerWidth();
        $('body, html').css('overflow', 'visible');
        var mobMenu = $('#mob-menu');
        var header = $('#header');
        var userMenu = $('#header-user-menu');
        var menu = $('#header-menu');

        if (width <= 992) {
            mobMenu.append(userMenu);
            mobMenu.append(menu);
        } else {
            header.append(menu);
            header.append(userMenu);
        }
    };
    appendInMobMenu();

    $(window).on('loaded resize', function() {
        appendInMobMenu();
    });

    // Open/close Menu
    function openMenu() {
        var openMobMenu = $('#open-menu');
        var mobMenu = $('#mob-menu');
        var closeMobMenu = mobMenu.find('.mob-menu__close');
        var home = $('.home');
        var menu = $('#header-menu');

        openMobMenu.on('click', function() {
            mobMenu.addClass('mob-menu-open');
            $('#mob-menu [data-accordion]').accordion();

            $(document).on('click', function(e) {
                if (!mobMenu.is(e.target) && mobMenu.has(e.target).length === 0) {
                    mobMenu.removeClass('mob-menu-open');
                }
            });
            return false;
        });
        closeMobMenu.on('click', function() {
            mobMenu.removeClass('mob-menu-open');
            home.removeClass('home-visible');
            return false;
        });
    };
    openMenu();

    // Tabs
    var tabsThumbs = undefined;
    var sliderBottom = undefined;

    function tabs() {
        $('body, html').css('overflow', 'hidden');
        var width = $(window).outerWidth();
        $('body, html').css('overflow', 'visible');
        var tabsAnimate = document.getElementById('tabs-icon');
        var tabs = $('#tabs');
        var tabsIcon = tabs.find('.icon-item');
        var tabsContent = tabs.find('.tabs-content');
        var tabsWrap = tabs.find('.tabs-content-box__wrap');
        var tabsIconCenter = tabs.find('.icon-item:nth-child(3)');
        var tabsWrapCenter = tabs.find('.tabs-content-box__wrap:nth-child(3)');

        $('#tabs-icon a[data-target^="anchore"]').on('click', function() {
            var element = $(this).attr('href'),
                dist = $(element).offset().top - 15;
            $('html, body').stop().animate({
                'scrollTop': dist
            }, 400);
            return false;
        });
        if (width >= 769) {
            tabsIcon.on('click.tabs', function() {
                tabsIcon.removeClass('icon-item_active').eq($(this).index()).addClass('icon-item_active');
                tabsWrap.removeAttr('style', 'opacity').hide().eq($(this).index()).css('display', 'flex').animate({
                    opacity: '1'
                }, 500);
                return false;
            });
            tabsAnimate.addEventListener('animationend', function() {
                $(window).on('scroll', function() {
                    var tabsIconHasClass = tabsIcon.hasClass('icon-item_active');

                    if (tabs.offset().top < $(window).scrollTop()) {
                        tabsIconCenter.addClass('icon-item_active');
                        tabsWrapCenter.css('display', 'flex').animate({
                            opacity: '1'
                        }, 500);
                    }
                    if (tabsIconHasClass == true) {
                        $(window).off('scroll');
                    }
                });
            }, false);
        }
        if ((width <= (768)) && (tabsThumbs == undefined) && (sliderBottom == undefined)) {
            tabsIcon.off('click.tabs');
            tabsIcon.removeClass('icon-item_active');
            tabsWrap.removeAttr('style');
            tabsThumbs = new Swiper('#tabs-icon', {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                slideToClickedSlide: true,
                breakpoints: {
                    675: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 1,
                    }
                }
            });
            sliderBottom = new Swiper('#tabs .tabs-content', {
                spaceBetween: 20,
            });
            tabsThumbs.controller.control = sliderBottom;
            sliderBottom.controller.control = tabsThumbs;
        }
        if ((width >= 769) && (tabsThumbs != undefined) && (sliderBottom != undefined)) {
            tabsThumbs.destroy();
            tabsThumbs = undefined;
            sliderBottom.destroy();
            sliderBottom = undefined;
            tabsIconCenter.addClass('icon-item_active');
            tabsWrapCenter.css('opacity', '1');
        }
    };
    tabs();

    $(window).on('loaded resize', function() {
        tabs();
    });

    // Counter
    $('#nomber-first').animate({
        place: 190
    }, {
        duration: 4000,
        step: function(place) {
            this.innerHTML = (place).toFixed(0)
        }
    });
    $('#nomber-second').animate({
        place: 200
    }, {
        duration: 4500,
        step: function(place) {
            this.innerHTML = (place).toFixed(0)
        }
    });
    $('#nomber-third').animate({
        place: 98
    }, {
        duration: 3000,
        step: function(place) {
            this.innerHTML = (place).toFixed(0) + '%'
        }
    });
    $('#nomber-fourth').animate({
        place: 100
    }, {
        duration: 3500,
        step: function(place) {
            this.innerHTML = (place).toFixed(0) + '%'
        }
    });

    // SVG-sprite
    ;
    (function(window, document) {
        'use strict';

        var file = 'images/icon/symbol_sprite.html',
            revision = 1;

        if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
            return true;

        var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
            request,
            data,
            insertIT = function() {
                document.body.insertAdjacentHTML('afterbegin', data);
            },
            insert = function() {
                if (document.body) insertIT();
                else document.addEventListener('DOMContentLoaded', insertIT);
            };

        if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
            data = localStorage.getItem('inlineSVGdata');
            if (data) {
                insert();
                return true;
            }
        }

        try {
            request = new XMLHttpRequest();
            request.open('GET', file, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    data = request.responseText;
                    insert();
                    if (isLocalStorage) {
                        localStorage.setItem('inlineSVGdata', data);
                        localStorage.setItem('inlineSVGrev', revision);
                    }
                }
            }
            request.send();
        } catch (e) {}

    }(window, document));



});