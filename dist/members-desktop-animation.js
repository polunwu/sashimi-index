window.addEventListener("load", function () {
  if (document.body.classList.contains("pages-members") && !document.body.classList.contains("pages-members--mobile")) {
    (function openingEffect() {
      // 側邊欄
      document.querySelector('.members__sidebar').style.transition = 'transform 800ms cubic-bezier(0.86,0,0.07,1) 200ms';
      document.querySelector('.members__sidebar').style.transform = 'translateX(0)';
      // 背景
      document.querySelector('.items__wrapper').style.transition = 'transform 1000ms cubic-bezier(0.68,-0.55,0.27,1.55)';
      document.querySelector('.items__wrapper').style.transform = 'translateY(0px) scale(1)';
      // 貓
      document.querySelector('.cat__wrapper').style.transition = 'transform 1000ms cubic-bezier(0.68,-0.55,0.27,1.55)';
      document.querySelector('.cat__wrapper').style.transform = 'translateY(0px) scale(1)';
      // 人物
      document.querySelector('.members__wrapper').style.transition = 'transform 2000ms cubic-bezier(0.68,-0.55,0.27,1.55) 100ms';
      document.querySelector('.members__wrapper').style.transform = 'translateX(0px)';
      setTimeout(() => { document.querySelector('.members__wrapper').style.width = 'initial'; }, 2100);
      // 側邊欄元件
      if (!document.querySelector('.members__sidebar').children) return false;
      let wait = 1300;
      Array.from(document.querySelector('.members__sidebar').children).forEach(el => {
        el.style.transition = `all 600ms cubic-bezier(0.25, 1, 0.5, 1) ${wait}ms`;
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        wait += 150;
      })
    })();
  }
})