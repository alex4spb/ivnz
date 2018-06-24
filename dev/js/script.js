document.documentElement.classList.add(isMobile.any ? "mobile" : "no-mobile");
jQuery(document).ready(function($) {
    /*Плавная прокрутка*/
    $('a[href^="#"]').on("click", function(e) {
        e.preventDefault();
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
            $(".orangeline"),
            $(".greycircle"),
            $(".bluecircle")
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
                .addClass("active");
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
        $("input, textarea").each(function() {
            if ($(this).val().length > 0)
                $(this)
                    .parent(".input")
                    .find(".input__placeholder")
                    .addClass("active");
            else
                $(this)
                    .parent(".input")
                    .find(".input__placeholder")
                    .removeClass("active");
            $(this).on("click", function(e) {
                if ($(this).val().length > 0)
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .addClass("active");
                else
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .removeClass("active");
            });
            $(".input__placeholder").on("click", function(e) {
                $(this)
                    .parent(".input")
                    .find("input, textarea")
                    .focus();
            });
            $(this).focusout(function(e) {
                if ($(this).val().length > 0)
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .addClass("active");
                else
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .removeClass("active");
            });
        });
    });
    /*Ассистенты*/
    $(function() {
        $(".about__people-list-item-assistents").each(function() {
            var assists = $(this).find(
                ".about__people-list-item-assistents-item"
            );
            if (assists.length > 1) {
                assists
                    .addClass("-hidden")
                    .first()
                    .removeClass("-hidden")
                    .addClass("-active");
                assists.on("click", function(e) {
                    assists.removeClass("-active").addClass("-hidden");
                    $(this)
                        .removeClass("-hidden")
                        .addClass("-active");
                });
            }
        });
    });
    /*Комментарии Настройки disqus*/

    if (document.getElementById("disqus_thread")) {
        var your_sub_domain = "ivnz"; // Имя зарегистрированного сайта на disqus
        var dsq = document.createElement("script");
        dsq.type = "text/javascript";
        dsq.async = true;
        dsq.src = "//" + your_sub_domain + ".disqus.com/embed.js";
        (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]
        ).appendChild(dsq);
    }
    /*Слайдер вакансий*/
    new Swiper($(".vacancy__talants-slider"), {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        centeredSlides: true,
        loopedSlides: 2,
        // Navigation arrows
        navigation: false,
        //autoplay: {
        //  delay: 6000,
        //},
    });
    /* Сворачивание инфы*/
    $(".toggle").each(function() {
        var target = $(this).attr("data-target")        
        if ($(this).hasClass("-active")) {
            $(target).addClass("-active")
        }
        else {
            $(target).removeClass("-active")
        }
        $(this).on("click", function(e) {
            if ($(this).hasClass("-active")) {
                $(this).removeClass("-active")
                $(target).removeClass("-active")
            }
            else {
                $(this).addClass("-active")
                $(target).addClass("-active")
            }
        }); 
    })
    /*Яндекс карты в контактах*/

    $(".contacts").each(function() {
        ymaps.ready(init);
        var myMap;

        function init(){     
            myMap = new ymaps.Map("map", {
                center: [59.866933, 30.471834],
                zoom: 14,
                controls: ['zoomControl']
            });


        // Создание макета балуна на основе Twitter Bootstrap.
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
                '<a class="close" href="#">&times;</a>' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
                '</div>' +
                '</div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

    // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                '<div class="popover-content">$[properties.balloonContent]</div>'
        ),

            myPlacemark = new ymaps.Placemark([59.866933, 30.471834], { 
                hintContent: 'Иващенко и Низамов', 
                balloonContent: 'Столица России' 
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/map-mark.svg',
                // Размеры метки.
                iconImageSize: [34, 34],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-17, -17],
                hideIconOnBalloonOpen: false,
                balloonShadow: true,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0
            });
            myMap.geoObjects.add(myPlacemark);
            myPlacemark.balloon.open();
            myMap.behaviors.disable('scrollZoom');
        }
    })
});
