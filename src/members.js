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
      animateCSS(element, 'faster');
      animateCSS(element, 'zoomIn');
    });
    let groupDelay = 0;
    for (let group of document.querySelectorAll('.pages-members__group')) {
      for (let member of group.querySelectorAll('.pages-members__member')) {
        member.style.animationDelay = `${groupDelay}s`;
        member.style.animationDuration = '2s';
        animateCSS(member, 'p-bounceInUp'); // <- self-define bounce
        groupDelay += 0.15;
      }
    }
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