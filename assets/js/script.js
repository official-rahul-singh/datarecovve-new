// menu start
let headerUl = document.querySelector('header nav');

function toggleButtons() {
  let header = document.querySelector("header");
  headerUl.classList.toggle("show-ul");
let cancel_btn= document.querySelector(".cancel-btn");

  if (!headerUl.classList.contains("show-ul")) {
    document.querySelector('.doc-overlay').remove();
    enableScroll();
  } else {
    let docOverlayDiv = document.createElement('div');
    header.appendChild(docOverlayDiv);
    docOverlayDiv.classList.add('doc-overlay');
    disableScroll();
    cancel_btn.style.display="block";

    docOverlayDiv.addEventListener('click', function (event) {
      headerUl.classList.remove("show-ul");
      docOverlayDiv.remove();
      enableScroll();
    });
  }
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}
// menu end

// mobile Dropdown  ============ start =====>
const navDropdowns = document.querySelectorAll(".dropdown");
navDropdowns.forEach((parentDropdown) => {
parentDropdown.addEventListener("click", function (e) {
this.classList.toggle("showMenu");
});

const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
subDropdowns.forEach((subDropdown) => {
subDropdown.addEventListener("click", function (event) {
   event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
});
});
});

// Add a click event listener to the document to close dropdowns when clicking outside
document.addEventListener("click", (e) => {
navDropdowns.forEach((dropdown) => {
if (!dropdown.contains(e.target)) {
   dropdown.classList.remove("showMenu");
}
});
});
// mobile Dropdown  ============ end =====>


// section2 number counter start =====>
// function createCounter(id, maxCount) {
//   let count = 0;
//   let interval = setInterval(() => {
//       let countElement = document.getElementById(id);
//       if (!countElement) {
//           console.error("Counter element with ID '" + id + "' not found.");
//           clearInterval(interval);
//           return;
//       }
//       countElement.innerHTML = ++count;
//       if (count === maxCount) {
//           clearInterval(interval);
//       }
//   }, 10);
// }

// // Create and start multiple counters
// createCounter("counter1", 90);
// createCounter("counter2", 120);
// createCounter("counter3", 60);
// createCounter("counter4", 3);

function createMultipleCounters(counterData) {
  counterData.forEach(data => {
    createCounter(data.id, data.maxCount);
  });
}

function createCounter(id, maxCount) {
  let count = 0;
  let interval = setInterval(() => {
      let countElement = document.getElementById(id);
      if (!countElement) {
          console.error("Counter element with ID '" + id + "' not found.");
          clearInterval(interval);
          return;
      }
      countElement.innerHTML = ++count;
      if (count === maxCount) {
          clearInterval(interval);
      }
  }, 10);
}

// Define the data for multiple counters
const counters = [
  { id: "counter1", maxCount: 90 },
  { id: "counter2", maxCount: 100 },
  { id: "counter3", maxCount: 60 },
  { id: "counter4", maxCount: 3 }
];
// second
const counter2 = [
  { id: "counter5", maxCount: 300 },
  { id: "counter6", maxCount: 300 },
  { id: "counter7", maxCount: 300 },
  { id: "counter8", maxCount: 300 }
];

// Call createMultipleCounters function with the counter data
createMultipleCounters(counters);
createMultipleCounters(counter2);

// section2 number counter end =======>

