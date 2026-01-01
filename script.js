
////////////////////////// JavaScript for Lightbox//////////////////////////////////////////////////////////////////////
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}
// Attach lightbox to all images with class "lightbox-img-trigger"
document.querySelectorAll('.lightbox-img-trigger').forEach(img => {
  img.addEventListener('click', function() {
    openLightbox(this.src);
  });
});
/////////////////////JS for Modals///////////////////////////////////////////////////////////////////////////
const seeMoreButtons = document.querySelectorAll(".see-more-btn");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-btn");

  seeMoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(btn.dataset.modal);
      modal.style.display = "flex";
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
////////////////////////////////PROJECTS/////////////////////////////////////////////////////////////////
const cards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // ===== Modal functionality =====
  const modal = document.getElementById("resumeModal");
  const btn = document.getElementById("resumeBtn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // ===== Mobile menu open/close =====
  function openmenu() {
    document.getElementById("sidemenu").style.right = "0";
  }

  function closemenu() {
    document.getElementById("sidemenu").style.right = "-200px";
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // ===== Page load fade-in animation =====
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////
   /* ===== Active nav link on scroll & smooth scrolling ===== */
  /* ===== Active nav link on scroll & smooth scrolling ===== */
(function() {
  const navLinks = document.querySelectorAll('nav ul li a');
  const linkForId = {};

  // Map section IDs to nav links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkForId[href.slice(1)] = link;
    }
  });

  // Navbar height for offset (adjust if using CSS variable)
  const navHeight = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-height')) || 80;

  // IntersectionObserver options
  const observerOptions = {
    root: null,
    rootMargin: `-${navHeight + 10}px 0px -40% 0px`,
    threshold: 0
  };

  // Observe sections to add/remove active class
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = linkForId[id];
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, observerOptions);

  Object.keys(linkForId).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Smooth scroll on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      
      // Special handling for #header (Home link) - scroll to top
      if (href === '#header') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // For other sections, use navbar offset
        const y = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + 8);
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      // Update active class
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Close mobile menu if open
      const nav = document.querySelector('nav');
      if (nav && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
      }
    });
  });
})();
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // ===== Navbar background transition on scroll =====
 window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return; // exit if nav not found
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
  /////////////////////////////////////////////////////////////////////////////////////////////////
// Select the logo
const logo = document.getElementById("logo");

if (logo) {
  logo.addEventListener("click", () => {
    // Force a full page reload from server
    window.location.reload(true);
  });
}

/////////////////////////////////////////////////////////////////////////////////// Tabs Function
function opentab(tabName) {

    // 1. Remove active classes
    const tabLinks = document.querySelectorAll(".tab-links");
    const tabContents = document.querySelectorAll(".tab-contents");

    tabLinks.forEach(link => link.classList.remove("active-link"));
    tabContents.forEach(content => content.classList.remove("active-tab"));

    // 2. Add active class to clicked tab link
    // event.target doesn't work with inline onclick reliably → so we find the link manually
    tabLinks.forEach(link => {
        const onClickAttr = link.getAttribute("onclick") || "";
        if (onClickAttr.includes(`'${tabName}'`)) {
            link.classList.add("active-link");
        }
    });

    // 3. Show the corresponding tab
    const tabElement = document.querySelector(`[id='${tabName}']`);

    if (tabElement) {
        tabElement.classList.add("active-tab");
    } else {
        console.error("No element found with ID:", tabName);
    }
}
//////////////////////////////////////////////////////////////////////////////
const tabs = document.querySelectorAll('.tab-links');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
    });
  });


