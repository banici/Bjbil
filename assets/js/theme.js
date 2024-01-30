'use strict';

// Cache
var body = $('body');
var mainSlider = $('#main-slider');
var imageCarousel = $('.img-carousel');
var partnersCarousel = $('#partners');
var testimonialsCarousel = $('#testimonials');
var topProductsCarousel = $('#top-products-carousel');
var featuredProductsCarousel = $('#featured-products-carousel');
var sidebarProductsCarousel = $('#sidebar-products-carousel');
var hotDealsCarousel = $('#hot-deals-carousel');
var owlCarouselSelector = $('.owl-carousel');
var isotopeContainer = $('.isotope');
var isotopeFiltrable = $('#filtrable a');
var toTop = $('#to-top');
var hover = $('.thumbnail');
var navigation = $('.navigation');
var superfishMenu = $('ul.sf-menu');
var priceSliderRange = $('#slider-range');

// Slide in/out with fade animation function
jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
//
jQuery.fn.slideFadeIn  = function(speed, easing, callback) {
    return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
};
jQuery.fn.slideFadeOut  = function(speed, easing, callback) {
    return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
};

jQuery(document).ready(function () {
    // Prevent empty links
    // ---------------------------------------------------------------------------------------
    $('a[href=#]').click(function (event) {
        event.preventDefault();
    });
    // Sticky header/menu
    // ---------------------------------------------------------------------------------------
    if ($().sticky) {
        $('.header.fixed').sticky({topSpacing:0});
        //$('.header.fixed').on('sticky-start', function() { console.log("Started"); });
        //$('.header.fixed').on('sticky-end', function() { console.log("Ended"); });
    }
    // SuperFish menu
    // ---------------------------------------------------------------------------------------
    if ($().superfish) {
        superfishMenu.superfish();
    }
    $('ul.sf-menu a').click(function () {
        body.scrollspy('refresh');
    });
    // Fixed menu toggle
    $('.menu-toggle').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    $('.menu-toggle-close').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    // Smooth scrolling
    // ----------------------------------------------------------------------------------------
    $('.sf-menu a, .scroll-to').click(function () {

        $('.sf-menu a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, {
            duration: 1200,
            easing: 'easeInOutExpo'
        });
        return false;
    });
    // BootstrapSelect
    // ---------------------------------------------------------------------------------------
    if ($().selectpicker) {
        $('.selectpicker').selectpicker();
    }
    // prettyPhoto
    // ---------------------------------------------------------------------------------------
    if ($().prettyPhoto) {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'light_rounded',controlNav: true
        });
    }

    // Scroll totop button
    // ---------------------------------------------------------------------------------------
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            toTop.css({bottom: '15px'});
        } else {
            toTop.css({bottom: '-100px'});
        }
    });
    toTop.click(function () {
        $('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });
    // Add hover class for correct view on mobile devices
    // ---------------------------------------------------------------------------------------
    hover.hover(
        function () {
            $(this).addClass('hover');
        },
        function () {
            $(this).removeClass('hover');
        }
    );
    // Sliders
    // ---------------------------------------------------------------------------------------
    if ($().owlCarousel) {
        var owl = $('.owl-carousel');
        owl.on('changed.owl.carousel', function(e) {
            // update prettyPhoto
            if ($().prettyPhoto) {
                $("a[data-gal^='prettyPhoto']").prettyPhoto({
                    theme: 'dark_square'
                });
            }
        });
        // Main slider
        if (mainSlider.length) {
            mainSlider.owlCarousel({
                //items: 1,
                animateOut: 'flipOutX',
				
				smartSpeed:450,
				
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: true,
                
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
        // Top products carousel
        if (topProductsCarousel.length) {
            topProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 4},
                    1024: {items: 5},
                    1280: {items: 6}
                }
            });
        }
        // Featured products carousel
        if (featuredProductsCarousel.length) {
            featuredProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 2},
                    991: {items: 3},
                    1024: {items: 4}
                }
            });
        }
        // Sidebar products carousel
        if (sidebarProductsCarousel.length) {
            sidebarProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
        // Partners carousel
        if (partnersCarousel.length) {
            partnersCarousel.owlCarousel({
                autoplay: true,
                loop: true,
                margin: 0,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 4},
                    1024: {items: 5},
                    1280: {items: 6}
                }
            });
        }
        // Testimonials carousel
        if (testimonialsCarousel.length) {
            testimonialsCarousel.owlCarousel({
                autoplay: true,
                loop: true,
                margin: 0,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1},
                    1280: {items: 1}
                }
            });
        }
        // Images carousel
        if (imageCarousel.length) {
            imageCarousel.owlCarousel({
                autoplay: truw,
                loop: true,
                margin: 0,
                dots: true,
                nav: true,
				navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
    }
    // countdown
    // ---------------------------------------------------------------------------------------
    if ($().countdown) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#dealCountdown1').countdown({until: austDay});
        $('#dealCountdown2').countdown({until: austDay});
        $('#dealCountdown3').countdown({until: austDay});
    }
    // Google map
    // ---------------------------------------------------------------------------------------
    if (typeof google === 'object' && typeof google.maps === 'object') {
        if ($('#map-canvas').length) {
            var map;
            var marker;
            var image = 'assets/img/icon-google-map.png'; // marker icon
            google.maps.event.addDomListener(window, 'load', function () {
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 12,
                    center: new google.maps.LatLng(40.9807648, 28.9866516) // map coordinates
                };

                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(41.0096559,28.9755535), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
            });
        }
    }
    // Price range / need jquery ui
    // ---------------------------------------------------------------------------------------
    if ($.ui) {
        if ($(priceSliderRange).length) {
            $(priceSliderRange).slider({
                range: true,
                min: 0,
                max: 500,
                values: [75, 300],
                slide: function (event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                }
            });
            $("#amount").val(
                "$" + $("#slider-range").slider("values", 0) +
                " - $" + $("#slider-range").slider("values", 1)
            );
        }
    }
    // Shop categories widget slide in/out
    // ---------------------------------------------------------------------------------------
    $('.shop-categories .arrow').click(
        function () {

            $(this).parent().parent().find('ul.children').removeClass('active');
            $(this).parent().parent().find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
            if ($(this).parent().find('ul.children').is(":visible")) {
                //$(this).find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
                //$(this).parent().find('ul.children').removeClass('active');
            }
            else {
                $(this).find('.fa-angle-down').addClass('fa-angle-up').removeClass('fa-angle-down');
                $(this).parent().find('ul.children').addClass('active');
            }
            $(this).parent().parent().find('ul.children').each(function () {
                if (!$(this).hasClass('active')) {
                    $(this).slideFadeOut();
                }
                else {
                    $(this).slideFadeIn();
                }
            });
        }
    );
    $('.shop-categories ul.children').each(function () {
        if (!$(this).hasClass('active')) {
            $(this).hide();
        }
    });
});

