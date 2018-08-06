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
            home.addClass('home-visible');
            $('#mob-menu [data-accordion]').accordion();

            $(document).on('click', function(e) {
                if (!mobMenu.is(e.target) && mobMenu.has(e.target).length === 0) {
                    mobMenu.removeClass('mob-menu-open');
                    home.removeClass('home-visible');
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
    function tabs() {
        // var width = $(window).outerWidth();
        var tabsAnimate = document.getElementById('tabs-icon');

        tabsAnimate.addEventListener('animationend', function() {
            var tabs = $('#tabs');
            var tabsIcon = tabs.find('.icon-item');
            var tabsIconCenter = tabs.find('.icon-item:nth-child(3)');
            var tabsContent = tabs.find('.tabs-content');
            var tabsWrap = tabs.find('.tabs-content__wrap');
            var tabsWrapCenter = tabs.find('.tabs-content__wrap:nth-child(3)');

            $(window).on('scroll', function() {
                var tabsIconHasClas = tabsIcon.hasClass('icon-item_active');
                var tabsContentHasClas = tabsContent.hasClass('tabs-content_active');

                if (tabs.offset().top < $(window).scrollTop()) {
                    tabsIconCenter.addClass('icon-item_active');
                    tabsContent.addClass('tabs-content_active');
                    tabsWrapCenter.css('display', 'flex');
                }
                if (tabsIconHasClas && tabsContentHasClas) {
                    $(window).off('scroll');
                }
            });

            $('#tabs-icon a[data-target^="anchore"]').on('click', function() {
                var element = $(this).attr('href'),
                    dist = $(element).offset().top - 40;

                $('html, body').animate({
                    'scrollTop': dist
                }, 400);

                tabsContent.addClass('tabs-content_active');
                tabsIcon.removeClass('icon-item_active').eq($(this).index()).addClass('icon-item_active');
                tabsWrap.hide().eq($(this).index()).css('display', 'flex');
                return false;
            });
        }, false);
    };
    tabs();

    // $(window).on('loaded resize', function() {
    //     tabs();
    // });



});