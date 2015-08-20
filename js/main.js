// decrypt helper function
function decryptCharcode(n, start, end, offset) {
    n = n + offset;
    if (offset > 0 && n > end) {
        n = start + (n - end - 1);
    } else
        if (offset < 0 && n < start) {
            n = end - (start - n - 1);
        }
    return String.fromCharCode(n);
}
// decrypt string
function decryptString(enc, offset) {
    var dec = "";
    var len = enc.length;
    for (var i = 0; i < len; i++) {
        var n = enc.charCodeAt(i);
        if (n >= 0x2B && n <= 0x3A) {
            dec += decryptCharcode(n, 0x2B, 0x3A, offset);	// 0-9 . , - + / :
        } else
            if (n >= 0x40 && n <= 0x5A) {
                dec += decryptCharcode(n, 0x40, 0x5A, offset);	// A-Z @
            } else
                if (n >= 0x61 && n <= 0x7A) {
                    dec += decryptCharcode(n, 0x61, 0x7A, offset);	// a-z
                } else {
                    dec += enc.charAt(i);
                }
    }
    return dec;
}
// decrypt spam-protected emails
function linkTo_UnCryptMailto(s) {
    location.href = decryptString(s, -1);
}

/* -- Full Screen Viewport Container -- */
/* -- ------------------------------ -- */

$(document).ready(function () {
    init();
    $(window).scroll(function () {
        if ($(document).scrollTop() > $('#topnav').height()) {
            $('#topnav').addClass('shrink');
        } else {
            $('#topnav').removeClass('shrink');
        }
    });

    $.scrollDepth({
        elements: ['#areaFeature', '#areaMain', '#areaExtended', '#areaFooter'],
        userTiming: true,
        eventHandler: function(data) {
            ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue);
        }
    });
});


/* --- initialize functions on window load here -------------- */

function init() {
    //scrollAnchor();
    // Init carousel (needs reinit because of touch carousel)
    var $carousel = $('.carousel');
    if ($carousel.length) {

        // Dont initialze if the carousel is in a hidden container (e.g. tabs or collapsable elements)
        if (!$carousel.closest('.panel-collapse')) return;

        // Dont auto-cycling on mobile
        if (Modernizr.mq('screen and (min-width: 992px)')) {
            $carousel.carousel();
        } else {
            $carousel.carousel({interval: false});
        }
    }
    $('.carousel').bcSwipe(
        {
            threshold: 50,
            preventDefaultEvents: true
        });
    $('[data-toggle="tooltip"]').tooltip()
}


/* --- Scroll to Anchor ------------------- */

function scrollAnchor() {
    // scroll to specific anchor
    $('a').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                                           scrollTop: target.offset().top
                                       }, 650);
                return false;
            }
        }
    });
}
