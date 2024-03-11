'use strict';

// Cache
var body = document.querySelector('body');
var mainSlider = document.querySelector('#main-slider');
var imageCarousel = document.querySelectorAll('.img-carousel');
var partnersCarousel = document.querySelector('#partners');
var testimonialsCarousel = document.querySelector('#testimonials');
var topProductsCarousel = document.querySelector('#top-products-carousel');
var featuredProductsCarousel = document.querySelector('#featured-products-carousel');
var sidebarProductsCarousel = document.querySelector('#sidebar-products-carousel');
var hotDealsCarousel = document.querySelector('#hot-deals-carousel');
var owlCarouselSelector = document.querySelectorAll('.owl-carousel');
var isotopeContainer = document.querySelectorAll('.isotope');
var isotopeFiltrable = document.querySelectorAll('#filtrable a');
var toTop = document.querySelector('#to-top');
var hover = document.querySelectorAll('.thumbnail');
var navigation = document.querySelector('.navigation');
var superfishMenu = document.querySelector('ul.sf-menu');
var priceSliderRange = document.querySelector('#slider-range');
var letsMixIt = false;
var selectedCustomerBox;
var selectedContainer;
var selectedParent;
var isMobileView;
var containerContent;


function checkScreenSize() {
    isMobileView = window.innerWidth <= 990;
  }
  
// Call the function on initial load
checkScreenSize();

// Add an event listener for resize events
window.addEventListener("resize", checkScreenSize);


// Loads all the videos beforehand to reduce load time
document.addEventListener('DOMContentLoaded', function () {
    var videos = document.querySelectorAll('.video-container video');
    if (videos.length > 0) {
        videos.forEach(function (video) {
            video.load();
        });
    }
});

// Iterates between different videos to play on homepage
document.addEventListener('DOMContentLoaded', function () {
    var videos = document.querySelectorAll('.video-container video');
    var currentVideoIndex = 0;
    
    if (videos.length > 0) {
        function playNextVideo() {
            videos[currentVideoIndex].classList.remove('active');
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            videos[currentVideoIndex].classList.add('active');
            videos[currentVideoIndex].play();
        }
    
        videos.forEach(function (video, index) {
            video.addEventListener('ended', function () {
                playNextVideo();
            });
        });
    
        // Display the first video
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].play();
    }

});

// Changes the last word in the sentence displayed on homepage
document.addEventListener('DOMContentLoaded', function () {
    var words = ['BMW', 'AUDI', 'MINI', 'VOLKSWAGEN'];
    var currentIndex = 0;
    var lastWord = document.getElementById('last-word');

    function getRandomIndex() {
        return Math.floor(Math.random() * words.length);
    }

    function replaceLastWord() {
        if (lastWord) {
            if (letsMixIt === false){
                currentIndex = getRandomIndex();
                letsMixIt = true; // this happens only once so getRandomIndex fire once
            } 
            lastWord.textContent = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;         
          }
        }

    
    // Call the function to start the replacement
    setInterval(replaceLastWord, 3000); // Change every 2 seconds (adjust as needed)
    
    // Initial replacement on page load
    replaceLastWord();
});

// // Makes the navigation bar fixed and on top when scrolling down.
document.addEventListener('DOMContentLoaded', function () {
    window.onscroll = function() {scrollFunction()};
    let mobileNav = document.getElementsByClassName("header")[0];
    function scrollFunction() {
        if (window.innerWidth < 900) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
              mobileNav.style.position = "fixed";
              mobileNav.style.zIndex = "10";
              mobileNav.style.top = "0";
              mobileNav.style.width = "100%";
            } else {
              mobileNav.style.position = "static";
            }
        } else {
            let navigationWrapper = document.getElementsByClassName("navigation-wrapper")[0];
            if (document.body.scrollTop > 210 || document.documentElement.scrollTop > 210) {
              navigationWrapper.style.position = "fixed";
            } else {
              navigationWrapper.style.position = "relative";
            }         
        }
    }
});

