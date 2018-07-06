document.documentElement.classList.add(isMobile.any ? "mobile" : "no-mobile");
/*ранняя прогрузка hover изображений*/
var hoverArray = [
    'img/mask_1.svg',
    'img/vk-black.svg',
    'img/vk-hover.svg',
    'img/vk-hover-bot.svg',
    'img/fb-black.svg',
    'img/fb-hover.svg',
    'img/fb-hover-bot.svg',
    'img/twitter-black.svg',
    'img/twitter-hover.svg',
    'img/twitter-hover-bot.svg',
    'img/telegram-black.svg',
    'img/telegram-hover.svg',
    'img/telegram-hover-bot.svg',
    'img/mask_sm_1.svg'
]
function preCacheHover(){
    $.each(hoverArray, function(){
        var img = new Image();
        img.src = this;
    });
}; 
$(window).on('load', function(){
  preCacheHover();
});
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
    if ($(".topnav__menu").length) {
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
                    200,
                    "linear"
                );
                setTimeout(function() {
                    menu.addClass("active");
                }, 200);
            });
            $(close).on("click", function(e) {
                e.preventDefault();
                menu.animate(
                    {
                        left: "-100%"
                    },
                    200,
                    "linear"
                );
                setTimeout(function() {
                    menu.removeClass("active");
                }, 200);
            });
        });
    }
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
                    }, 500);
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
                        .removeClass(" -error")
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
                    .focus()
                    .parent(".input")
                    .removeClass(" -error");
            });
            $(this).focusout(function(e) {
                if (
                    $(this).val().length > 0 &&
                    $(this).val() !== "+7 (___) ___ __ __"
                ) {
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .addClass("active")
                        .parent(".input")
                        .removeClass(" -error");
                    if (
                        $(this)
                            .parents(".form__field")
                            .hasClass("-step2")
                    ) {
                        $(this)
                            .parent(".input")
                            .find(".input__placeholder")
                            .css("opacity", "0");
                    }
                } else
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .removeClass("active")
            });
            $(this).focusin(function(e) {
                $(this)
                    .parent(".input")
                    .removeClass(" -error");
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
        $(".disqus-comment-count").attr(
            "data-disqus-url",
            window.location.href
        );

        var disqus_config = function() {
            this.page.url = window.location.href; // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = "identifier_1"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable '<? php echo $my_identifier; ?>'
            this.callbacks.onNewComment = [function() { DISQUSWIDGETS.getCount({reset: true}); }];
        };

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
        loopedSlides: 3,
        effect: "fade",
        // Navigation arrows
        navigation: false,
        autoplay: {
          delay: 6000,
        },
    });
    /* Сворачивание инфы*/
    $(".toggle").each(function() {
        var target = "";
        if ($(this).attr("data-target")) {
            target = $(this).attr("data-target");
        } else target = $(this).next();

        if ($(this).hasClass("-active")) {
            $(target).addClass("-active");
        } else {
            $(target).removeClass("-active");
        }
        $(this).on("click", function(e) {
            if ($(this).hasClass("-active")) {
                $(this).removeClass("-active");
                $(target).removeClass("-active");
            } else {
                $(this).addClass("-active");
                $(target).addClass("-active");
            }
        });
    });
    /*Яндекс карты в контактах*/

    $(".contacts").each(function() {
        ymaps.ready(init);
        var myMap;

        function init() {
            myMap = new ymaps.Map("map", {
                center: [59.866933, 30.471834],
                zoom: 14,
                controls: []
            });

            // Создание макета балуна на основе Twitter Bootstrap.
            MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="contacts__map-baloon">' +
                    '<a class="close" href="#"><img src="img/close_baloon.svg" alt="close"></a>' +
                    '<div class="contacts__map-baloon-content">' +
                    "$[[options.contentLayout observeSize]]" +
                    "</div>" +
                    "</div>",
                {
                    /**
                     * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                     * @function
                     * @name build
                     */
                    build: function() {
                        this.constructor.superclass.build.call(this);                        

                        this._$element = $(
                            ".contacts__map-baloon",
                            this.getParentElement()
                        );

                        this.applyElementOffset();

                        this._$element.addClass('active')

                        this._$element
                            .find(".close")
                            .on("click", $.proxy(this.onCloseClick, this));
                    },

                    /**
                     * Удаляет содержимое макета из DOM.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                     * @function
                     * @name clear
                     */
                    clear: function() {
                        this._$element.find(".close").off("click");

                        this.constructor.superclass.clear.call(this);
                    },

                    /**
                     * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onSublayoutSizeChange
                     */
                    onSublayoutSizeChange: function() {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(
                            this,
                            arguments
                        );

                        if (!this._isElement(this._$element)) {
                            return;
                        }

                        this.applyElementOffset();

                        this.events.fire("shapechange");
                    },

                    /**
                     * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name applyElementOffset
                     */
                    applyElementOffset: function() {
                        this._$element.css({
                            left: -(this._$element[0].offsetWidth / 2),
                            top: -(this._$element[0].offsetHeight + 20)
                        });
                    },

                    /**
                     * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onCloseClick
                     */
                    onCloseClick: function(e) {
                        e.preventDefault();
                        var it = this
                        it._$element.removeClass('active')
                        setTimeout(function() {it.events.fire("userclose")}, 100)

                        //this.events.fire("userclose");
                    },

                    /**
                     * Используется для автопозиционирования (balloonAutoPan).
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                     * @function
                     * @name getClientBounds
                     * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                     */
                    getShape: function() {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(
                                this
                            );
                        }

                        var position = this._$element.position();

                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top],
                                [
                                    position.left +
                                        this._$element[0].offsetWidth,
                                    position.top +
                                        this._$element[0].offsetHeight +
                                        20
                                ]
                            ])
                        );
                    },

                    /**
                     * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                     * @function
                     * @private
                     * @name _isElement
                     * @param {jQuery} [element] Элемент.
                     * @returns {Boolean} Флаг наличия.
                     */
                    _isElement: function(element) {
                        return element && element[0];
                    }
                }
            ),
                // Создание вложенного макета содержимого балуна.
                MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    "$[properties.balloonHeader]" +
                        "<p>$[properties.balloonContent]</p>"
                ),
                myPlacemark = new ymaps.Placemark(
                    [59.866933, 30.471834],
                    {
                        hintContent: "Иващенко и Низамов",
                        balloonHeader:
                            '<div class="metro">Пролетарская</div><b>г. Санкт-Петербург</b>',
                        balloonContent:
                            "пр. Обуховской Обороны 112 к.2 <br/>БЦ «Вант», офис 713"
                    },
                    {
                        // Опции.
                        // Необходимо указать данный тип макета.
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: "img/map-mark-close.svg",
                        // Размеры метки.
                        iconImageSize: [34, 34],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-17, -17],
                        hideIconOnBalloonOpen: false,
                        balloonShadow: true,
                        balloonLayout: MyBalloonLayout,
                        balloonContentLayout: MyBalloonContentLayout,
                        balloonPanelMaxMapArea: 0,
                        balloonShadowOffset: [0, 0]
                    }
                );
            myMap.geoObjects.add(myPlacemark);
            myPlacemark.balloon.open();
            myMap.behaviors.disable("scrollZoom");

            myPlacemark.events
                .add('balloonopen', function (e) {
                    // Ссылку на объект, вызвавший событие,
                    // можно получить из поля 'target'.

                    e.get('target').options.set('iconImageHref', 'img/map-mark.svg');
                })
                .add('balloonclose', function (e) {
                    e.get('target').options.set('iconImageHref', 'img/map-mark-close.svg');
                });
            }
    });
    /*Пагинатор в мобильной версии, удаление лишних страниц*/
    $(".blog__paginator-page").each(function() {
        var self = $(this);
        $(window).resize(function() {
            removePages();
        });
        function removePages() {
            if ($(window).width() < 768) {
                self.hide();
                if (self.hasClass("-active")) {
                    self.show();
                    self.prev().show();
                    self.next().show();
                    if (
                        self
                            .prev()
                            .prev()
                            .hasClass("blog__paginator-page-more") == false
                    )
                        $(
                            "<span class='blog__paginator-page-more'> ... </span>"
                        ).insertBefore(self.prev());
                }
                if (self.prev().hasClass("-active")) self.show();
            } else {
                self.show();
                if (self.hasClass("-active")) {
                    if (
                        self
                            .prev()
                            .prev()
                            .hasClass("blog__paginator-page-more")
                    )
                        self
                            .prev()
                            .prev()
                            .remove();
                }
            }
        }
        removePages();
    });
    /*Маска для телефона*/
    /*if (!window.phone_mask) {
        var phone_mask = "+7 (###) ### ## ##";
    }*/
    function maskRefresh() {
        $('input[name="phone"]').on("focusin", function() {
            delete $.mask.definitions["9"];
            $.mask.definitions["#"] = "[0-9]";
            $(this).mask("+7 (###) ### ## ##");
        });
    }
    maskRefresh();
    /*Формы*/
    $(function() {
        $(".vacancy-form__form form").on("submit", function(e) {
            e.preventDefault();
            var src = $(this).attr("action");
            var serialize = $(this).serialize();
            var data_field = $(this).serializeArray();
            var form = $(this);
            var type = $(this).data("type");
            var fields = {
                name: "",
                resume: "",
                phone: "",
                comments: ""
            };

            var require = ["name", "phone", "resume"];
            var errors = [];
            var message = "Поле является обязательным для заполнения";

            for (var field in fields) {
                var val = $(form)
                    .find("[name='" + field + "']")
                    .val();
                fields[field] = $.trim(val);
                if (fields[field] == "" && require.indexOf(field) != -1) {
                    errors.push(message);
                    $(form)
                        .find("[name='" + field + "']")
                        .parent(".input")
                        .addClass("-error")
                        .find(".input__error")
                        .html(message);
                }
            }
            if (
                !$(form)
                    .find("[name='conditions']")
                    .is(":checked")
            ) {
                errors.push(message);
                $(form)
                    .find("[name='conditions']")
                    .parents(".control-label")
                    .addClass("-error")
                    .find(".input__error")
                    .html("Подтвердите условия");
            } else
                $(form)
                    .find("[name='conditions']")
                    .parents(".control-label")
                    .removeClass("-error");

            if (!errors.length) {
                $.ajax({
                    type: "post",
                    async: false,
                    dataType: "json",
                    cache: false,
                    url: src,
                    data: data_field
                }).done(function(data) {
                    $(form)
                        .parents(".vacancy-form__wrap")
                        .fadeOut("slow", function() {
                            $(form)
                                .parents(".vacancy-form")
                                .find(".form__success")
                                .fadeIn();
                        });
                });
            }
        });

        /*подписка*/
        $(".blog__subscribe-form form").on("submit", function(e) {
            e.preventDefault();
            var src = $(this).attr("action");
            var serialize = $(this).serialize();
            var data_field = $(this).serializeArray();
            var form = $(this);
            var type = $(this).data("type");
            var fields = {
                email: ""
            };

            var require = ["name", "phone", "resume"];
            var errors = [];
            var message = "Поле является обязательным для заполнения";
            var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            for (var field in fields) {
                var val = $(form)
                    .find("[name='" + field + "']")
                    .val();
                fields[field] = $.trim(val);
                if (fields[field] == "" && require.indexOf(field) != -1) {
                    errors.push(message);
                    $(form)
                        .find("[name='" + field + "']")
                        .parent(".input")
                        .addClass("-error")
                        .find(".input__error")
                        .html(message);
                } else {
                    if (field == "email") {
                        if (!expr.test(fields[field])) {
                            errors.push(message);
                            $(form)
                                .find("[name='" + field + "']")
                                .parent(".input")
                                .addClass("-error")
                                .find(".input__error")
                                .html("введите корректный e-mail");
                        }
                    }
                }
            }
            if (!errors.length) {
                $.ajax({
                    type: "post",
                    async: false,
                    dataType: "json",
                    cache: false,
                    url: src,
                    data: data_field
                }).done(function(data) {
                    $(form)
                        .parents(".blog__subscribe-form")
                        .fadeOut("slow", function() {
                            $(form)
                                .parents(".blog__subscribe")
                                .find(".blog__subscribe-success")
                                .fadeIn();
                        });
                });
            }
        });
    });
    /*Добавление регионов в форме*/
    $(".input__add").on("click", function() {
        var button = $(this);
        var input = $(this)
            .parents(".input")
            .find('input[name="regions"]');
        var regions_container = $(this)
            .parents(".form__field")
            .find(".form__regions");
        var regions = $(this)
            .parents(".form__field")
            .find(".form__regions-item");
        var input_value = input.val().trim();
        //console.log(input_value);

        if (input_value.length != 0) {
            var repeat = 0;
            regions.each(function() {
                if (
                    $(this)
                        .text()
                        .trim()
                        .toLowerCase() == input_value.toLowerCase()
                ) {
                    repeat++;
                }
            });
            if (repeat == 0) {
                regions_container.append(
                    '<div class="form__regions-item">' +
                        input_value +
                        '<div class="close"></div>' +
                        "</div>"
                );
                removeBtn();
                input.val('').parent(".input")
                            .find(".input__placeholder")
                            .removeClass('active')
                            .css("opacity", "1");
            }
        } else {
            if (regions.length == 0) {
                regions_container.append(
                    '<div class="form__regions-item">' +
                        "Москва" +
                        '<div class="close"></div>' +
                        "</div>"
                );
                removeBtn();
                input.val('').parent(".input")
                            .find(".input__placeholder")
                            .removeClass('active')
                            .css("opacity", "1");
            }
        }
    });
    /*Удаление региона*/
    function removeBtn() {
        $(".close").bind("click", function() {
            $(this)
                .parents(".form__regions-item")
                .remove();
        });
    }
    removeBtn();

    /*Форма аудита многоэтапная*/
    $(".audit-form__form form").on("submit", function(e) {
        e.preventDefault();
    });
    $(".audit-form__form form .form__button").on("click", function(e) {
        e.preventDefault();
        var button = $(this);
        var step1 = $(this)
            .parents(".form__field")
            .hasClass("-step1");
        var step2 = $(this)
            .parents(".form__field")
            .hasClass("-step2");
        var form = $(this).parents("form");
        var src = form.attr("action");
        //var serialize = $(this).serialize();
        //var data_field = $(this).serializeArray();
        var type = form.data("type");
        var data = {
            domain: $("[name=domain]").val(),
            name: $("[name=name]").val(),
            phone: $("[name=phone]").val(),
            email: $("[name=email]").val(),
            promocode: $("[name=promocode]").val(),
            conditions: $("[name=conditions]:checked").length,
            theme: $("[name=theme]").val(),
            regions: [],
        };
        
        var require = ["domain", "name", "phone", "email"];
        var errors = [];
        var message = "Поле является обязательным для заполнения";
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        for (var field in data) {
            var val = $(form)
                .find("[name='" + field + "']")
                .val();
            if (require.indexOf(field) != -1){
                data[field] = $.trim(val);
                if (data[field] == "") {
                    errors.push(message);
                    $(form)
                        .find("[name='" + field + "']")
                        .parent(".input")
                        .addClass("-error")
                        .find(".input__error")
                        .html(message);
                } else {
                    if (field == "email") {
                        if (!expr.test(data[field])) {
                            errors.push(message);
                            $(form)
                                .find("[name='" + field + "']")
                                .parent(".input")
                                .addClass("-error")
                                .find(".input__error")
                                .html("введите корректный e-mail");
                        }
                    }
                }
            }
        }
        if (
            !$(form)
                .find("[name='conditions']")
                .is(":checked")
        ) {
            errors.push(message);
            $(form)
                .find("[name='conditions']")
                .parents(".control-label")
                .addClass("-error")
                .find(".input__error")
                .html("Подтвердите условия");
        } else
            $(form)
                .find("[name='conditions']")
                .parents(".control-label")
                .removeClass("-error");

        $('.form__regions-item').each(function(){
            var value = $(this).text().trim()
            data.regions.push(value);
        })

        if (data.regions.length == 0){
           errors.push(message); 
           $(form)
                .find("[name='regions']")
                .parents(".input")
                .addClass("-error")                
                .find(".input__error")
                .html("Введите хотя бы один регион");
        }

        //console.log("step1:", step1, "; step2:", step2, errors, data);

        if (step1 && !errors.length) {
            button
                .parents(".form__container")
                .find(".-step1")
                .fadeOut("slow", function() {
                    button
                        .parents(".form__container")
                        .find(".-step2")
                        .fadeIn();
                });
        }
        else{
            if (step2 && !errors.length){
                $.ajax({
                    type: "post",
                    async: false,
                    dataType: "json",
                    cache: false,
                    url: src,
                    data: data
                }).done(function(data) {
                    $(form)
                        .parents(".audit-form__wrap")
                        .fadeOut("slow", function() {
                            $(form)
                                .parents(".audit-form")
                                .find(".form__success")
                                .fadeIn();
                        });
                });
            }
        }
    });
});
