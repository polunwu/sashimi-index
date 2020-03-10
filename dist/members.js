window.addEventListener("load", function () {

  // members page loaded
  if (document.body.classList.contains('pages-members')) {

    const titles = document.querySelectorAll('.pages-members__group h3')
    const members = document.querySelectorAll('.pages-members__member');
    console.log(titles);
    titles.forEach(element => {
      element.classList.add('animated', 'faster', 'zoomIn');
    });
    members.forEach(element => {
      element.classList.add('animated', 'bounceInUp');
    });

  }


});