jQuery(window).load(function () {
    // Preloader
    $('#status').fadeOut();
    $('#preloader').delay(200).fadeOut(200);
    // Isotope
    if ($().isotope) {
        isotopeContainer.isotope({ // initialize isotope
            itemSelector: '.isotope-item' // options...
            //,transitionDuration: 0 // disable transition
        });
        isotopeFiltrable.click(function () { // filter items when filter link is clicked
            var selector = $(this).attr('data-filter');
            isotopeFiltrable.parent().removeClass('current');
            $(this).parent().addClass('current');
            isotopeContainer.isotope({filter: selector});
            return false;
        });
        isotopeContainer.isotope('reLayout'); // layout/reLayout
    }
    // Scroll to hash
    if (location.hash != '') {
        var hash = '#' + window.location.hash.substr(1);
        if (hash.length) {
            body.delay(0).animate({
                scrollTop: jQuery(hash).offset().top
            }, {
                duration: 1200,
                easing: "easeInOutExpo"
            });
        }
    }
    // OwlSliders
    if ($().owlCarousel) {
        // Hot deal carousel
        // must initialized after counters
        if (hotDealsCarousel.length) {
            hotDealsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
    }
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
});

jQuery(window).resize(function () {
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
    // Refresh isotope
    if ($().isotope) {
        isotopeContainer.isotope('reLayout'); // layout/relayout on window resize
    }
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});

jQuery(window).scroll(function () {
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});
if ($('#modal1').length) {
		var modal = $('#modal1');
		var pause = 0;
		if (modal.attr('data-pause') > 0) {
			pause = modal.attr('data-pause')
		}
		setTimeout(function () {
			modal.modal('show');
		}, pause);
	}

	// modal interval
	if ($('.modal-countdown').length) {
		var counter;
		$('.modal-countdown').on('hidden.bs.modal', function () {
			var $modal = $(this);
			if ($modal.attr('data-interval') > 0) {
				$('.count', $modal).html('').fadeOut();
				clearInterval(counter);
			}
		});
		$('.modal-countdown').on('shown.bs.modal', function () {
			var interval = 0,
				$modal = $(this);
			if ($modal.attr('data-interval') > 0) {
				interval = $modal.attr('data-interval')
			}
			var count = interval / 1000;
			if (count > 0) {
				$('.modal-countdown', $modal).show();
				$('.count', $modal).html(count).fadeIn();
				counter = setInterval(
					function modalCount() {
						if (count > 0) {
							count -= 1;
							$('.count', $modal).html(count);
						} else {
							$modal.modal('hide').removeData('bs.modal');
							clearInterval(counter)
						}
					}, 1000);
			}
		});
	}



// 'use strict';

// // Cache
// var body = document.querySelector('body');
// var mainSlider = document.querySelector('#main-slider');
// var imageCarousel = document.querySelectorAll('.img-carousel');
// var partnersCarousel = document.querySelector('#partners');
// var testimonialsCarousel = document.querySelector('#testimonials');
// var topProductsCarousel = document.querySelector('#top-products-carousel');
// var featuredProductsCarousel = document.querySelector('#featured-products-carousel');
// var sidebarProductsCarousel = document.querySelector('#sidebar-products-carousel');
// var hotDealsCarousel = document.querySelector('#hot-deals-carousel');
// var owlCarouselSelector = document.querySelectorAll('.owl-carousel');
// var isotopeContainer = document.querySelectorAll('.isotope');
// var isotopeFiltrable = document.querySelectorAll('#filtrable a');
// var toTop = document.querySelector('#to-top');
// var hover = document.querySelectorAll('.thumbnail');
// var navigation = document.querySelector('.navigation');
// var superfishMenu = document.querySelector('ul.sf-menu');
// var priceSliderRange = document.querySelector('#slider-range');

// // Slide in/out with fade animation function
// function slideFadeToggle(element, speed, easing, callback) {
//     var isVisible = window.getComputedStyle(element).display !== 'none';
//     var newDisplay = isVisible ? 'none' : 'block';
    
//     element.style.transition = 'opacity ' + speed + ' ' + easing + ', height ' + speed + ' ' + easing;
//     element.style.opacity = isVisible ? 0 : 1;
//     element.style.height = isVisible ? 0 : 'auto';

//     setTimeout(function() {
//         element.style.display = newDisplay;
//         if (callback) callback();
//     }, speed);
// }

// function slideFadeIn(element, speed, easing, callback) {
//     element.style.transition = 'opacity ' + speed + ' ' + easing + ', height ' + speed + ' ' + easing;
//     element.style.opacity = 1;
//     element.style.height = 'auto';

//     setTimeout(function() {
//         if (callback) callback();
//     }, speed);
// }

// function slideFadeOut(element, speed, easing, callback) {
//     element.style.transition = 'opacity ' + speed + ' ' + easing + ', height ' + speed + ' ' + easing;
//     element.style.opacity = 0;
//     element.style.height = 0;

//     setTimeout(function() {
//         element.style.display = 'none';
//         if (callback) callback();
//     }, speed);
// }

// document.addEventListener('DOMContentLoaded', function () {
//     // Prevent empty links
//     // ---------------------------------------------------------------------------------------
//     var emptyLinks = document.querySelectorAll('a[href="#"]');
//     emptyLinks.forEach(function(link) {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();
//         });
//     });

//     // Sticky header/menu
//     // ---------------------------------------------------------------------------------------
//     var headerFixed = document.querySelector('.header.fixed');

// // Check if the element exists
// if (headerFixed) {
//     // Add a class to enable 'position: sticky'
//     headerFixed.classList.add('sticky');
// }

//     // SuperFish menu
//     // ---------------------------------------------------------------------------------------
//     var superfishMenu = document.querySelector('ul.sf-menu');
//     if (superfishMenu) {
//         // Add a class to enable Superfish styles (if needed)
//         superfishMenu.classList.add('sf-menu');
    
//         // Attach click event listeners to the links inside the menu
//         var superfishLinks = superfishMenu.querySelectorAll('a');
//         superfishLinks.forEach(function(link) {
//             link.addEventListener('click', function () {
//                 // Replace the body.scrollspy('refresh') with your logic
//                 // as scrollspy is not a native JavaScript method
//                 // For example: document.body.style.background = 'red';
//             });
//         });
//     }

//     // Fixed menu toggle
//     var menuToggle = document.querySelector('.menu-toggle');
//     if (menuToggle) {
//         menuToggle.addEventListener('click', function () {
//             if (navigation.classList.contains('opened')) {
//                 navigation.classList.remove('opened');
//                 navigation.classList.add('closed');
//             } else {
//                 navigation.classList.remove('closed');
//                 navigation.classList.add('opened');
//             }
//         });
//     }

//     var menuToggleClose = document.querySelector('.menu-toggle-close');
//     if (menuToggleClose) {
//         menuToggleClose.addEventListener('click', function () {
//             if (navigation.classList.contains('opened')) {
//                 navigation.classList.remove('opened');
//                 navigation.classList.add('closed');
//             } else {
//                 navigation.classList.remove('closed');
//                 navigation.classList.add('opened');
//             }
//         });
//     }

//     // Smooth scrolling
//     // ----------------------------------------------------------------------------------------
//     var sfMenuLinks = document.querySelectorAll('.sf-menu a');
//     var scrollToLinks = document.querySelectorAll('.scroll-to');
//     var handleScroll = function (event) {
//         sfMenuLinks.forEach(function(link) {
//             link.classList.remove('active');
//         });

//         event.target.classList.add('active');

//         var targetElement = document.querySelector(event.target.getAttribute('href'));
//         if (targetElement) {
//             event.preventDefault();
//             window.scrollTo({
//                 top: targetElement.offsetTop,
//                 behavior: 'smooth'
//             });
//         }
//     };
//     sfMenuLinks.forEach(function(link) {
//         link.addEventListener('click', handleScroll);
//     });

//     scrollToLinks.forEach(function(link) {
//         link.addEventListener('click', handleScroll);
//     });

//     // BootstrapSelect
//     // ---------------------------------------------------------------------------------------
//     if (document.querySelector('.selectpicker')) {
//         new BootstrapSelect('.selectpicker');
//     }

//     // prettyPhoto
//     // ---------------------------------------------------------------------------------------
//     if (document.querySelector('a[data-gal^="prettyPhoto"]')) {
//         document.querySelector('a[data-gal^="prettyPhoto"]').addEventListener('click', function () {
//             if (window.prettyPhoto) {
//                 prettyPhoto({
//                     theme: 'light_rounded',
//                     controlNav: true
//                 });
//             }
//         });
//     }

//     // Scroll totop button
//     // ---------------------------------------------------------------------------------------
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 1) {
//             toTop.style.bottom = '15px';
//         } else {
//             toTop.style.bottom = '-100px';
//         }
//     });

//     toTop.addEventListener('click', function () {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });

//     // Add hover class for correct view on mobile devices
//     // ---------------------------------------------------------------------------------------
//     hover.forEach(function(item) {
//         item.addEventListener('mouseenter', function () {
//             item.classList.add('hover');
//         });

//         item.addEventListener('mouseleave', function () {
//             item.classList.remove('hover');
//         });
//     });

//     // Sliders
//     // ---------------------------------------------------------------------------------------
//     if (document.querySelector('.owl-carousel')) {
//         var owl = document.querySelector('.owl-carousel');
//         owl.addEventListener('changed.owl.carousel', function (e) {
//             // update prettyPhoto
//             if (window.prettyPhoto) {
//                 prettyPhoto({
//                     theme: 'dark_square'
//                 });
//             }
//         });

//         // Main slider
//         if (mainSlider) {
//             var mainSliderOptions = {
//                 animateOut: 'flipOutX',
//                 smartSpeed: 450,
//                 autoplay: true,
//                 autoplayHoverPause: true,
//                 loop: true,
//                 margin: 0,
//                 dots: true,
//                 nav: true,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsiveRefreshRate: 100,
//                 responsive: {
//                     0: { items: 1 },
//                     479: { items: 1 },
//                     768: { items: 1 },
//                     991: { items: 1 },
//                     1024: { items: 1 }
//                 }
//             };
//             new OwlCarousel(mainSlider, mainSliderOptions);
//         }


//         // Top products carousel
// if (topProductsCarousel) {
//     var topProductsOptions = {
//         autoplay: false,
//         loop: true,
//         margin: 30,
//         dots: false,
//         nav: true,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsive: {
//             0: { items: 1 },
//             479: { items: 2 },
//             768: { items: 3 },
//             991: { items: 4 },
//             1024: { items: 5 },
//             1280: { items: 6 }
//         }
//     };
//     new OwlCarousel(topProductsCarousel, topProductsOptions);
// }

// // Featured products carousel
// if (featuredProductsCarousel) {
//     var featuredProductsOptions = {
//         autoplay: false,
//         loop: true,
//         margin: 30,
//         dots: false,
//         nav: true,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsive: {
//             0: { items: 1 },
//             479: { items: 1 },
//             768: { items: 2 },
//             991: { items: 3 },
//             1024: { items: 4 }
//         }
//     };
//     new OwlCarousel(featuredProductsCarousel, featuredProductsOptions);
// }

// // Sidebar products carousel
// if (sidebarProductsCarousel) {
//     var sidebarProductsOptions = {
//         autoplay: false,
//         loop: true,
//         margin: 30,
//         dots: true,
//         nav: false,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsive: {
//             0: { items: 1 },
//             479: { items: 1 },
//             768: { items: 1 },
//             991: { items: 1 },
//             1024: { items: 1 }
//         }
//     };
//     new OwlCarousel(sidebarProductsCarousel, sidebarProductsOptions);
// }

// // Partners carousel
// if (partnersCarousel) {
//     var partnersOptions = {
//         autoplay: true,
//         loop: true,
//         margin: 0,
//         dots: true,
//         nav: false,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsive: {
//             0: { items: 1 },
//             479: { items: 2 },
//             768: { items: 3 },
//             991: { items: 4 },
//             1024: { items: 5 },
//             1280: { items: 6 }
//         }
//     };
//     new OwlCarousel(partnersCarousel, partnersOptions);
// }

// // Testimonials carousel
// if (testimonialsCarousel) {
//     var testimonialsOptions = {
//         autoplay: true,
//         loop: true,
//         margin: 0,
//         dots: false,
//         nav: true,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsive: {
//             0: { items: 1 },
//             479: { items: 1 },
//             768: { items: 1 },
//             991: { items: 1 },
//             1024: { items: 1 },
//             1280: { items: 1 }
//         }
//     };
//     new OwlCarousel(testimonialsCarousel, testimonialsOptions);
// }

// // Images carousel
// if (imageCarousel) {
//     var imageOptions = {
//         autoplay: true,
//         loop: true,
//         margin: 0,
//         dots: true,
//         nav: true,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsiveRefreshRate: 100,
//         responsive: {
//             0: { items: 1 },
//             479: { items: 1 },
//             768: { items: 1 },
//             991: { items: 1 },
//             1024: { items: 1 }
//         }
//     };
//     new OwlCarousel(imageCarousel[0], imageOptions);
// }

//    // Countdown
// if (typeof Countdown !== 'undefined') {
//     var austDay = new Date();
//     austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
//     Countdown.create($('#dealCountdown1')[0], { until: austDay });
//     Countdown.create($('#dealCountdown2')[0], { until: austDay });
//     Countdown.create($('#dealCountdown3')[0], { until: austDay });
// }

// // Google Map
// if (typeof google === 'object' && typeof google.maps === 'object') {
//     var mapCanvas = document.getElementById('map-canvas');
//     if (mapCanvas) {
//         var map;
//         var marker;
//         var image = 'assets/img/icon-google-map.png'; // marker icon

//         function initializeMap() {
//             var mapOptions = {
//                 scrollwheel: false,
//                 zoom: 12,
//                 center: new google.maps.LatLng(40.9807648, 28.9866516) // map coordinates
//             };

//             map = new google.maps.Map(mapCanvas, mapOptions);
//             marker = new google.maps.Marker({
//                 position: new google.maps.LatLng(41.0096559, 28.9755535), // marker coordinates
//                 map: map,
//                 icon: image,
//                 title: 'Hello World!'
//             });
//         }

//         google.maps.event.addDomListener(window, 'load', initializeMap);
//     }
// }

// // Price range / jQuery UI
// if (typeof $ !== 'undefined' && $.ui) {
//     var priceSliderRange = document.getElementById('slider-range');

//     if (priceSliderRange) {
//         $(priceSliderRange).slider({
//             range: true,
//             min: 0,
//             max: 500,
//             values: [75, 300],
//             slide: function (event, ui) {
//                 $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//             }
//         });

//         $("#amount").val(
//             "$" + $(priceSliderRange).slider("values", 0) +
//             " - $" + $(priceSliderRange).slider("values", 1)
//         );
//     }
// }

//    // Shop categories widget slide in/out
// var shopCategoriesArrows = document.querySelectorAll('.shop-categories .arrow');
// var shopCategoriesChildren = document.querySelectorAll('.shop-categories ul.children');

// shopCategoriesArrows.forEach(function (arrow) {
//     arrow.addEventListener('click', function () {
//         var parent = this.parentElement.parentElement;
//         var children = parent.querySelectorAll('ul.children');
//         var angleUp = parent.querySelectorAll('.fa-angle-up');

//         children.forEach(function (child) {
//             child.classList.remove('active');
//         });

//         angleUp.forEach(function (angle) {
//             angle.classList.add('fa-angle-down');
//             angle.classList.remove('fa-angle-up');
//         });

//         if (this.parentElement.querySelector('ul.children').style.display === 'block') {
//             // Code for when the ul.children is visible
//             // Example: this.parentElement.querySelector('ul.children').classList.remove('active');
//         } else {
//             this.querySelector('.fa-angle-down').classList.add('fa-angle-up');
//             this.parentElement.querySelector('ul.children').classList.add('active');
//         }

//         parent.querySelectorAll('ul.children').forEach(function (child) {
//             if (!child.classList.contains('active')) {
//                 // Code for when ul.children does not have the 'active' class
//                 // Example: child.slideFadeOut();
//             } else {
//                 // Code for when ul.children has the 'active' class
//                 // Example: child.slideFadeIn();
//             }
//         });
//     });
// });

// document.querySelectorAll('.shop-categories ul.children').forEach(function (child) {
//     if (!child.classList.contains('active')) {
//         // Code for when ul.children does not have the 'active' class
//         // Example: child.hide();
//     }
// });


// // Preloader
// window.addEventListener('load', function () {
//     var status = document.getElementById('status');
//     var preloader = document.getElementById('preloader');

//     if (status && preloader) {
//         status.style.display = 'none';
//         preloader.style.transitionDuration = '0.2s';
//         setTimeout(function () {
//             preloader.style.display = 'none';
//         }, 200);
//     }

//     // Isotope
//     if (typeof isotopeContainer !== 'undefined' && typeof isotopeFiltrable !== 'undefined' && typeof $().isotope !== 'undefined') {
//         isotopeContainer.isotope({
//             itemSelector: '.isotope-item'
//         });

//         isotopeFiltrable.forEach(function (filtrable) {
//             filtrable.addEventListener('click', function () {
//                 var selector = this.getAttribute('data-filter');
//                 isotopeFiltrable.forEach(function (element) {
//                     element.parentElement.classList.remove('current');
//                 });
//                 this.parentElement.classList.add('current');
//                 isotopeContainer.isotope({ filter: selector });
//                 return false;
//             });
//         });

//         isotopeContainer.isotope('layout');
//     }

//     // Scroll to hash
//     if (location.hash !== '') {
//         var hash = '#' + window.location.hash.substr(1);
//         if (hash.length) {
//             document.body.style.scrollBehavior = 'smooth';
//             setTimeout(function () {
//                 document.body.scrollTop = document.documentElement.scrollTop = document.querySelector(hash).offsetTop;
//                 document.body.style.scrollBehavior = 'auto';
//             }, 1200);
//         }
//     }

//     // OwlSliders
//     if (typeof $().owlCarousel !== 'undefined') {
//         if (typeof hotDealsCarousel !== 'undefined' && hotDealsCarousel.length) {
//             hotDealsCarousel.owlCarousel({
//                 autoplay: false,
//                 loop: true,
//                 margin: 30,
//                 dots: true,
//                 nav: false,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsive: {
//                     0: { items: 1 },
//                     479: { items: 1 },
//                     768: { items: 1 },
//                     991: { items: 1 },
//                     1024: { items: 1 }
//                 }
//             });
//         }
//     }

//     // Refresh owl carousels/sliders
//     if (typeof owlCarouselSelector !== 'undefined') {
//         owlCarouselSelector.trigger('refresh');
//         owlCarouselSelector.trigger('refresh.owl.carousel');
//     }
// });

// // Window Resize
// window.addEventListener('resize', function () {
//     // Refresh owl carousels/sliders
//     if (typeof owlCarouselSelector !== 'undefined') {
//         owlCarouselSelector.trigger('refresh');
//         owlCarouselSelector.trigger('refresh.owl.carousel');
//     }

//     // Refresh isotope
//     if (typeof $().isotope !== 'undefined' && typeof isotopeContainer !== 'undefined') {
//         isotopeContainer.isotope('layout');
//     }

//     if (typeof $().sticky !== 'undefined' && typeof $('.header.fixed') !== 'undefined') {
//         $('.header.fixed').sticky('update');
//     }
// });

// // Window Scroll
// window.addEventListener('scroll', function () {
//     // Refresh owl carousels/sliders
//     if (typeof owlCarouselSelector !== 'undefined') {
//         owlCarouselSelector.trigger('refresh');
//         owlCarouselSelector.trigger('refresh.owl.carousel');
//     }

//     if (typeof $().sticky !== 'undefined' && typeof $('.header.fixed') !== 'undefined') {
//         $('.header.fixed').sticky('update');
//     }
// });

// // Modal
// if (typeof $('#modal1') !== 'undefined') {
//     var modal1 = document.getElementById('modal1');
//     if (modal1) {
//         var pause = modal1.getAttribute('data-pause') > 0 ? modal1.getAttribute('data-pause') : 0;
//         setTimeout(function () {
//             $(modal1).modal('show');
//         }, pause);
//     }
// }

// // Modal Countdown
// if (typeof $('.modal-countdown') !== 'undefined') {
//     var counter;
//     $('.modal-countdown').on('hidden.bs.modal', function () {
//         var modal = $(this);
//         if (modal.attr('data-interval') > 0) {
//             $('.count', modal).html('').fadeOut();
//             clearInterval(counter);
//         }
//     });
//     $('.modal-countdown').on('shown.bs.modal', function () {
//         var interval = $(this).attr('data-interval') > 0 ? $(this).attr('data-interval') : 0;
//         var modal = $(this);
//         var count = interval / 1000;
//         if (count > 0) {
//             $('.modal-countdown', modal).show();
//             $('.count', modal).html(count).fadeIn();
//             counter = setInterval(function modalCount() {
//                 if (count > 0) {
//                     count -= 1;
//                     $('.count', modal).html(count);
//                 } else {
//                     modal.modal('hide').removeData('bs.modal');
//                     clearInterval(counter);
//                   }
//                 }, 1000);
//               }
//             });
//         }
//     }
// });
