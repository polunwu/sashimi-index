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
      contents: 'bounceInUp'
    }

    infos.forEach(element => {
      element.classList.add('animated', contactMotion.info);
    });
    person.classList.add('animated', 'faster', contactMotion.person);
    contents[1].style.animationDelay = '.3s';
    contents[3].style.animationDelay = '.6s';
    contents.forEach(element => {
      element.classList.add('animated', contactMotion.contents);
    });
    domains.forEach(element => {
      element.style.animationDelay = '.3s';
      element.classList.add('animated', contactMotion.contents);
    });
  }


});