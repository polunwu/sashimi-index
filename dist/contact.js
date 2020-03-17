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

  // contact page 動態
  if (document.body.classList.contains('pages-contact')) {

    const infos = document.querySelectorAll('.info');
    const person = document.querySelector('.pages-contact__person');
    const contents = document.querySelectorAll('.info__content');
    const domains = document.querySelectorAll('.info__domain');

    const contactMotion = {
      info: 'fadeIn',
      person: 'fadeInUp',
      contents: 'p-bounceInUp',
      domains: 'p-bounceInUp'
    }

    infos.forEach(element => {
      animateCSS(element, contactMotion.info);
    });
    animateCSS(person, contactMotion.person);
    contents[1].style.animationDelay = '.35s';
    contents[3].style.animationDelay = '.7s';
    contents.forEach(element => {
      element.style.animationDuration = '2s';
      animateCSS(element, contactMotion.contents);
    });
    domains.forEach(element => {
      element.style.animationDuration = '2s';
      element.style.animationDelay = '.35s';
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