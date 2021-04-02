
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal-js").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));

		}, { passive: true });
	},
	closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary d-block mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName = '013-320.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	function whenResize() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0
				? topNav.classList.add('fixed')
				: topNav.classList.remove('fixed');
		}, { passive: true })

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 15,
		},
		navigation: {
			nextEl: $(this).find('.swiper-next'),
			prevEl: $(this).find('.swiper-prev'),
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		// watchOverflow: true,
		// spaceBetween: 0,
		// loop: true,
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyone js
	let thisYear = new Date().getFullYear();
	$('.set-curr-year-js').each(function (){
		this.innerHTML = thisYear;
	});

	//css vars
	let header = document.querySelector(".header--js");
	let footer = document.querySelector(".footer--js");
	let closeSm = document.querySelector(".sm-close-js");
	function calcCssVars() {
		if(header){
			document.documentElement.style.setProperty('--header-w', `${header.offsetWidth}px`);
		}
		if(closeSm){
			document.documentElement.style.setProperty('--close-sm-h', `${closeSm.offsetHeight}px`);
		}
		if(footer){
			document.documentElement.style.setProperty('--footer-h', `${footer.offsetHeight}px`);
		}
	}

	window.addEventListener('resize', calcCssVars, { passive: true });
	window.addEventListener('scroll', calcCssVars, { passive: true });
	calcCssVars();
	//sCompleated
	let sCompleatedSlider = new Swiper('.sCompleated-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 15,
		},
		slidesPerView: 'auto',
		breakpoints: {
			0:{
				spaceBetween: 16,
			},
			576:{
				spaceBetween: 32,
			},
			992:{
				spaceBetween: 40,
			},
			1800:{
				spaceBetween: 64,
			},
		},
	});

	//menu
	$('.burger-js').click(function (){
		$('.m-menu--js').fadeToggle(function (){
			$(this).toggleClass('active');
		});

		$('body').toggleClass('fixed2');
	});
	//sTeam
	let sTeamSlider = new Swiper('.sTeam-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
		slidesPerView: 'auto',
		breakpoints: {
			0:{
				spaceBetween: 16,
			},
			992:{
				spaceBetween: 40,
			},
			1800:{
				spaceBetween: 64,
			},
		},
	});
	//yandex lazy
	if ($('body').hasClass('contact-page')){
		window.setTimeout(function (){
			let yandexScript = document.createElement('script');
			yandexScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=e27e46e9-4530-4518-b27a-3bba6a08eeff');
			yandexScript.setAttribute('type', 'text/javascript');

			document.body.appendChild(yandexScript);
			window.setTimeout(function (){
				try {
					ymaps.ready(function () {
						var myMap = new ymaps.Map('map', {
								center: [55.664096, 37.536517],
								zoom: 16
							}, {
								searchControlProvider: 'yandex#search'
							}),

							// Создаём макет содержимого.
							MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
								'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
							),

							myPlacemark = new ymaps.Placemark([55.664096, 37.536517], {
								hintContent: 'Наш офис',
								balloonContent: 'ул. Воронцовские Пруды д. 3, подъезд 8'
							}, {
								// Опции.
								// Необходимо указать данный тип макета.
								iconLayout: 'default#image',
								// Своё изображение иконки метки.
								iconImageHref: 'img/svg/map-mark.svg',
								// Размеры метки.
								iconImageSize: [48, 48],
								// Смещение левого верхнего угла иконки относительно
								// её "ножки" (точки привязки).
								//iconImageOffset: [-24, -48]
								iconImageOffset: [-1, -1]
							});

						myMap.geoObjects
							.add(myPlacemark);

						myMap.behaviors.disable('scrollZoom');
					});
				}
				catch {

				}
			}, 1000);

		}, 2000);
	}
	let sCertificatsSlider = new Swiper('.sCertificats-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
		slidesPerView: 'auto',
		breakpoints: {
			0:{
				spaceBetween: 16,
			},
			992:{
				spaceBetween: 40,
			},
			1800:{
				spaceBetween: 64,
			},
		},
	});

	//sFlat
	let sFlatSlider = new Swiper('.sFlat-slider-js', {
		...defaultSl,
		slidesPerView: 'auto',
		breakpoints: {
			0:{
				spaceBetween: 16,
			},
			992:{
				spaceBetween: 40,
			},
			1800:{
				spaceBetween: 64,
			},
		},
	});

	//end luckyone js

	//todo
	//1.clean js file
	//2.

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}