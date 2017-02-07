$(document).ready(function () {
    var transparent = true;
    console.log('Ready');
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
    
    $('.parallax').scroll(function () {
        checkForNav();
    });
    
    var checkForNav = debounce(function () {
        console.log('Checking nav' + $('.parallax').scrollTop());
        
        if ($('.parallax').scrollTop() > 200) {
            console.log('Adding navbar-solid');
            
            if (transparent) {
                transparent = false;
                $('.navbar-transform').addClass('navbar-solid');
            }
        }
        else {
            if (!transparent) {
                transparent = true;
                $('.navbar-transform').removeClass('navbar-solid');
            }
        }
    }, 17);

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this
                , args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    function inView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    
    $('body').scrollspy({target: '#navbar'});
});