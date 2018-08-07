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
        var width = $(window).outerWidth();
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
        var width = $(window).outerWidth();
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

    $(window).on('loaded resize', function() {
        openMenu();
    });

    // Tabs
    var tabsThumbs = undefined;
    var sliderBottom = undefined;

    function tabs() {
        var width = $(window).outerWidth();
        var tabsAnimate = document.getElementById('tabs-icon');
        var tabs = $('#tabs');
        var tabsIcon = tabs.find('.icon-item');
        var tabsContent = tabs.find('.tabs-content');
        var tabsWrap = tabs.find('.tabs-content-box__wrap');
        var tabsIconCenter = tabs.find('.icon-item:nth-child(3)');
        var tabsWrapCenter = tabs.find('.tabs-content-box__wrap:nth-child(3)');

        $('#tabs-icon a[data-target^="anchore"]').on('click', function() {
            var element = $(this).attr('href'),
                dist = $(element).offset().top - 25;
            $('html, body').stop().animate({
                'scrollTop': dist
            }, 400);
            return false;
        });

        // function showMessage() {
        //     alert('Transition закончил свое выполнение');
        // }
        // tabsAnimate.addEventListener("animationcancel", showMessage, false);
        if (width >= 769) {
            console.log('зашло в 768');
            tabsIcon.on('click.tabs', function() {
                tabsIcon.removeClass('icon-item_active').eq($(this).index()).addClass('icon-item_active');
                tabsWrap.hide().eq($(this).index()).css({
                    'display': 'flex',
                    'opacity': '1'
                });
                return false;
            });
            tabsAnimate.addEventListener('animationend', function() {
                console.log('анимация');
                
                $(window).on('scroll', function() {
                    var tabsIconHasClass = tabsIcon.hasClass('icon-item_active');
                    console.log(tabsIconHasClass);

                    if (tabs.offset().top < $(window).scrollTop()) {
                        tabsIconCenter.addClass('icon-item_active');
                        tabsWrapCenter.css({
                            'display': 'flex',
                            'opacity': '1'
                        });
                    }
                    if (tabs.offset().top < $(window).scrollTop() && tabsIconHasClass == true) {
                        $(window).off('scroll');
                        console.log('dead scroll');
                    }
                });
            }, false);
        }
        if ((width <= (768)) && (tabsThumbs == undefined) && (sliderBottom == undefined)) {
            console.log('зашло в 767');
            tabsIcon.off('click.tabs');
            tabsIcon.removeClass('icon-item_active');
            tabsWrap.removeAttr('style');

            tabsThumbs = new Swiper('#tabs-icon', {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                slideToClickedSlide: true,
                breakpoints: {
                    650: {
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
            console.log('зашло и откл. слайдер');
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



});