//////////////////// Get elements///////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section-content");
  const blogSection = document.getElementById("blog-section");

  // Hide blog by default
  blogSection.style.display = "none";

  const links = {
    "home-link": "header",
    "about-link": "about",
    "experience-link": "experience-section",
    "projects-link": "projects-section",
    "blog-link": "blog-section",
    "contact-link": "contact"
  };

  Object.keys(links).forEach(linkId => {
    const link = document.getElementById(linkId);
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      document.querySelectorAll('#sidemenu a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');

      if(linkId === "blog-link") {
        // Hide all normal sections
        sections.forEach(sec => {
          if(sec.id !== "blog-section") sec.style.display = "none";
        });
        // Show blog only
        blogSection.style.display = "block";
        blogSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Show all normal sections
        sections.forEach(sec => {
          if(sec.id !== "blog-section") sec.style.display = "block";
        });
        // Hide blog
        blogSection.style.display = "none";

        // Scroll to target section
        const targetSection = document.getElementById(links[linkId]);
        if(targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const links = document.querySelectorAll('.tab-links');

  // Hide all tab content
  tabs.forEach(tab => tab.style.display = 'none');

  // Remove active class from all links
  links.forEach(link => link.classList.remove('active-link'));

  // Show selected tab and add active class
  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.classList.add('active-link');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tabLinks = document.querySelectorAll('.tab-links');
  const tabContents = document.querySelectorAll('.tab-contents');

  function openTab(tabName, element) {
    // Remove active state from all tabs
    tabLinks.forEach(tab => tab.classList.remove('active-link'));
    tabContents.forEach(content => content.classList.remove('active-tab'));

    // Activate clicked tab
    element.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadBlog() {
  fetch("blog.html")
    .then(r => r.text())
    .then(html => {
      document.getElementById("blog").innerHTML = html;
      MathJax.typeset();
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openArticle(id) {
  document.querySelector('.blog-grid').style.display = 'none';
  document.querySelectorAll('.full-article').forEach(a => a.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  if (window.MathJax) MathJax.typeset();
}

function closeArticle() {
  document.querySelector('.blog-grid').style.display = 'grid';
  document.querySelectorAll('.full-article').forEach(a => a.classList.add('hidden'));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const projects = {
  project1: {
    title: "Full Engineering Study on Electric Vehicle Battery Safety",
    description:
      "Designed a sandwich honeycomb structure to protect EV batteries from side impacts and vibrations. The study includes vehicle structure development, material selection, and crash-test simulations to reach an optimized solution.",
    tags: [
      "R&D",
      "Structural Design",
      "Material Selection",
      "Crash Test",
      "EV Safety"
    ]
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openProject(id) {
  const modal = document.getElementById("project-modal");
  const project = projects[id];

  document.getElementById("modal-title").innerText = project.title;
  document.getElementById("modal-description").innerText = project.description;

  const tagsContainer = document.getElementById("modal-tags");
  tagsContainer.innerHTML = "";
  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.innerText = tag;
    tagsContainer.appendChild(span);
  });

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeProject() {
  document.getElementById("project-modal").classList.add("hidden");
  document.body.style.overflow = "";
}


////////////////////////////////////////////////////////////

const nav = document.querySelector("nav");

function toggleMenu() {
  nav.classList.toggle("menu-open");
}

function closeMenu() {
  nav.classList.remove('menu-open');
}

// Close menu when clicking on menu links
document.querySelectorAll('#sidemenu a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Close the menu immediately
    nav.classList.remove('menu-open');
  });
});

// Optional: Close menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.getElementById('sidemenu');
  const hamburger = document.querySelector('.fa-bars');
  const closeIcon = document.querySelector('.fa-circle-xmark');
  
  if (nav.classList.contains('menu-open') && 
      !menu.contains(event.target) && 
      event.target !== hamburger && 
      event.target !== closeIcon) {
    nav.classList.remove('menu-open');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ============================================== 
// SCROLL ANIMATION - POP UP EFFECT
// ============================================== 
// ============================================== 
// SCROLL ANIMATION - REPEAT ON SCROLL DOWN
// ============================================== 

function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll, .pop-up, .fade-left, .fade-right');
  
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  
  // Track scroll direction
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    lastScrollY = window.scrollY;
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Scrolling DOWN - Add animation with delays
        if (scrollDirection === 'down') {
          entry.target.classList.add('animated');
        }
        // Scrolling UP - Add animation WITHOUT delays (instant)
        else {
          entry.target.style.transitionDelay = '0s';
          entry.target.classList.add('animated');
        }
      } else {
        // When out of view, remove animation so it can repeat
        if (scrollDirection === 'down') {
          entry.target.classList.remove('animated');
          entry.target.style.transitionDelay = ''; // Reset delay
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  elements.forEach(element => {
    observer.observe(element); 
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);

window.addEventListener('load', function() {
  setTimeout(animateOnScroll, 100);
});