// testimonial slider START========
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slide-button");
  const sliderScrollbar = document.querySelector(".slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

  // const handleSlideButtons = () => {
  //     slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
  //     slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  // }

  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      // handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
// testimonial slider END========

// menu search ==== START==>
// const searchIcon = document.querySelector(".search-btn");
// const searchOverlay = document.querySelector(".search-overlay");
// const closebtn = document.querySelector(".closebtn");
// searchIcon.addEventListener("click", function () {
//     searchOverlay.classList.add("search-bar-show");
// });
// closebtn.addEventListener("click", function () {
//   searchOverlay.classList.remove("search-bar-show");
// });
// menu search ==== END==>

let calcScrollValue = () => {
let scrollProgress = document.getElementById("progress");
let progressValue = document.getElementById("progress-value");
let pos = document.documentElement.scrollTop;
let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
let scrollValue = Math.round((pos * 100) / calcHeight);
if (pos > 100) {
    scrollProgress.style.display = "grid";
} else {
    scrollProgress.style.display = "none";
}
scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});
scrollProgress.style.background = `conic-gradient(#242627 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// header-scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
	let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
	if (currentScroll > lastScrollTop) {
		// Scrolling down
		document.querySelector('header').style.top = '-70px'; // Hide header
	} else {
		// Scrolling up
		document.querySelector('header').style.top = '0'; // Show header
	}
	lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
// header scroll end

  

// search
// header search button
// let search_btn = document.querySelector('.search-btn');
// let search_input = document.querySelector('.search-input');
// let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
// let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 384 512" fill="#000"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
// let isSvg1 = true;
// search_btn.addEventListener('click', function () {
//     search_btn.innerHTML = isSvg1 ? svg2 : svg1;
//     isSvg1 = !isSvg1;
//     search_input.style.display = search_input.style.display === "block" ? "none" : "block";
// }); 


// search start
let search_btn = document.querySelector(".search-btn");
let search_input = document.querySelector(".search-input");
let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 384 512" fill="#000"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
let isSvg1 = true;

search_btn.addEventListener('click', function () {
    search_btn.innerHTML = isSvg1 ? svg2 : svg1;
    isSvg1 = !isSvg1;
    
    if (search_input.classList.contains('search-show')) {
        search_input.classList.remove('search-show');
    } else {
        search_input.classList.add('search-show');
    }
});


// search end


// accordion code start
const detailsElements = document.querySelectorAll("details");
const summaryElements = document.querySelectorAll("summary");

summaryElements.forEach((summary, index) => {
    summary.addEventListener("click", () => {
      detailsElements.forEach((details, i) => {
        if (i !== index) {
          details.open = false;
        }
      });
    });
});



 // Table Of Content   ============ start =====>
  const tableHeader = document.querySelector(".toc-header");
 const tableCrossBtn = document.querySelector(".toc-toggle-btn");
 const tableOfcontentBody = document.querySelector(".toc-wrap .toc-body");
 const tableDropdowns = document.querySelectorAll(".toc-body ul ul");

 // Function to check if it's a mobile device
 function isMobileDevice() {
     return window.innerWidth <= 768; // Adjust the width as needed
 }

 // Function to hide table of content on mobile devices
 function hideTableOfContentOnMobile() {
     if (isMobileDevice()) {
         tableOfcontentBody.classList.add("hidden");
         tableHeader.classList.remove('head-border');
     }
 }

 // Initial check to hide on page load if it's a mobile device
 if (tableHeader) {
     tableHeader.classList.add('head-border');
     hideTableOfContentOnMobile();
     const minus = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="11" height="2" rx="1" fill="#000"/></svg>';
     const plus =
         '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.68 6.2H6.8v4.12H4.79V6.2H.93V4.37h3.86V.27H6.8v4.1h3.88z" fill="#000"></path></svg>';

     tableHeader.addEventListener("click", function () {
         if (tableOfcontentBody.classList.contains("hidden")) {
             tableOfcontentBody.classList.remove("hidden");
             tableHeader.classList.add('head-border');
             tableCrossBtn.innerHTML = plus;
         } else {
             tableOfcontentBody.classList.add("hidden");
             tableHeader.classList.remove('head-border');
             tableCrossBtn.innerHTML = minus;
         }
     });
 }

 // table nested li (converted into dropdown)
 if (tableDropdowns) {
     tableDropdowns.forEach((tableDropdown) => {
         const parentli = tableDropdown.parentElement;
         parentli.classList.add("drop-down")

         parentli.addEventListener("click", function (e) {
             this.classList.toggle("showtocdrop");
         });

     });
 }

 // Check on window resize to adjust visibility
 window.addEventListener("resize", hideTableOfContentOnMobile);

 const tableOfContentItems = document.querySelectorAll(".toc-body ul li a");

 tableOfContentItems.forEach((link) => {
     link.addEventListener("click", scrollToSection);
 });

 function scrollToSection(event) {
     event.preventDefault();
     const targetId = this.getAttribute("href").substring(1);
     const targetElement = document.getElementById(targetId);
     if (targetElement) {
         const offset = targetElement.offsetTop - 100;
         const top = offset > 0 ? offset : 0;
         window.scrollTo({
             top: top,
             behavior: "smooth",
         });
     }
 }

 const observer = new IntersectionObserver(
     (entries) => {
         entries.forEach((entry) => {
             const targetId = entry.target.getAttribute("id");
             const link = document.querySelector(`.toc-body ul li a[href="#${targetId}"]`);
             if (entry.isIntersecting) {
                 link?.parentElement.classList.add("active");
             } else {
                 link?.parentElement.classList.remove("active");
             }
         });
     },
     {
         threshold: 0.5,
     }
 );
 document.querySelectorAll("h2, h3, h4, h5, h6").forEach((element) => {
     observer.observe(element);
 });