// Shows the extension of contact info for top bar on mobile view.
document.addEventListener('DOMContentLoaded', function () {
    var extendBoxes = document.querySelectorAll('.extend-top-bar');
    extendBoxes.forEach(function(extendBox) {
        extendBox.addEventListener('click', function() {
            var topBar = document.querySelectorAll('.top-bar');
            var toggle = this.querySelector('.top-bar-container-mobile');
            var arrow = this.querySelectorAll('.chevron-box i');

            if (toggle.id === 'open') {
                toggle.id = 'closed';
                arrow[0].classList.remove('fa-chevron-up');
                arrow[0].classList.add('fa-chevron-down');
                topBar[0].style.height = "50px";
            } else {
                toggle.id = 'open';
                arrow[0].classList.remove('fa-chevron-down');
                arrow[0].classList.add('fa-chevron-up');
                topBar[0].style.height = "165px";
                toggle.style.paddingBottom = "10px";
            }
        });
    });
});

/*This code block listens for click events on the customer service page to determine if the target is the expected element. If the target matches, the code adds the "active" class to its className. If **the click event occurs on a child element, the code updates the target variable to refer to the parentElement. The switch case then sets the content of the related element to be displayed. Finally, **the forceContentIntoDivForMobileView function is called, passing the parentElement as an argument.
*/
// Toggle the customer service info on-click
document.addEventListener("click", function(e) {
    const boxes = ['help-box', 'warranty-box', 'faq-box', 'form-box'];
    const BoxChildren = ['customer-chevron', 'fa'];
    let target = e.target.classList;
    if(boxes.includes(target[0]) || BoxChildren.includes(target[0])) {
        // Checks if clicked object has not been clicked on before
        if (selectedCustomerBox && target[0] !== selectedCustomerBox[0]) {
            selectedCustomerBox.remove("active");
            if(selectedContainer) {
                selectedContainer.remove("active");
            }
          }
        if(BoxChildren.includes(target[0])) {
            target = e.target.parentElement.classList;
        }
        target.add("active");
        selectedCustomerBox = target;
        selectedParent = e.target.parentElement;

        switch(target[0]) {
            case "help-box":
                containerContent = document.getElementsByClassName("help-container")[0];
                selectedContainer = document.getElementsByClassName("help-container")[0].classList;
                selectedContainer.add("active");
                break;
            case "warranty-box":
                containerContent = document.getElementsByClassName("warranty-container")[0];
                selectedContainer = document.getElementsByClassName("warranty-container")[0].classList;
                selectedContainer.add("active");
                break;
            case "faq-box":
                containerContent = document.getElementsByClassName("faq-container")[0];
                selectedContainer = document.getElementsByClassName("faq-container")[0].classList;
                selectedContainer.add("active");
                break;
            case "form-box":
                containerContent = document.getElementsByClassName("form-container")[0];
                selectedContainer = document.getElementsByClassName("form-container")[0].classList;
                selectedContainer.add("active");
                break;
            default:
            console.error('no target was found!');
        }  
        forceContentIntoDivForMobileView(e.target.parentElement);
    }
});


// This is for Customer Service
// When screen size is mobile then we want to have different behavior than desktop view
// and force content inside selected customer information
function forceContentIntoDivForMobileView(parent) {
    if(isMobileView) {
        const childClassName = (containerContent.children[0].className);
        if(!parent.classList.contains("active")){
            parent.classList.add("active");
            const newDiv = document.createElement('div');
            newDiv.innerHTML = containerContent.innerHTML;
            newDiv.children[0].classList.remove(childClassName);
            newDiv.children[0].classList.add("customer-mobile-info");
            newDiv.children[0].style.padding = "15px 10px 15px 20px"
            newDiv.children[0].style.borderBottom = "1px solid black";
            newDiv.children[0].style.fontSize = "17px";
            parent.appendChild(newDiv);
        } else {
            const appendedChild = parent.children[1];
            if(appendedChild) {
                parent.removeChild(appendedChild);
            }
            selectedCustomerBox.remove("active");
            parent.classList.remove("active");
        } 
    }
}


// // Slide in/out with fade animation function
// jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
//     return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
// };
// //
// jQuery.fn.slideFadeIn  = function(speed, easing, callback) {
//     return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
// };
// jQuery.fn.slideFadeOut  = function(speed, easing, callback) {
//     return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
// };

