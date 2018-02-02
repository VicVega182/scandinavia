/* Функция проверки существования элемента */
$.fn.ex = function () {
    return $(this).length;
};
/* Функция проверки существования элемента */

/* Функция для animate.css */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
/* Функция для animate.css */

/* Функция для переключения текста */
$.fn.extend({
    toggleText: function (a, b) {
        var that = this;
        if (that.text() != a && that.text() != b) {
            that.text(a);
        } else
        if (that.text() == a) {
            that.text(b);
        } else
        if (that.text() == b) {
            that.text(a);
        }
        return this;
    }
});
/* Функция для переключения текста */

/* Функции для меню Амазон */

function activateSubmenu(row) {
    var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);
    $submenu.css({
        display: "block"
    }).animateCss('fadeIn');
}

function deactivateSubmenu(row) {
    var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);
    $submenu.css("display", "none");
}

/* Функции для меню Амазон */

$(document).ready(function () {

    flag = false;
    $fixed = false;

    $(function () {
        $.widget("custom.catcomplete", $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
            },
            _renderMenu: function (ul, items) {
                var that = this,
                        currentCategory = "";
                $.each(items, function (index, item) {
                    var li;
                    if (item.category != currentCategory) {
                        ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                        currentCategory = item.category;
                    }
                    li = that._renderItemData(ul, item);
                    if (item.category) {
                        li.attr({
                            "aria-label": item.category + " : " + item.label,
                            'data-href': item.href
                        });
                    }
                });
            }
        });
        var data = [
            {label: "Хирург", category: "Специализация", href: '/address.html'},
            {label: "Невролог", category: "Специализация", href: '/address.html'},
            {label: "Отоларинголог", category: "Специализация", href: '/address.html'},
            {label: "Проктолог", category: "Специализация", href: '/address.html'},
            {label: "Эстетическая хирургия", category: "Направление", href: '/address.html'},
            {label: "Неврология", category: "Направление", href: '/address.html'},
            {label: "Прием отолоринголога", category: "Направление", href: '/address.html'},
            {label: "Прием проктолога", category: "Направление", href: '/address.html'},
            {label: "Хирургия", category: "Направление", href: '/address.html'}
        ];

        $("#search").catcomplete({
            delay: 0,
            source: data,
            appendTo: "#appendSearch"
        });
        $("#searchHid").catcomplete({
            delay: 0,
            source: data,
            appendTo: "#hiddenSearch"
        });
    });

    /* Foundation */
    $(document).foundation();

    /* Баннер слайдер */
    if ($('.banner-slider').ex()) {
        $('.banner-slider').slick({
            dots: true,
            prevArrow: '.banner-controls .slick-prev',
            nextArrow: '.banner-controls .slick-next',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    }

    /* Текстовый слайдер */
    if ($('.text-slider').ex()) {
        $('.text-slider__slides').slick({
            prevArrow: '.text-slider__prev',
            nextArrow: '.text-slider__next',
            swipe: false
        });
    }

    /* Блог слайдер */
    if ($('.blog-slider').ex()) {
        $('.blog-slider__slides').slick({
            slidesToShow: 2,
            prevArrow: '.blog-slider__prev',
            nextArrow: '.blog-slider__next',
            swipe: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    /* Алфавит слайдер на мобильном */
    if ($('.direction-category__alphabet').ex() && device.mobile()) {
        $('.direction-category__alphabet').slick({
            variableWidth: true,
            arrows: false,
            infinite: false,
            slidesToScroll: 6
        });
    }

    /* Алфавит слайдер на мобильном */
    if ($('.doctors-alphabet').ex() && device.mobile()) {
        $('.doctors-alphabet').slick({
            variableWidth: true,
            arrows: false,
            infinite: false,
            slidesToScroll: 6
        });
    }


    /* Инициализация datepicker */
    if (!device.mobile()) {
        $(function () {
            $('[data-toggle="datepicker"]').datepicker({
                autoHide: true,
                zIndex: 2048,
                language: 'ru-RU',
                weekStart: 1
            });
        });
    } else {
        $(function () {
            $('[data-toggle="datepicker"]').datepicker({
                autoHide: true,
                zIndex: 2048,
                language: 'ru-RU',
                weekStart: 1,
                offset: '-200'
            });
        });
    }

    /* Стилизация скроллбара */
    if ($('.scrollbar-inner').ex()) {
        $('.scrollbar-inner').scrollbar();
    }

    /* Подмена плейсхолдеров */
    if ($('[data-short]').ex() && device.tablet() || device.mobile()) {
        $('[data-short]').each(function () {
            var $this = $(this);
            $this.attr('placeholder', $this.attr('data-short'));
        });
    }

}).on('change.zf.tabs', '#address', function (e) {
    /* Меняем плашку на карте/список на главной при переключении */
    var $this = $(this);
    var parent = $this.closest('.address-block');
    $this.toggleClass('removeShadow');
    if (device.mobile() && parent.find('#panel2').hasClass('is-active')) {
        $('html, body').animate({scrollTop: $('.address-block').offset().top}, 500);
    }
}).on('scroll', document, function () {
    /* Фиксированный хидер при скролле */
    var $this = $(this);
    var header = $('.header');
    if ($this.scrollTop() >= header.outerHeight() && !$fixed && !device.mobile() && !device.tablet()) {
        header.addClass('fixed');
        $('body').css('padding-top', header.outerHeight() + "px");
        $fixed = true;
    } else if ($this.scrollTop() < header.outerHeight() && $fixed && !device.mobile() && !device.tablet()) {
        header.removeClass('fixed');
        $('body').css('padding-top', "0px");
        $fixed = false;
    }
}).on('change', '.checkbox input', function () {
    /* Стилизованный чекбокс */
    var $this = $(this);
    $this.closest('label').toggleClass('checked');
}).on('afterChange', '.text-slider__slides', function (currentSlide) {
    var $this = $(this);
    $this.closest('.text-slider').find('.text-slider__controls--counter i').text(+$this.find('.slick-current').attr('data-slick-index') + 1);
    $this.closest('.text-slider').find('.text-slider__controls--text').text($this.find('.slick-current').attr('data-text'));
}).on('click tap', '.show-more-doctors', function (e) {
    if (e.handled === false)
        return;
    e.stopPropagation();
    e.preventDefault();
    e.handled = true;
    var $this = $(this);
    $this.closest('.doctors-list__item').find('.doctors-hidden-text').slideToggle();
    $this.find('span').toggleText('Подробнее', 'Скрыть');
    $this.find('i').toggleClass('rotate');
}).on('tap click', '.partners-show-all', function (e) {
    if (!flag) {
        flag = true;
        setTimeout(function () {
            flag = false;
        }, 100);
        var $this = $(this);
        $this.closest('.partners-list__item').find('.partners-hidden-text').slideToggle();
        $this.find('span').toggleText('Подробнее', 'Скрыть');
        $this.find('i').toggleClass('rotate');
    }
    return false;
}).on('click tap', '.dropdown-pane ul li a', function (e) {
    if (e.handled === false)
        return;
    e.stopPropagation();
    e.preventDefault();
    e.handled = true;
    var $this = $(this);
    $this.closest('.form-cell').find('button').text($this.text());
    $this.closest('.form-cell').find('input').val($this.attr('data-value'));
    $this.closest('.dropdown-pane').foundation('close');
}).on('click', '.js-show__search', function (e) {
    var $this = $(this);
    $this.find('i').toggleClass('icon-search-header icon-close');
    $('.hidden-search').slideToggle();
    $this.toggleClass('active');
    if ($this.hasClass('active')) {
        $('#searchHid').focus();
    } else {
        $('#searchHid').blur();
    }
    e.preventDefault();
}).on('tap', '.with-hidden-mb .title', function () {
    var $this = $(this);
    $this.closest('ul').find('li').not($this).slideToggle();
    $this.find('i').toggleClass('rotated');
}).on('tap', '.mobile-menu__show', function (e) {
    var $this = $(this);
    $('body').toggleClass('stop');
    $('.mobile-nav').toggleClass('is-open');
    $this.toggleClass('relative');
    $this.find('i').toggleClass('icon-burger icon-close');
    $('.header').toggleClass('mobile-menu-open');
    e.preventDefault();
}).on('tap', '.toggle-filter', function () {
    var $this = $(this);
    $('.direction-category__filter').toggle();
    $('body').toggleClass('stop');
}).on('tap', '.close-filter', function () {
    var $this = $(this);
    $('.direction-category__filter').toggle();
    $('body').toggleClass('stop');
}).on('tap', '.price-block__item', function (e) {
    var $this = $(this);
    if (!$(e.target).is('a')) {
        $this.closest('.price-block__item').find('.right').slideToggle();
        $this.closest('.price-block__item').find('.price-block__item--clinic').slideToggle();
    }
}).on('click', '.js-focus__search', function (e) {
    $('#search').focus();
    $(document).scrollTop($('#search').offset().top - 300);
    e.preventDefault();
}).on('focusin', '.search-block input', function (e) {
    var $this = $(this);
    $this.closest('.search-block').not('.main').find('form').css('border-color', '#10a554');
}).on('focusout', '.search-block input', function () {
    var $this = $(this);
    $this.closest('.search-block').not('.main').find('form').css('border-color', '#dddddd');
}).on('click', '.disabled', function (e) {
    e.preventDefault();
    return false;
}).on('click tap', '.ui-menu-item', function () {
    var $this = $(this);
    location.href = $this.attr('data-href');
}).on('tap', '.has-tip', function () {
    var $this = $(this);
    $this.foundation('show');
});
