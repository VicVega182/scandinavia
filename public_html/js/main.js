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
                        li.attr("aria-label", item.category + " : " + item.label);
                    }
                });
            }
        });
        var data = [
            {label: "Хирург", category: "Специализация"},
            {label: "Невролог", category: "Специализация"},
            {label: "Отоларинголог", category: "Специализация"},
            {label: "Проктолог", category: "Специализация"},
            {label: "Эстетическая хирургия", category: "Направление"},
            {label: "Неврология", category: "Направление"},
            {label: "Прием отолоринголога", category: "Направление"},
            {label: "Прием проктолога", category: "Направление"},
            {label: "Хирургия", category: "Направление"}
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
            nextArrow: '.text-slider__next'
        });
    }

    /* Блог слайдер */
    if ($('.blog-slider').ex()) {
        $('.blog-slider__slides').slick({
            slidesToShow: 2,
            prevArrow: '.blog-slider__prev',
            nextArrow: '.blog-slider__next'
        });
    }


    /* Инициализация datepicker */
    $(function () {
        $('[data-toggle="datepicker"]').datepicker({
            autoHide: true,
            zIndex: 2048,
            language: 'ru-RU',
            weekStart: 1
        });
    });

    /* Стилизация скроллбара */
    if ($('.scrollbar-inner').ex()) {
        $('.scrollbar-inner').scrollbar();
    }

}).on('change.zf.tabs', '#address', function () {
    /* Меняем плашку на карте/список на главной при переключении */
    var $this = $(this);
    $this.toggleClass('removeShadow');
}).on('scroll', document, function () {
    /* Фиксированный хидер при скролле */
    var $this = $(this);
    var header = $('.header');
    if ($this.scrollTop() >= header.outerHeight() && !$fixed && !device.mobile()) {
        header.addClass('fixed');
        $('body').css('padding-top', header.outerHeight() + "px");
        $fixed = true;
    } else if ($this.scrollTop() < header.outerHeight() && $fixed && !device.mobile()) {
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
}).on('click touchstart', '.show-more-doctors', function () {
    var $this = $(this);
    $this.closest('.doctors-list__item').find('.doctors-hidden-text').slideToggle();
    $this.find('span').toggleText('Подробнее', 'Скрыть');
}).on('click touchstart', '.partners-show-all', function () {
    var $this = $(this);
    $this.closest('.partners-list__item').find('.partners-hidden-text').slideToggle();
    $this.find('span').toggleText('Подробнее', 'Скрыть');
}).on('click touchstart', '.dropdown-pane ul li a', function () {
    var $this = $(this);
    $this.closest('.form-cell').find('button').text($this.text());
    $this.closest('.form-cell').find('input').val($this.attr('data-value'));
}).on('click', '.js-show__search', function (e) {
    var $this = $(this);
    $('.hidden-search').slideToggle();
    e.preventDefault();
}).on('click touchstart', '.hidden-form-close', function (e) {
    var $this = $(this);
    $('.hidden-search').slideToggle();
    e.preventDefault();
}).on('touchstart', '.with-hidden-mb .title', function () {
    var $this = $(this);
    $this.closest('ul').find('li').not($this).slideToggle();
    $this.find('i').toggleClass('rotated');
}).on('touchstart', '.mobile-menu__show', function (e) {
    var $this = $(this);
    $('body').toggleClass('stop');
    $('.mobile-nav').toggleClass('is-open');
    $this.toggleClass('relative');
    $this.find('i').toggleClass('icon-burger icon-close');
    e.preventDefault();
}).on('touchstart', '.toggle-filter', function () {
    var $this = $(this);
    $('.direction-category__filter').toggle();
})
.on('touchstart', '.close-filter', function () {
    var $this = $(this);
    $('.direction-category__filter').toggle();
});
