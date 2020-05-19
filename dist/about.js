window.addEventListener("load", function () {

  // 非home的頁面、滑動以隱藏 logo
  // === mobile pages scroll to hide logo ===
  let showBrand = true;
  if (!document.body.classList.contains('pages-home')) {
    const brand = document.getElementById('brand');
    document.addEventListener('scroll', e => {
      // 修正 safari 問題，新增 document.body.scrollTop > 60 判斷
      if (document.documentElement.scrollTop > 60 || document.body.scrollTop > 60) {
        brand.style.opacity = 0;
        showBrand = false;
      } else {
        brand.style.opacity = 1;
        showBrand = true;
      }
    });
  }
  // === mobile pages scroll to hide logo ===

  // 每個頁面都會放 navbar toggle 功能，否則無法開啟 menu
  // === NavBar toggle to collapse control
  let showNav = false;
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navToCollapse = document.getElementById('navToCollapse');
  navToggleBtn.addEventListener('click', function () {
    if (showNav) {
      if (!showBrand) document.getElementById('brand').style.opacity = 0;
      navToCollapse.classList.remove('p-nav__links--show');
      navToggleBtn.classList.add('p-collapsed');
      showNav = !showNav;
    } else {
      if (!showBrand) document.getElementById('brand').style.opacity = 1;
      navToCollapse.classList.add('p-nav__links--show');
      navToggleBtn.classList.remove('p-collapsed');
      showNav = !showNav;
    }
  });
  // === End of navBar toggle to collapse control

  // 以下為全部 about 動態
  if (document.body.classList.contains('pages-about')) {
    if (document.querySelector('.aboutus-svg')) animateCSS(document.querySelector('.aboutus-svg'), 'p-fadeInLeft');
    if (document.querySelector('.pages-about__hero > i')) document.querySelector('.pages-about__hero > i').style.transform = 'skewX(0deg) translateX(100%)';

    // init rellax
    const rellax = new Rellax('.js-rellax');
    // init scroll-out
    ScrollOut({
      onShown: handleOnShown,
      onHidden: handleOnHidden
    });

    function handleOnShown(el) {
      el.style.animationDelay = '700ms';
      el.classList.add('animated', 'p-revealInUp');
    }
    function handleOnHidden(el) {
      el.style.opacity = 0;
    }
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