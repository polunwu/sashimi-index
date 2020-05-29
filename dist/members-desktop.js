window.addEventListener("load", function () {
  if (document.body.classList.contains("pages-members") && !document.body.classList.contains("pages-members--mobile")) {
    var initialLeft = 70
    // document.querySelector(".members__wrapper").scrollTo(initialLeft + 45, 0)

    // 滾輪變化倍率，測試調整用
    window.deltaY = 1
    window.degs = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 65]
    window.moves = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2]
    window.scales = [0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.1, 1.2, 1.3, 1.4, 1.5]
    // 讓滾輪上下可以觸發左右
    document.querySelector(".members__wrapper").addEventListener('wheel', function (e) {
      // 點到第四個人物之後，往左滑會滑不回去，因此自動拿掉 active 時產生的 transform
      if (document.querySelector(".members__wrapper").scrollLeft < 1) {
        document.querySelector(".js-members__front").style.transform = null
        document.querySelector(".js-members__back").style.transform = null
      }
      // 開根號讓滑動速度有曲線變化但趨緩，避免滑鼠滾輪跳動
      delta = e.deltaY > 0 ? Math.ceil(Math.sqrt(e.deltaY)) : Math.ceil(Math.sqrt(Math.abs(e.deltaY))) * -1
      document.querySelector(".members__wrapper").scrollLeft += window.deltaY * delta
    });
    // 人滾動的速度100，物品20，錯動感
    document.querySelector(".members__wrapper").addEventListener("scroll", function () {
      document.querySelectorAll(".js-item-img").forEach(function (el) {
        el.style.transform = `translateX(${document.querySelector('.members__wrapper').scrollLeft * 0.05}px) rotateZ(${document.querySelector('.members__wrapper').scrollLeft * 0.008}deg)`
      })
      document.querySelector(".js-item-img__line2").style.transform = `translateX(${document.querySelector('.members__wrapper').scrollLeft * 0.05}px) rotateZ(${document.querySelector('.members__wrapper').scrollLeft * 0.008 - 160}deg) scaleY(-1)`
      // document.querySelector(".js-item-img__line").style.transform = `translateX(${document.querySelector('.members__wrapper').scrollLeft * 0.05}px) rotateZ(180deg)`
      document.querySelector(".js-item-img__cat").style.transform = `translateX(${document.querySelector('.members__wrapper').scrollLeft * 0.2}px) rotateZ(${document.querySelector('.members__wrapper').scrollLeft * -0.05}deg)`
      document.querySelector(".js-item-img__camera").style.transform = `translateX(${document.querySelector('.members__wrapper').scrollLeft * 0.2}px) rotateZ(${document.querySelector('.members__wrapper').scrollLeft * -0.05}deg)`
      document.querySelector(".js-item-img__block").style.transform = `rotateZ(${document.querySelector('.members__wrapper').scrollLeft * -0.05}deg)`
    })
    // 直接點 member 變成 active
    document.querySelectorAll(".js-members__img").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (this.classList.contains('active')) {
          this.classList.remove('active')
        } else {
          document.querySelectorAll('.js-members__img.active').forEach(function (el) {
            el.classList.remove('active')
          })
          this.classList.add('active')
          // document.querySelector(".members__wrapper").scrollTo({ left: initialLeft, behavior: "smooth" })
          // 把 active member 移到靠近爆炸圖案附近
          document.querySelector(".js-members__front").style.transform = `translateX(${this.getAttribute("data-transform-value")}vw)`
          document.querySelector(".js-members__back").style.transform = `translateX(${this.getAttribute("data-transform-value")}vw)`
          let explosionValue = `translateY(${window.moves[Math.ceil(Math.random() * 10)]}vh) translateX(${window.moves[Math.ceil(Math.random() * 10)]}vw) rotateZ(${window.degs[Math.ceil(Math.random() * 10)]}deg)`
          document.querySelector(".js-item-img__explosion-white").style.transform = explosionValue
          document.querySelector(".js-item-img__explosion-black").style.transform = explosionValue
          document.querySelector(".js-item-img__cat").style.transform = `translateY(${window.moves[Math.ceil(Math.random() * 10)] * 0.3}vh) translateX(${window.moves[Math.ceil(Math.random() * 10)] * 5}vw) rotateZ(${window.degs[Math.ceil(Math.random() * 10)] * 0.3}deg)`
          document.querySelector(".js-item-img__camera").style.transform = `translateY(${window.moves[Math.ceil(Math.random() * 10)] * 0.3}vh) translateX(${window.moves[Math.ceil(Math.random() * 10)] * 5}vw) rotateZ(${window.degs[Math.ceil(Math.random() * 10)] * 0.3}deg)`
          console.log(parseInt(this.getAttribute("data-active-member")) * 0.1)
          // document.querySelector(".js-item-img__raw1").style.transform = `translateY(${window.moves[Math.ceil(Math.random()*10)]}vh) translateX(${window.moves[Math.ceil(Math.random()*10)]}vw) rotateZ(${window.degs[Math.ceil(Math.random()*10)]}deg)`
          document.querySelector(".js-item-img__raw2").style.transform = `translateY(${window.moves[Math.ceil(Math.random() * 10)]}vh) translateX(${window.moves[Math.ceil(Math.random() * 10)]}vw) rotateZ(${window.degs[Math.ceil(Math.random() * 10)]}deg)`
          // document.querySelector(".js-item-img__block").style.transform = `translateY(${window.moves[Math.ceil(Math.random()*10)]}vh) translateX(${window.moves[Math.ceil(Math.random()*10)]}vw) rotateZ(${window.degs[Math.ceil(Math.random()*10)]}deg)`
          document.querySelector(".js-item-img__line2").style.transform = `translateY(${window.moves[Math.ceil(Math.random() * 10)]}vh) translateX(${window.moves[Math.ceil(Math.random() * 10)]}vw) rotateZ(${window.degs[Math.ceil(Math.random() * 10)] - 190}deg) scaleY(-1)`
          document.querySelector(".js-member__title").innerText = this.getAttribute("data-title")
          document.querySelector(".js-member__name").innerHTML = `<a href='${this.getAttribute("data-member-works-url")}'>${this.getAttribute("data-name")}</a>`
          document.querySelector(".js-member__count").innerText = this.getAttribute("data-count")
          document.querySelector(".js-see-more-works-link").setAttribute("data-url", this.getAttribute("data-member-works-url"))
          // 取得 active member 的相關 info 並更新到側邊欄
          var works = JSON.parse(this.getAttribute("data-works"))
          document.querySelectorAll(".js-work").forEach(function (el, index) {
            // 避免人物的作品數量不足三個
            if (works[index] == undefined) {
              el.style.display = "none"
              return false
            } else {
              el.style.display = "initial"
            }
            el.setAttribute("href", works[index].link)
            el.querySelector(".member__work__client-name").classList.add("animated", "fadeIn")
            el.querySelector(".member__work__title").classList.add("animated", "fadeIn")
            el.querySelector("video").pause()
            el.querySelector("video source").src = works[index].video
            el.querySelector("video").load()
            el.querySelector(".member__work__video-bg").style.backgroundImage = `url('${works[index].poster}')`
            el.querySelector(".member__work__client-name").innerText = works[index].client
            el.querySelector(".member__work__title").innerText = works[index].title
            el.querySelector(".member__work__client-name").addEventListener('animationend', function (e) {
              e.target.classList.remove("fadeIn")
            })
            el.querySelector(".member__work__title").addEventListener('animationend', function (e) {
              e.target.classList.remove("fadeIn")
            })
          })
          if (document.querySelector(".js-member__works").scrollTop > 1) {
            document.querySelector(".js-member__works").scrollTo({ top: 0, behavior: 'smooth' });
          }

        }
        document.querySelector('.js-members__controls').setAttribute('data-active-member', this.getAttribute('data-active-member'))
      })
    })
    // 往右按鈕切換 active member，與往右不同；到最後一個會自動跳到第一個
    document.querySelector(".js-controls__btn--right").addEventListener("click", function (e) {
      var maxMemberIndex = document.querySelectorAll(".js-members__img").length
      if (maxMemberIndex) {
        if (document.querySelectorAll(".js-members__img.active").length == 0) return document.querySelectorAll(".js-members__img")[0].click()
        document.querySelectorAll(".js-members__img.active").forEach(function (el) { el.classList.remove("active") })
        var activeMemberIndex = parseInt(document.querySelector('.js-members__controls').getAttribute('data-active-member'))
        var nextMemberIndex = (activeMemberIndex == maxMemberIndex) ? 1 : (activeMemberIndex + 1)
        document.querySelector(`[data-active-member='${nextMemberIndex}']`).click()
      }
    })
    // 往右按鈕切換 active member，與往左不同；到第一個會自動跳到最後一個
    document.querySelector(".js-controls__btn--left").addEventListener("click", function (e) {
      var maxMemberIndex = document.querySelectorAll(".js-members__img").length
      if (maxMemberIndex) {
        if (document.querySelectorAll(".js-members__img.active").length == 0) return document.querySelectorAll(".js-members__img")[parseInt(maxMemberIndex) - 1].click()
        document.querySelectorAll(".js-members__img.active").forEach(function (el) {
          el.classList.remove("active")
        })
        var activeMemberIndex = parseInt(document.querySelector('.js-members__controls').getAttribute('data-active-member'))
        var nextMemberIndex = (activeMemberIndex == 1) ? maxMemberIndex : (activeMemberIndex - 1)
        document.querySelector(`[data-active-member='${nextMemberIndex}']`).click()
      }
    })
    // 側邊欄內的作品滑鼠或手指滑過會觸發影片預覽播放
    document.querySelectorAll(".js-work").forEach(function (el) {
      el.addEventListener("mouseenter", function (e) {
        if (e.target.querySelector("video")) {
          e.target.querySelector("video").play()
        } else {
          e.target.parentNode.querySelector("video").play()
        }
        console.log("enter")
      })
      el.addEventListener("touchstart", function (e) {
        console.log(e.target)
        if (e.target.querySelector("video")) {
          e.target.querySelector("video").play()
        } else {
          e.target.parentNode.querySelector("video").play()
        }
        console.log("enter")
      })
      el.addEventListener("mouseleave", function (e) {
        if (e.target.querySelector("video")) {
          e.target.querySelector("video").pause()
        } else {
          e.target.parentNode.querySelector("video").pause()
        }
        console.log("leave")
      })
    })
  }
})