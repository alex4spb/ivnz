document.documentElement.classList.add(isMobile.any ? "mobile" : "no-mobile");
jQuery(document).ready(function($) {
    /*Плавная прокрутка*/
    $('a[href^="#"]').on("click", function(e) {
        //e.preventDefault();
        var a = $(this),
            hash = a.attr("href"),
            target = $('[id="' + hash.substr(1) + '"]');
        if (target.length != 0) {
            $("html:not(:animated), body:not(:animated)").animate(
                {
                    scrollTop: target.offset().top
                },
                500,
                function() {
                    window.location.hash = hash;
                }
            );
        }
    });
    AOS.init({
        duration: 1200,
        once: true
    });
    /*Магическая линия для верхнего меню*/
    $(function() {
        var $el,
            leftPos,
            newWidth,
            $mainNav = $(".topnav__menu#magic");

        $mainNav.append("<div id='magic-line'></div>");
        var $magicLine = $("#magic-line");

        $magicLine
            .width($(".topnav__menu#magic .topnav__menu-item.active").width())
            .css(
                "left",
                $(".topnav__menu#magic .topnav__menu-item.active").position()
                    .left
            )
            .data("origLeft", $magicLine.position().left)
            .data("origWidth", $magicLine.width());
        $(".topnav__menu#magic .topnav__menu-item a").focusin(function() {
            $el = $(this);
            leftPos = $el.parent().position().left;
            newWidth = $el.parent().width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        });
        $(".topnav__menu#magic .topnav__menu-item a").focusout(function() {
            $magicLine.stop().animate({
                left: $magicLine.data("origLeft"),
                width: $magicLine.data("origWidth")
            });
        });
    });
    /*Анимация для мобильного меню*/
    $(function() {
        var pull = $("#pull"),
            menu = $(".topnav__menu.-mobile"),
            menuHeight = menu.height(),
            close = $(".topnav__menu-close img");

        $(pull).on("click", function(e) {
            e.preventDefault();
            menu.animate(
                {
                    left: "0px"
                },
                600,
                "easeOutCubic"
            );
            setTimeout(function() {
                menu.addClass("active");
            }, 500);
        });
        $(close).on("click", function(e) {
            e.preventDefault();
            menu.animate(
                {
                    left: "-100%"
                },
                600,
                "easeOutCubic"
            );
            setTimeout(function() {
                menu.removeClass("active");
            }, 500);
        });
    });
    /*Поддержка анимации для полосок*/
    $(function() {
        var line = [
            $(".greyline"),
            $(".blueline"),
            $(".orangecircle"),
            $(".orangeline")
        ];
        line.forEach(function(element, index) {
            checkForChanges();
            function checkForChanges() {
                if (element.hasClass("aos-animate"))
                    setTimeout(function() {
                        element.stop().addClass("active");
                    }, 100);
                else setTimeout(checkForChanges, 100);
            }
        });
    });
    /*Слайдер на главной*/
    var slider = $(".working__tabs-content-item.active .working__tabs-slider");
    new Swiper(slider, {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        centeredSlides: true,
        loopedSlides: 2,
        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
    $(".working__tabs-titles").on(
        "click",
        ".working__tabs-titles-item:not(.active)",
        function() {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active")
                .closest(".working__tabs")
                .find(".working__tabs-content-item")
                .removeClass("active")
                .eq($(this).index())
                .addClass("active") 
            new Swiper(
                $(this)
                    .closest(".working__tabs")
                    .find(".working__tabs-content-item")
                    .eq($(this).index())
                    .find(".working__tabs-slider"),
                {
                    // Optional parameters
                    direction: "horizontal",
                    loop: true,
                    centeredSlides: true,
                    loopedSlides: 2,
                    // Navigation arrows
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                }
            );
        }
    );
    /*Динамика placeholder в форме*/
    $(function() {
        $('input').each(function() {
            if ($(this).val().length > 0)
                $(this).parent('.input').find('.input__placeholder').addClass('active')
               else  
                $(this).parent('.input').find('.input__placeholder').removeClass('active')
            $(this).on("click", function(e) {
               if ($(this).val().length > 0)
                $(this).parent('.input').find('.input__placeholder').addClass('active')
               else  
                $(this).parent('.input').find('.input__placeholder').removeClass('active')
            })
            $(this).focusout(function(e) {
               if ($(this).val().length > 0)
                $(this).parent('.input').find('.input__placeholder').addClass('active')
               else  
                $(this).parent('.input').find('.input__placeholder').removeClass('active')
            })
        })
    })
});