// jQuery(document).ready(function () {
//     // Prevent empty links
//     // ---------------------------------------------------------------------------------------
//     $('a[href=#]').click(function (event) {
//         event.preventDefault();
//     });
//     // Sticky header/menu
//     // ---------------------------------------------------------------------------------------
//     if ($().sticky) {
//         $('.header.fixed').sticky({topSpacing:0});
//         //$('.header.fixed').on('sticky-start', function() { console.log("Started"); });
//         //$('.header.fixed').on('sticky-end', function() { console.log("Ended"); });
//     }
//     // SuperFish menu
//     // ---------------------------------------------------------------------------------------
//     if ($().superfish) {
//         superfishMenu.superfish();
//     }
//     $('ul.sf-menu a').click(function () {
//         body.scrollspy('refresh');
//     });
//     // Fixed menu toggle
//     $('.menu-toggle').on('click', function () {
//         if (navigation.hasClass('opened')) {
//             navigation.removeClass('opened').addClass('closed');
//         } else {
//             navigation.removeClass('closed').addClass('opened');
//         }
//     });
//     $('.menu-toggle-close').on('click', function () {
//         if (navigation.hasClass('opened')) {
//             navigation.removeClass('opened').addClass('closed');
//         } else {
//             navigation.removeClass('closed').addClass('opened');
//         }
//     });
//     // Smooth scrolling
//     // ----------------------------------------------------------------------------------------
//     $('.sf-menu a, .scroll-to').click(function () {

//         $('.sf-menu a').removeClass('active');
//         $(this).addClass('active');
//         $('html, body').animate({
//             scrollTop: $($(this).attr('href')).offset().top
//         }, {
//             duration: 1200,
//             easing: 'easeInOutExpo'
//         });
//         return false;
//     });
//     // BootstrapSelect
//     // ---------------------------------------------------------------------------------------
//     if ($().selectpicker) {
//         $('.selectpicker').selectpicker();
//     }
//     // prettyPhoto
//     // ---------------------------------------------------------------------------------------
//     if ($().prettyPhoto) {
//         $("a[data-gal^='prettyPhoto']").prettyPhoto({
//             theme: 'light_rounded',controlNav: true
//         });
//     }

//     // Scroll totop button
//     // ---------------------------------------------------------------------------------------
//     $(window).scroll(function () {
//         if ($(this).scrollTop() > 1) {
//             toTop.css({bottom: '15px'});
//         } else {
//             toTop.css({bottom: '-100px'});
//         }
//     });
//     toTop.click(function () {
//         $('html, body').animate({scrollTop: '0px'}, 800);
//         return false;
//     });
//     // Add hover class for correct view on mobile devices
//     // ---------------------------------------------------------------------------------------
//     hover.hover(
//         function () {
//             $(this).addClass('hover');
//         },
//         function () {
//             $(this).removeClass('hover');
//         }
//     );
//     // Sliders
//     // ---------------------------------------------------------------------------------------
//     if ($().owlCarousel) {
//         var owl = $('.owl-carousel');
//         owl.on('changed.owl.carousel', function(e) {
//             // update prettyPhoto
//             if ($().prettyPhoto) {
//                 $("a[data-gal^='prettyPhoto']").prettyPhoto({
//                     theme: 'dark_square'
//                 });
//             }
//         });
//         // Main slider
//         if (mainSlider.length) {
//             mainSlider.owlCarousel({
//                 //items: 1,
//                 animateOut: 'flipOutX',
				
