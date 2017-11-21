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

    /* Foundation */
    $(document).foundation();

    /* Баннер слайдер */
    if($('.banner-slider').ex()) {
        $('.banner-slider').slick({
            dots: true,
            prevArrow: '.banner-controls .slick-prev',
            nextArrow: '.banner-controls .slick-next'
        });
    }
}).on('change.zf.tabs', '#address', function() {
    var $this = $(this);
    $this.toggleClass('removeShadow');
});
