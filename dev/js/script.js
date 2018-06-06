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
    if ($(document).width() > 767)
        $(function() {
            var $el,
                leftPos,
                newWidth,
                $mainNav = $(".topnav__menu#magic");

            $mainNav.append("<div id='magic-line'></div>");
            var $magicLine = $("#magic-line");

            $magicLine
                .width(
                    $(".topnav__menu#magic .topnav__menu-item.active").width()
                )
                .css(
                    "left",
                    $(
                        ".topnav__menu#magic .topnav__menu-item.active"
                    ).position().left
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
    else
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
                    200
                );
                setTimeout(function() { menu.addClass('active'); }, 500);
            });
            $(close).on("click", function(e) {
                e.preventDefault();
                menu.animate(
                    {
                        left: "-100%"
                    },
                    200
                );
                setTimeout(function() { menu.removeClass("active"); }, 500);                
            });
        });
});