// 				smartSpeed:450,
				
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
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 1},
//                     991: {items: 1},
//                     1024: {items: 1}
//                 }
//             });
//         }
//         // Top products carousel
//         if (topProductsCarousel.length) {
//             topProductsCarousel.owlCarousel({
//                 autoplay: false,
//                 loop: true,
//                 margin: 30,
//                 dots: false,
//                 nav: true,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsive: {
//                     0: {items: 1},
//                     479: {items: 2},
//                     768: {items: 3},
//                     991: {items: 4},
//                     1024: {items: 5},
//                     1280: {items: 6}
//                 }
//             });
//         }
//         // Featured products carousel
//         if (featuredProductsCarousel.length) {
//             featuredProductsCarousel.owlCarousel({
//                 autoplay: false,
//                 loop: true,
//                 margin: 30,
//                 dots: false,
//                 nav: true,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsive: {
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 2},
//                     991: {items: 3},
//                     1024: {items: 4}
//                 }
//             });
//         }
//         // Sidebar products carousel
//         if (sidebarProductsCarousel.length) {
//             sidebarProductsCarousel.owlCarousel({
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
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 1},
//                     991: {items: 1},
//                     1024: {items: 1}
//                 }
//             });
//         }
//         // Partners carousel
//         if (partnersCarousel.length) {
//             partnersCarousel.owlCarousel({
//                 autoplay: true,
//                 loop: true,
//                 margin: 0,
//                 dots: true,
//                 nav: false,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsive: {
//                     0: {items: 1},
//                     479: {items: 2},
//                     768: {items: 3},
//                     991: {items: 4},
//                     1024: {items: 5},
//                     1280: {items: 6}
//                 }
//             });
//         }
//         // Testimonials carousel
//         if (testimonialsCarousel.length) {
//             testimonialsCarousel.owlCarousel({
//                 autoplay: true,
//                 loop: true,
//                 margin: 0,
//                 dots: false,
//                 nav: true,
//                 navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsive: {
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 1},
//                     991: {items: 1},
//                     1024: {items: 1},
//                     1280: {items: 1}
//                 }
//             });
//         }
//         // Images carousel
//         if (imageCarousel.length) {
//             imageCarousel.owlCarousel({
//                 autoplay: truw,
//                 loop: true,
//                 margin: 0,
//                 dots: true,
//                 nav: true,
// 				navText: [
//                     "<i class='fa fa-angle-left'></i>",
//                     "<i class='fa fa-angle-right'></i>"
//                 ],
//                 responsiveRefreshRate: 100,
//                 responsive: {
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 1},
//                     991: {items: 1},
//                     1024: {items: 1}
//                 }
//             });
//         }
//     }
//     // countdown
//     // ---------------------------------------------------------------------------------------
//     if ($().countdown) {
//         var austDay = new Date();
//         austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
//         $('#dealCountdown1').countdown({until: austDay});
//         $('#dealCountdown2').countdown({until: austDay});
//         $('#dealCountdown3').countdown({until: austDay});
//     }
//     // Google map
//     // ---------------------------------------------------------------------------------------
//     if (typeof google === 'object' && typeof google.maps === 'object') {
//         if ($('#map-canvas').length) {
//             var map;
//             var marker;
//             var image = 'assets/img/icon-google-map.png'; // marker icon
//             google.maps.event.addDomListener(window, 'load', function () {
//                 var mapOptions = {
//                     scrollwheel: false,
//                     zoom: 12,
//                     center: new google.maps.LatLng(40.9807648, 28.9866516) // map coordinates
//                 };

//                 map = new google.maps.Map(document.getElementById('map-canvas'),
//                     mapOptions);
//                 marker = new google.maps.Marker({
//                     position: new google.maps.LatLng(41.0096559,28.9755535), // marker coordinates
//                     map: map,
//                     icon: image,
//                     title: 'Hello World!'
//                 });
//             });
//         }
//     }
//     // Price range / need jquery ui
//     // ---------------------------------------------------------------------------------------
//     if ($.ui) {
//         if ($(priceSliderRange).length) {
//             $(priceSliderRange).slider({
//                 range: true,
//                 min: 0,
//                 max: 500,
//                 values: [75, 300],
//                 slide: function (event, ui) {
//                     $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//                 }
//             });
//             $("#amount").val(
//                 "$" + $("#slider-range").slider("values", 0) +
//                 " - $" + $("#slider-range").slider("values", 1)
//             );
//         }
//     }
//     // Shop categories widget slide in/out
//     // ---------------------------------------------------------------------------------------
//     $('.shop-categories .arrow').click(
//         function () {

//             $(this).parent().parent().find('ul.children').removeClass('active');
//             $(this).parent().parent().find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
//             if ($(this).parent().find('ul.children').is(":visible")) {
//                 //$(this).find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
//                 //$(this).parent().find('ul.children').removeClass('active');
//             }
//             else {
//                 $(this).find('.fa-angle-down').addClass('fa-angle-up').removeClass('fa-angle-down');
//                 $(this).parent().find('ul.children').addClass('active');
//             }
//             $(this).parent().parent().find('ul.children').each(function () {
//                 if (!$(this).hasClass('active')) {
//                     $(this).slideFadeOut();
//                 }
//                 else {
//                     $(this).slideFadeIn();
//                 }
//             });
//         }
//     );
//     $('.shop-categories ul.children').each(function () {
//         if (!$(this).hasClass('active')) {
//             $(this).hide();
//         }
//     });
// });

