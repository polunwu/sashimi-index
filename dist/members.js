window.addEventListener("load", function () {

  // members page loaded
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
      let num = 0;
      let counter = setInterval(() => {
        num++;
        target.innerHTML = num;
        if (num == endVal) { clearInterval(counter); }
      }, intervalTime);
    }

  }


});