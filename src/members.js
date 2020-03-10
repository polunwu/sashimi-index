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

  // members page 動態
  if (document.body.classList.contains('pages-members')) {
    document.querySelectorAll('.pages-members__group h3').forEach(element => {
      element.classList.add('animated', 'faster', 'zoomIn');
    });
    document.querySelectorAll('.pages-members__member').forEach(element => {
      element.classList.add('animated', 'bounceInUp');
    });
    document.querySelectorAll('.pages-members__member__count').forEach(element => {
      countUp(element, Number(element.innerHTML), 80);
    });

    function countUp(target, endVal, intervalTime) {
      let num = -1;
      let counter = setInterval(() => {
        num++;
        target.innerHTML = num;
        if (num == endVal) { clearInterval(counter); }
      }, intervalTime);
    }
  }


});