// jQuery(window).load(function () {
//     // Preloader
//     $('#status').fadeOut();
//     $('#preloader').delay(200).fadeOut(200);
//     // Isotope
//     if ($().isotope) {
//         isotopeContainer.isotope({ // initialize isotope
//             itemSelector: '.isotope-item' // options...
//             //,transitionDuration: 0 // disable transition
//         });
//         isotopeFiltrable.click(function () { // filter items when filter link is clicked
//             var selector = $(this).attr('data-filter');
//             isotopeFiltrable.parent().removeClass('current');
//             $(this).parent().addClass('current');
//             isotopeContainer.isotope({filter: selector});
//             return false;
//         });
//         isotopeContainer.isotope('reLayout'); // layout/reLayout
//     }
//     // Scroll to hash
//     if (location.hash != '') {
//         var hash = '#' + window.location.hash.substr(1);
//         if (hash.length) {
//             body.delay(0).animate({
//                 scrollTop: jQuery(hash).offset().top
//             }, {
//                 duration: 1200,
//                 easing: "easeInOutExpo"
//             });
//         }
//     }
//     // OwlSliders
//     if ($().owlCarousel) {
//         // Hot deal carousel
//         // must initialized after counters
//         if (hotDealsCarousel.length) {
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
//                     0: {items: 1},
//                     479: {items: 1},
//                     768: {items: 1},
//                     991: {items: 1},
//                     1024: {items: 1}
//                 }
//             });
//         }
//     }
//     // Refresh owl carousels/sliders
//     owlCarouselSelector.trigger('refresh');
//     owlCarouselSelector.trigger('refresh.owl.carousel');
// });

// jQuery(window).resize(function () {
//     // Refresh owl carousels/sliders
//     owlCarouselSelector.trigger('refresh');
//     owlCarouselSelector.trigger('refresh.owl.carousel');
//     // Refresh isotope
//     if ($().isotope) {
//         isotopeContainer.isotope('reLayout'); // layout/relayout on window resize
//     }
//     if ($().sticky) {
//         $('.header.fixed').sticky('update');
//     }
// });

// jQuery(window).scroll(function () {
//     // Refresh owl carousels/sliders
//     owlCarouselSelector.trigger('refresh');
//     owlCarouselSelector.trigger('refresh.owl.carousel');
//     if ($().sticky) {
//         $('.header.fixed').sticky('update');
//     }
// });
// if ($('#modal1').length) {
// 		var modal = $('#modal1');
// 		var pause = 0;
// 		if (modal.attr('data-pause') > 0) {
// 			pause = modal.attr('data-pause')
// 		}
// 		setTimeout(function () {
// 			modal.modal('show');
// 		}, pause);
// 	}

// 	// modal interval
// 	if ($('.modal-countdown').length) {
// 		var counter;
// 		$('.modal-countdown').on('hidden.bs.modal', function () {
// 			var $modal = $(this);
// 			if ($modal.attr('data-interval') > 0) {
// 				$('.count', $modal).html('').fadeOut();
// 				clearInterval(counter);
// 			}
// 		});
// 		$('.modal-countdown').on('shown.bs.modal', function () {
// 			var interval = 0,
// 				$modal = $(this);
// 			if ($modal.attr('data-interval') > 0) {
// 				interval = $modal.attr('data-interval')
// 			}
// 			var count = interval / 1000;
// 			if (count > 0) {
// 				$('.modal-countdown', $modal).show();
// 				$('.count', $modal).html(count).fadeIn();
// 				counter = setInterval(
// 					function modalCount() {
// 						if (count > 0) {
// 							count -= 1;
// 							$('.count', $modal).html(count);
// 						} else {
// 							$modal.modal('hide').removeData('bs.modal');
// 							clearInterval(counter)
// 						}
// 					}, 1000);
// 			}
// 		});
// 	}
