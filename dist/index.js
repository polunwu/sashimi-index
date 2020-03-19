let logoHasEnded = false;
window.addEventListener("DOMContentLoaded", function () {
	document.getElementById('loaderVideo').addEventListener('ended', () => {
		logoHasEnded = true;
	});
});
window.addEventListener("load", function () {
	if (document.querySelector("body.pages-home")) {
		if (window.pagesHomeCounter == undefined) {
			window.pagesHomeCounter = []
		}
		console.log("animating")
	} else {
		// 不在首頁，因此若有 Interval Id 就全部清掉
		if (window.pagesHomeCounter != undefined) {
			console.log("cancel animating", window.pagesHomeCounter)
			window.pagesHomeCounter.forEach((id) => clearInterval(id))
			window.pagesHomeCounter = []
		}
		return false
	}
	// ... onload
	// === Loader & revealer control & nav showing === 
	const vw = getViewWidth();
	const circles = document.querySelectorAll('.animate-revealer__circle');
	const videoIndicator = document.getElementById('videoIndicator');
	const arrow = document.getElementById('arrow');
	const directionIconUse = document.getElementById('directionIconUse');
	const directionIcon = document.getElementById('directionIcon');

	console.log('logoHasEnded bofore loaded', logoHasEnded);
	if (logoHasEnded) {
		// logo影片早就播完了，直接進圈圈
		playHomeRevealAnimation();
	} else {
		document.getElementById('loaderVideo').addEventListener('ended', () => {
			// 等logo影片播完後，接續圈圈動畫、首頁元件浮現
			playHomeRevealAnimation();
		});
	}

	function playHomeRevealAnimation() {
		document.getElementById('revealer').style.display = 'flex';
		circles[0].addEventListener('animationstart', () => {
			setTimeout(() => {
				document.getElementById('loader').style.display = 'none';
				showUIAnimation();
			}, 2250); // After ($revealer-speed * 0.5) ms -> hide loader -> show nav
		});
		circles[0].addEventListener('animationend', () => {
			// hide revealer after circle ends
			console.log('revealer animation ended');
			document.getElementById('revealer').style.display = 'none';
		});

		circles.forEach(element => {
			void element.offsetWidth;
			if (element.dataset.key == 2 && vw >= 3500) { // check device-width for revealer circles[2]
				element.classList.add(`animate-revealer__circle--${element.dataset.key}-3500`);
			} else if (element.dataset.key == 2 && vw >= 1280) {
				element.classList.add(`animate-revealer__circle--${element.dataset.key}-1280`);
			} else {
				element.classList.add(`animate-revealer__circle--${element.dataset.key}`);
			}
		});
	}

	function showUIAnimation() {
		console.log('showing ui');
		if (vw < 1280) {
			delayUIShowMobile(document.getElementById('brand'), 500);
			delayUIShowMobile(document.getElementById('navToggleBtn'), 500);
		} else {
			delayUIShow(document.getElementById('brand'), 'p-nav--hide', 'p-nav--animated', 0);
			delayUIShow(document.getElementById('navToggleBtn'), 'p-nav--hide', 'p-nav--animated', 0);
		}
		delayUIShow(document.getElementById('navMembers'), 'p-nav--hide', 'p-nav--animated', 500);
		delayUIShow(document.getElementById('navAboutUs'), 'p-nav--hide', 'p-nav--animated', 610);
		delayUIShow(document.getElementById('navContact'), 'p-nav--hide', 'p-nav--animated', 720);
		delayUIShow(document.getElementById('navSocialFb'), 'p-nav--hide', 'p-nav--animated', 830);
		delayUIShow(document.getElementById('navSocialYt'), 'p-nav--hide', 'p-nav--animated', 940);
		let videoIndicatorDelay = 700;
		for (let element of videoIndicator.children) {
			delayUIShow(element, 'p-video-indicator--hide', 'p-video-indicator--animated', videoIndicatorDelay);
			videoIndicatorDelay += 110;
		}
		delayUIShow(document.getElementById('playBtn'), 'p-playBtn--hide', 'p-playBtn--animated', 1600);
		delayUIShow(arrow, 'p-arrow--hide', 'p-arrow--animated', 1800);
		delayUIShow(directionIcon, 'p-arrow--hide', 'p-arrow--animated', 1800);
	}

	function delayUIShow(element, className, animatedClassName, time) {
		setTimeout(() => {
			element.classList.remove(className);
		}, time);
		setTimeout(() => {
			element.classList.remove(animatedClassName);
		}, Number(2500 + time));
	}
	function delayUIShowMobile(element, time) {
		setTimeout(() => {
			element.classList.remove('p-nav--animated');
			element.classList.remove('p-nav--hide');
		}, time);
	}
	// logo影片播完後，以上這段以接續圈圈動畫、首頁元件浮現
	// === End of loader & revealer control & nav showing ===

	// === Scrolling on video & clip path control ===

	let scrollIndex = 0;
	let curVideoIndex = 0;
	let isAbleToChange = true;
	const mouseScrollSpeed = 1;
	const touchScrollSpeed = 1;
	const saftyOffset = 50; // must greater than scrollSpeed
	const changePageThreshold = 300;
	const clippedVideos = document.querySelectorAll('.clipped');

	if (arrow) { arrow.addEventListener('click', handleScroll); }
	if (videoIndicator) { videoIndicator.addEventListener('click', handleJumpTo); }
	window.addEventListener('wheel', handleScroll, { passive: true });
	document.body.addEventListener('touchstart', handleScroll, { passive: true });

	function setDirectionIconUse(num) {
		directionIconUse.setAttributeNS(
			'http://www.w3.org/1999/xlink',
			'xlink:href',
			`#a${num}`);
	}

	function screwDirectionIcon() {
		directionIcon.classList.add('p-direction-icon--screw');
		setTimeout(() => {
			directionIcon.classList.remove('p-direction-icon--screw');
		}, 500);
	}

	function hideAndShowPlayBtn() {
		if (document.querySelector('.play-btn')) {
			document.querySelector('.play-btn').style.visibility = 'hidden';
			setTimeout(() => {
				document.querySelector('.play-btn').style.visibility = 'visible';
			}, 1000);
		}
	}

	function handleJumpTo(e) {
		const maxViewRaduis = getMaxViewRaduis(saftyOffset);
		const targetIndex = Number(e.target.dataset.key);
		console.log(curVideoIndex, 'jump to', targetIndex);
		if (isAbleToChange) {
			switch (targetIndex - curVideoIndex) {
				case 0:
					break;
				case 1:
					handleScroll(e);
					break;
				case -1:
					handleScroll(e, { reverseClick: true });
					break;
				case 2:
				case 3:
				case 4:
					isAbleToChange = false;
					for (let i = Number(curVideoIndex + 1); i <= targetIndex; i++) {
						if (i !== targetIndex) {
							clippedVideos[i - 1].classList.add('hidden');
							let hideTracker = Number(i - 1);
							setTimeout(() => {
								clippedVideos[hideTracker].classList.remove('hidden');
								isAbleToChange = true;
							}, 1000, hideTracker);
						}
						clippedVideos[i - 1].style.clipPath = `circle(${maxViewRaduis}px at center)`;
						clippedVideos[i - 1].style.webkitClipPath = `circle(${maxViewRaduis}px at center)`;
					}
					videoIndicator.children[curVideoIndex].classList.remove('p-video-indicator__index--active');
					videoIndicator.children[targetIndex].classList.add('p-video-indicator__index--active');
					curVideoIndex = Number(targetIndex);
					setDirectionIconUse(Number(curVideoIndex + 1));
					screwDirectionIcon();
					resetHomePageOrangeCircle(false);
					hideAndShowPlayBtn();
					break;
				case -2:
				case -3:
				case -4:
					isAbleToChange = false;
					for (let i = Number(curVideoIndex - 1); i >= targetIndex; i--) {
						if (i !== Number(curVideoIndex - 1)) {
							clippedVideos[i].classList.add('hidden');
							let hideTracker = Number(i);
							setTimeout(() => {
								clippedVideos[hideTracker].classList.remove('hidden');
								isAbleToChange = true;
							}, 1000, hideTracker);
						}
						clippedVideos[i].style.clipPath = `circle(0px at center)`;
						clippedVideos[i].style.webkitClipPath = `circle(0px at center)`;
					}
					videoIndicator.children[curVideoIndex].classList.remove('p-video-indicator__index--active');
					videoIndicator.children[targetIndex].classList.add('p-video-indicator__index--active');
					curVideoIndex = Number(targetIndex);
					screwDirectionIcon();
					setDirectionIconUse(Number(curVideoIndex + 1));
					resetHomePageOrangeCircle(false);
					hideAndShowPlayBtn();
					break;
			}
		}
	}

	function handleScroll(e, options) {
		const maxViewRaduis = getMaxViewRaduis(saftyOffset);
		if (e.type === 'auto') {
			scrollIndex += changePageThreshold + 1;
			updateVideoDisplay({ auto: true });
		}
		if (e.type === 'click') {
			if (options && options.reverseClick) {
				scrollIndex -= changePageThreshold + 1;
			} else {
				scrollIndex += changePageThreshold + 1;
			}
			updateVideoDisplay();
		}
		if (e.type === 'wheel') {
			scrollIndex += e.deltaY * mouseScrollSpeed;
			// console.log(scrollIndex, isAbleToChange);
			updateVideoDisplay();
		}
		if (e.type === 'touchstart') {
			let startingY = e.touches[0].clientY;
			document.body.addEventListener('touchmove', function (e) {
				let currentY = e.touches[0].clientY;
				let touchDeltaY = startingY - currentY;
				scrollIndex += touchDeltaY * touchScrollSpeed;
				// console.log(scrollIndex, isAbleToChange);
				updateVideoDisplay();
			});
		}

		function updateVideoDisplay(option) {
			if (scrollIndex > changePageThreshold) {
				if (curVideoIndex < clippedVideos.length && isAbleToChange) {
					console.log('transition fired');
					isAbleToChange = false;
					clippedVideos[curVideoIndex].addEventListener('transitionend', function endHandler() {
						console.log('transition end');
						isAbleToChange = true;
						this.removeEventListener('transitionend', endHandler);
					});
					videoIndicator.children[curVideoIndex].classList.remove('p-video-indicator__index--active');
					videoIndicator.children[Number(curVideoIndex + 1)].classList.add('p-video-indicator__index--active');
					clippedVideos[curVideoIndex].style.clipPath = `circle(${maxViewRaduis}px at center)`;
					// -- Safari
					clippedVideos[curVideoIndex].style.webkitClipPath = `circle(${maxViewRaduis}px at center)`;
					curVideoIndex += 1;
					screwDirectionIcon();
					setDirectionIconUse(Number(curVideoIndex + 1));
					if (option && option.auto) {
						resetHomePageOrangeCircle(option.auto);
					} else {
						resetHomePageOrangeCircle(false);
					}
					hideAndShowPlayBtn();
					scrollIndex = 0;
				} else if (curVideoIndex == clippedVideos.length && isAbleToChange) {
					videoIndicator.children[0].click();
				} else {
					scrollIndex = 0;
				}
			}
			if (scrollIndex < (changePageThreshold * -1)) {
				if (curVideoIndex > 0 && isAbleToChange) {
					console.log('transition fired');
					isAbleToChange = false;
					curVideoIndex -= 1;
					clippedVideos[curVideoIndex].addEventListener('transitionend', function endHandler() {
						console.log('transition end');
						isAbleToChange = true;
						this.removeEventListener('transitionend', endHandler);
					});
					videoIndicator.children[Number(curVideoIndex + 1)].classList.remove('p-video-indicator__index--active');
					videoIndicator.children[curVideoIndex].classList.add('p-video-indicator__index--active');
					clippedVideos[curVideoIndex].style.clipPath = `circle(0px at center)`;
					// -- Safari
					clippedVideos[curVideoIndex].style.webkitClipPath = `circle(0px at center)`;
					screwDirectionIcon();
					setDirectionIconUse(Number(curVideoIndex + 1));
					resetHomePageOrangeCircle(false);
					hideAndShowPlayBtn()
					scrollIndex = 0;
				} else if (curVideoIndex == 0) {
					videoIndicator.children[4].click();
				} else {
					scrollIndex = 0;
				}
			}
		}
	}

	// === End of scrolling on video & clip path control

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

	// === Auto Loop ===
	setTimeout(function () {
		// 第一次加入橘色圓圈動畫
		document.querySelector(".js-btn-circle").classList.add("animate");
		// 隔五秒開始第一次輪播 Interval
		window.pagesHomeCounter.push(setInterval(function () {
			handleScroll({ type: 'auto' });
			document.querySelector(".js-btn-circle").classList.remove("animate")
			setTimeout(function () { document.querySelector(".js-btn-circle").classList.add("animate") }, 1000)
		}, 5000))
		console.log('set:', window.pagesHomeCounter);

	}, 8500)
	var resetHomePageOrangeCircle = function (customTrigger) {
		// 重置橘色圓圈
		if (document.querySelector(".js-btn-circle")) {
			document.querySelector(".js-btn-circle").classList.remove("animate")
		}
		setTimeout(function () {
			if (document.querySelector(".js-btn-circle")) {
				document.querySelector(".js-btn-circle").classList.add("animate")
			}
		}, 1000)

		// 重置 interval
		if (customTrigger != true) {
			console.log('clear:', window.pagesHomeCounter);
			// Interval 全部清掉再重設一個
			window.pagesHomeCounter.forEach((id) => clearInterval(id))
			window.pagesHomeCounter = []
			window.pagesHomeCounter.push(setInterval(function () {
				handleScroll({ type: 'auto' });
				if (document.querySelector(".js-btn-circle")) {
					document.querySelector(".js-btn-circle").classList.remove("animate")
				}
				setTimeout(function () { document.querySelector(".js-btn-circle").classList.add("animate") }, 1000)
			}, 5000));
			console.log('set:', window.pagesHomeCounter);

		}
	}
	// === End of Auto Loop ===
});

// global functions for getting device meta-data
function getMaxViewRaduis(saftyOffset = 50) {
	const vw = getViewWidth();
	const vh = getViewHeight();
	return saftyOffset + Math.ceil(Math.sqrt((vw / 2) * (vw / 2) + (vh / 2) * (vh / 2)));
}
function getViewWidth() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getViewHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
// End of global functions for getting device meta-data