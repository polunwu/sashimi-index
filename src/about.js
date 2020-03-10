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

  // about page 動態
  if (document.body.classList.contains('pages-about')) {
    document.querySelector('.aboutus-svg').classList.add('animated', 'slideInLeft', 'fast');

    let textOptions = {
      delay: 100,
      duration: 800,
      distance: '50px',
    }
    let photoOptions = {
      delay: 100,
      duration: 800,
    }
    document.querySelectorAll('.pages-about__photo').forEach(element => {
      ScrollReveal().reveal(element, photoOptions);
    })
    document.querySelectorAll('.pages-about__text').forEach(element => {
      ScrollReveal().reveal(element, textOptions);
    });


  }


});