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

  // contact page 動態
  if (document.body.classList.contains('pages-contact')) {

    const infos = document.querySelectorAll('.info');
    const person = document.querySelector('.pages-contact__person');
    const contents = document.querySelectorAll('.info__content');
    const domains = document.querySelectorAll('.info__domain');

    const contactMotion = {
      info: 'fadeIn',
      person: 'fadeInUp',
      contents: 'p-fadeInUp',
      domains: 'p-fadeInUp'
    }

    infos.forEach(element => {
      animateCSS(element, contactMotion.info);
    });
    animateCSS(person, contactMotion.person);
    console.log(contents);
    contents[0].style.animationDelay = '.4s';
    contents[1].style.animationDelay = '.7s';
    contents[3].style.animationDelay = '1s';
    contents.forEach(element => {
      element.style.animationDuration = '2s';
      animateCSS(element, contactMotion.contents);
    });
    domains.forEach(element => {
      element.style.animationDuration = '2s';
      element.style.animationDelay = '.7s';
      animateCSS(element, contactMotion.domains);
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