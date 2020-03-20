window.addEventListener("load", function () {

  // 每個頁面都會放 navbar toggle 功能，否則無法開啟 menu
  // === NavBar toggle to collapse control
  let showNav = false;
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navToCollapse = document.getElementById('navToCollapse');
  navToggleBtn.addEventListener('click', function () {
    if (showNav) {
      navToCollapse.classList.remove('p-nav__links--show');
      navToggleBtn.classList.add('p-collapsed');
      showNav = !showNav;
    } else {
      navToCollapse.classList.add('p-nav__links--show');
      navToggleBtn.classList.remove('p-collapsed');
      showNav = !showNav;
    }
  });
  // === End of navBar toggle to collapse control

  // 非home的頁面、滑動以隱藏 logo
  // === mobile pages scroll to hide logo ===
  if (!document.body.classList.contains('pages-home')) {
    const brand = document.getElementById('brand');
    document.addEventListener('scroll', e => {
      if (document.documentElement.scrollTop > 60) {
        brand.style.opacity = 0;
      } else {
        brand.style.opacity = 1;
      }
    });
  }
  // === mobile pages scroll to hide logo ===

  // about page 動態
  if (document.body.classList.contains('pages-about')) {
    const aboutSvg = document.querySelector('.aboutus-svg');
    // animateCSS(aboutSvg, 'fast');
    animateCSS(aboutSvg, 'p-fadeInLeft');

    let textOptions = {
      delay: 400,
      duration: 1200,
      distance: '70px'
    }
    let photoOptions = {
      delay: 700,
      duration: 1200,
      distance: '70px'
    }
    document.querySelectorAll('.pages-about__photo').forEach(element => {
      ScrollReveal().reveal(element, photoOptions);
    })
    document.querySelectorAll('.pages-about__text').forEach(element => {
      ScrollReveal().reveal(element, textOptions);
    });
  }
  function animateCSS(node, animationName, callback) {
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }


});