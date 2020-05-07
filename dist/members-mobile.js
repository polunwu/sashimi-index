window.addEventListener("load", function () {
  // 非home的頁面、滑動以隱藏 logo
  // === mobile pages scroll to hide logo ===
  let showBrand = true;
  if (!document.body.classList.contains('pages-home')) {
    const brand = document.getElementById('brand');
    document.addEventListener('scroll', e => {
      if (document.documentElement.scrollTop > 60 || document.body.scrollTop > 60) { // document.body.scrollTop for Safari mobile
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
  // members-mobile page 動態
  const options = {
    type: 'carousel',
    startAt: 0,
    perView: 4.5,
    focusAt: 'center',
    gap: -230,
    breakpoints: {
      1280: {
        perView: 5.5,
        gap: -230
      },
      900: {
        perView: 3.2,
        gap: -230
      },
      767: {
        perView: 3,
        gap: -150
      },
      414: {
        perView: 1.7,
        gap: -170
      },
      375: {
        perView: 1.4,
        gap: -170
      },
      320: {
        perView: 1.75,
        gap: -130
      }
    }
  }
  if (document.body.classList.contains('pages-members--mobile')) {
    document.querySelector('html').style.height = '100%'; // fix body{height:100%} but no background & creating scrollbar

    const glider = new Glide('.glide', options);
    const tiltableElement = '.glide__container';
    const flipableElement = ['.counter__list', '.members__list'];
    let bgPosition = 0;
    let catX = 0;
    let catY = 0;
    let catScale = 0;
    const MOVE_INDEX = 10;
    const movableImages = document.querySelectorAll('.page-members__bg--movable img');

    glider.on('mount.after', showSliderAndBg);
    glider.mount({
      CustomFlow: (Glide, Components, Events) => {
        const Plugin = {
          tilt(element) {
            element.querySelector(tiltableElement).style.transform = "perspective(200px) translateZ(0px)";
            this.tiltPrevElements();  // active 以左的人物依序置後、縮小
            this.tiltNextElements();  // active 以右的人物依序置後、縮小
            this.popActiveElements(); // active 狀態的人物置頂
          },
          popActiveElements() {
            const activeSlide = Components.Html.slides[Glide.index];
            activeSlide.style.zIndex = '100';
          },
          tiltPrevElements() {
            const activeSlide = Components.Html.slides[Glide.index];

            const previousElements = [];
            const getPrevious = (element) => {
              const e = element.previousElementSibling;
              if (e) {
                previousElements.push(e.querySelector(tiltableElement));
                getPrevious(e);
              }
            };
            getPrevious(activeSlide);

            previousElements.forEach((item, index) => {
              // 變形原點為中軸偏下 x:50% y:90%
              // perspective 調整縮放的透視景深程度，為第一個縮放人物的大小依據
              // translateZ 值為基數（25px）乘以 (index + 1 ) 的平方，使第二個以後的縮放人物指數縮小
              item.style.transformOrigin = "50% 90%";
              item.style.transform = `perspective(180px) translateZ(-${60 * (index + 1)}px)`;
              item.parentElement.style.zIndex = `${-1 * (index + 1)}`;
            })

          },
          tiltNextElements() {
            const activeSlide = Components.Html.slides[Glide.index];

            const nextElements = [];
            const getNext = (element) => {
              const e = element.nextElementSibling;
              if (e) {
                nextElements.push(e.querySelector(tiltableElement));
                getNext(e);
              }
            };
            getNext(activeSlide);

            nextElements.forEach((item, index) => {
              item.style.transformOrigin = "50% 90%";
              item.style.transform = `perspective(180px) translateZ(-${60 * (index + 1)}px)`;
              item.parentElement.style.zIndex = `${-1 * (index + 1)}`;
            })
          },
          flipText(activeIndex) {
            flipableElement.forEach(item => {
              const element = document.querySelector(item);
              const size = element.children[0].clientHeight;
              element.style.transform = `translateY(-${size * activeIndex}px)`;
            });
          },
          updateBgImg() {
            movableImages.forEach(img => {
              img.style.transition = '800ms ease';
              if (img.classList.contains('bg__cat')) {
                let randomRotate = Math.floor(Math.random() * 15);
                img.style.transform = `translate(${catX}px, ${catY}px) rotate(${randomRotate}deg) scale(${catScale})`;
              } else {
                let randomRotate = Math.floor(Math.random() * 90);
                img.style.transform = `translateX(${bgPosition}px) rotate(${randomRotate}deg)`;
              }

            });
          },
          moveBgImg() {
            let dir = Components.Run.move.direction;
            if (dir && dir == '>') bgPosition += MOVE_INDEX;
            if (dir && dir == '<') bgPosition -= MOVE_INDEX;
            catX -= 5;
            catY -= 1;
            catScale += 0.1;
            this.updateBgImg();
          },
          resetBgImg() {
            bgPosition = 0;
            catX = 0;
            catY = 0;
            catScale = 0;
            this.updateBgImg();
          }
        }
        Events.on(['mount.after', 'run'], () => {
          Plugin.flipText(Glide.index);
          Plugin.tilt(Components.Html.slides[Glide.index]);
        });
        Events.on('run.before', () => {
          Plugin.moveBgImg();
        })
        Events.on('translate.jump', () => {
          Plugin.resetBgImg();
        });
        return Plugin;
      }
    });
  }

  function showSliderAndBg() {
    document.querySelector('.page-members__slider').style.opacity = 1;
    document.querySelector('.page-members__bg-wrapper').style.transform = 'translateY(0px) scale(1)';
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