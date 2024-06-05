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
var jobbForm = document.querySelector('.ansok-form-container');
var mixCarmakeName = false;
var mixVideoOrder = false;
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

    function getRandomIndex() {
        return Math.floor(Math.random() * videos.length);
    }
    
    if (videos.length > 0) {
        if (mixVideoOrder === false) { // if blocket ser till att slumpmässig video startar varje besök.
            currentVideoIndex = getRandomIndex();
            mixVideoOrder = true;
        }
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
    if (isMobileView) {
        words[words.length -1] = 'VW'; 
    }
    
    var currentIndex = 0;
    var lastWord = document.getElementById('last-word');

    function getRandomIndex() {
        return Math.floor(Math.random() * words.length);
    }

    function replaceLastWord() {
        if (lastWord) {
            if (mixCarmakeName === false){
                currentIndex = getRandomIndex();
                mixCarmakeName = true; // this happens only once so getRandomIndex fire once
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


// when all are added in array and scroll does not jump on any page. Still needs to loop in a querySelector like line 129.
const elementsUnderNavigator = ['.content-area',]; // NOTE THIS WILL WORK FOR DESKTOP. SHOULD FIX FOR MOBILE WHEN EVERYTHING IS READY

// // Makes the navigation bar fixed and on top when scrolling down.
document.addEventListener('DOMContentLoaded', function () {
    window.onscroll = function() {scrollFunction()};
    let mobileNav = document.getElementsByClassName("header")[0];
    function scrollFunction() {
        if (window.innerWidth > 900) {
            let navigationWrapper = document.getElementsByClassName("navigation-wrapper")[0];
            const navigationElement = document.querySelector(".content-area"); // FIX THIS: SHOULD CHECK FOR ELEMENT UNDER THE NAVIGATOR ON EACH PAGE SO IT DOES NOT JUMP WHEN SCROLLING DOWN. THIS WAS ONLY DONE FOR TIMELINE BUT IT SHOULD BE APPLIED FOR ALL.
            if (document.body.scrollTop > 214 || document.documentElement.scrollTop > 214) {
              navigationWrapper.style.position = "fixed";
              navigationWrapper.style.boxShadow = "0px 7px 10px rgba(0, 0, 0, 0.48)";
              navigationElement.style.paddingTop = "101px";
            } else {
              navigationWrapper.style.position = "relative";
              navigationWrapper.style.boxShadow = "none";
              navigationElement.style.paddingTop = "0";
            }  
        } else {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                mobileNav.style.position = "fixed";
                mobileNav.style.zIndex = "10";
                mobileNav.style.top = "0";
                mobileNav.style.width = "100%";
                mobileNav.style.boxShadow = "0px 7px 10px rgba(0, 0, 0, 0.48)";
            } else {
                mobileNav.style.position = "static";
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
        CustomerServiceDefault(target[0]);
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

document.addEventListener("DOMContentLoaded", function() {
    var defaultFaq = document.getElementsByClassName("faq-box");
    if(defaultFaq) {
        if(isMobileView) {
            CustomerServiceDefault();
        }
    }
});

function CustomerServiceDefault(target = 'faq-box') { // set defautlt value to default target because mobile is not passing any arg.
    var defaultFaq = document.getElementsByClassName("faq-box");
    var defaultFaqContent = document.getElementsByClassName("faq-container");
    var faqActive = defaultFaq[0].classList[1];
    if (target !== 'faq-box' && faqActive === 'active') {
        defaultFaq[0].classList.remove('active');
        defaultFaqContent[0].classList.remove('active');
        return;
    } 
    if (faqActive === 'active') {
        defaultFaq[0].classList.remove('active');
        defaultFaqContent[0].classList.remove('active');
        return;
    } 
}

document.addEventListener('click', function(event) {
    if(event.target.id === 'nostalgi') {
        window.location.href = "nostalgi-page.html";
    } else if (event.target.id === 'historia') {
        window.location.href = "tidslinje.html";
    } else if (event.target.id === 'arbetarna') {
        window.location.href = "om_oss.html";
    }
});


// this block for desktop FAQ form
document.querySelectorAll('.faq-row').forEach(function(faqRow) {
    faqRow.addEventListener('click', function(event) {
        var faqExpandable = this.closest('.faq-expandable');
        var faqInfoContent = faqExpandable.querySelector('.faq-info-content');
        var iconElement = this.querySelector('.faq-operator i');

        iconElement.classList.toggle('fa-minus');
        // Toggle the 'expanded' class on .faq-info-content
        faqInfoContent.classList.toggle('expanded');

        // Adjust the max-height of .faq-info-content based on its natural height
        if (faqInfoContent.classList.contains('expanded')) {
            faqInfoContent.style.maxHeight = faqInfoContent.scrollHeight + 'px';
        } else {
            faqInfoContent.style.maxHeight = '0';
        }
    });
});

// this block for mobile FAQ form
if (isMobileView) {
    document.addEventListener('click', function(event) {
        const checkForFaqRowInMobile = ['faq-info-title', 'faq-operator'];
        const targetClass = event.target.classList[0];
    
        // Check if the clicked element is a .faq-row or a child of it
        if (targetClass === 'faq-row' || checkForFaqRowInMobile.includes(targetClass)) {
            var parentOfChildsParent = event.target.closest('.faq-expandable');
            var faqInfoContent = parentOfChildsParent.querySelector('.faq-info-content');
            faqInfoContent.classList.toggle('expanded');
    
            // Adjust the max-height of .faq-info-content based on its natural height
            if (faqInfoContent.classList.contains('expanded')) {
                faqInfoContent.style.maxHeight = faqInfoContent.scrollHeight + 'px';
            } else {
                faqInfoContent.style.maxHeight = '0';
            }
    
            // Toggle the class on the icon element
            var iconElement = parentOfChildsParent.querySelector('.faq-operator i');
            iconElement.classList.toggle('fa-minus');
        }
    });
}


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
            newDiv.children[0].style.padding = "15px"
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

const emailInput = document.getElementById("mail-input");
const submitButton = document.getElementById("subscribe-btn");

// Email validation function (replace with your preferred method)
function validateEmail(email) {
  // You can use a regular expression or a library for validation
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) && email.slice(-3) !== ".co";
  // we dont expect anyone from colombia (.co) to subscribe.
  // this way user wont accedentally press subscribe before the whole email ".com" has been typed.
}

// Event listener for input changes
emailInput.addEventListener("input", function() {
  const email = this.value;
  submitButton.disabled = !validateEmail(email); // Disable button if invalid
});

// Event listener for button click (optional)
submitButton.addEventListener("click", function() {
// add logic here to pass the email to the "Bjbil nyhetsbrev mail".
// Maybe double check if user already exist and handle that in a certain way.

  emailInput.value = "";
  submitButton.disabled = true; // Disable button again after reset
});

/** Funktion som ser till att populera bilder i nostalgi sidan utefter antalet bilder i mappen */
const galleryContainer = document.getElementById('gallery-container');
const loadMoreButton = document.getElementById('load-more');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightboxButton = document.getElementById('close-lightbox');


let currentIndex = 1;
const imagesPerPage = isMobileView ? 9 : 12;
const totalImages = 71;
function displayImages() {
    const endIndex = Math.min(currentIndex + imagesPerPage, totalImages);
    for (let i = currentIndex; i < endIndex; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.style.backgroundImage = `url(assets/img/preview/nostalgi/${i}.jpg)`;
        galleryItem.addEventListener('click', () => openLightbox(i));
      
        if (galleryContainer) {
            galleryContainer.appendChild(galleryItem);
        }
    }
  
    currentIndex += imagesPerPage;
  
    if (currentIndex >= totalImages) {
        currentIndex = 1;
      if (loadMoreButton) {
        loadMoreButton.style.display = 'none';
        }
    } else {
      if (loadMoreButton) {
        loadMoreButton.style.display = 'block';
        }
    }
}


function openLightbox(index) {
  lightboxImage.src = `assets/img/preview/nostalgi/${index}.jpg`;
  lightboxOverlay.style.display = 'flex';
  lightboxOverlay.style.overflowY = 'hidden';
  body.style.overflowY = 'hidden';
}

if (closeLightboxButton) {
  closeLightboxButton.addEventListener('click', () => {
    lightboxOverlay.style.display = 'none';
    body.style.overflowY = '';
  });

  if (isMobileView) {
    lightboxOverlay.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none';
        body.style.overflowY = '';
    });
  }
  
}

if (loadMoreButton) {
  loadMoreButton.addEventListener('click', displayImages);
}

// Display the initial 20 images
displayImages();

/** Detta hanterar animationen för mobil vy att ladda fler biler */
let isAnimating = false;

if(loadMoreButton) {
    loadMoreButton.addEventListener("click", function() {
        if (!isAnimating) {
          isAnimating = true;
          this.classList.toggle("reverse");
          setTimeout(() => {
            isAnimating = false;
          }, 2000); // Adjust the delay as needed
        }
    });
}



// ================== Timeline ============== //

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
    const containerBox = document.querySelector('.timeline-container');

    if (!containerBox) { // if user is scrolling on other page than timeline then return so appendChild wont log error in console.
        return;
    }

    const numberOfBoxes = 8;
    const triggerBottom = window.innerHeight / 5.8 * 3;

    for (let i = 1; i <= numberOfBoxes; i++) {
        // Check if the box already exists
        if (!document.querySelector(`.box-${i}`)) {
            const box = document.createElement('div');
            const boxContent = document.createElement('div');
            box.classList.add('timeline-box', `box-${i}`);
            boxContent.classList.add('timeline-box-content');

            const firstColumn = document.createElement('div');
            firstColumn.classList.add('first-column');
            const middleColumn = document.createElement('div');
            middleColumn.classList.add('middle-column');
            const middleColumnContent = document.createElement('div');
            middleColumnContent.classList.add('middle-column-content');
            const middleColumnYear = document.createElement('p');
            middleColumnYear.classList.add('middle-column-year');
            const lastColumn = document.createElement('div');
            lastColumn.classList.add('last-column');

            middleColumnYear.textContent = "202"+i; // this should be more generic.
            middleColumnContent.appendChild(middleColumnYear);
            middleColumn.appendChild(middleColumnContent);
            boxContent.appendChild(firstColumn);
            boxContent.appendChild(middleColumn);
            boxContent.appendChild(lastColumn);

            if (!isMobileView) {
                if (i % 2 !== 0) { // checks if the div is odd number
                    firstColumn.style.opacity = 0;
                } else {
                    lastColumn.style.opacity = 0;
                }
            } else {
                if (i % 2 !== 0) { // checks if the div is odd number
                    lastColumn.style.opacity = 1;
                    firstColumn.style.opacity = 0;
                } else {
                    firstColumn.style.opacity = 0;
                }
            }


            box.appendChild(boxContent);
            containerBox.appendChild(box); // Append the box to the container
        }


        const box = document.querySelector(`.box-${i}`);
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.classList.add('show');
            box.querySelector('.middle-column').classList.add('animate');
            box.querySelector('.middle-column').classList.add('delay');
        }
    }
}


/** ============== Jobb ansökan popup =================== */

if (jobbForm) {
    const formButton = document.querySelector('#ansok-btn');
    const closeForm = jobbForm.querySelector('.close-ansok');
    const formWrapper = document.querySelector('.ansok-form-wrapper');

    formButton.addEventListener('click', function() {
        jobbForm.classList.add('show-form');
        formWrapper.style.zIndex = '99';
        const form = jobbForm.querySelector('.ansok-form');

        if (form) {
            form.classList.add('show');
            form.classList.add('popup-form');
        }
    });

    closeForm.addEventListener('click', function() {
        formWrapper.style.zIndex = '-1';
        jobbForm.classList.remove('show-form');
        const form = jobbForm.querySelector('.ansok-form');

        if (form) {
            form.classList.remove('show');
            form.classList.remove('popup-form');
        }
    });

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
