"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
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
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(function (element) {
			return element.classList.remove("on");
		});
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(function (el) {
			return el.classList.remove("fixed");
		});
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : '';
				console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary d-block mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName = '013-320.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function whenResize() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		}, {
			passive: true
		});
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 15
		},
		navigation: {
			nextEl: $(this).find('.swiper-next'),
			prevEl: $(this).find('.swiper-prev')
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		} // watchOverflow: true,
		// spaceBetween: 0,
		// loop: true,

	};
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window
	//luckyone js

	var thisYear = new Date().getFullYear();
	$('.set-curr-year-js').each(function () {
		this.innerHTML = thisYear;
	}); //css vars

	var header = document.querySelector(".header--js");
	var footer = document.querySelector(".footer--js");
	var closeSm = document.querySelector(".sm-close-js");

	function calcCssVars() {
		if (header) {
			document.documentElement.style.setProperty('--header-w', "".concat(header.offsetWidth, "px"));
		}

		if (closeSm) {
			document.documentElement.style.setProperty('--close-sm-h', "".concat(closeSm.offsetHeight, "px"));
		}

		if (footer) {
			document.documentElement.style.setProperty('--footer-h', "".concat(footer.offsetHeight, "px"));
		}
	}

	window.addEventListener('resize', calcCssVars, {
		passive: true
	});
	window.addEventListener('scroll', calcCssVars, {
		passive: true
	});
	calcCssVars(); //sCompleated

	var sCompleatedSlider = new Swiper('.sCompleated-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 15
		},
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 16
			},
			576: {
				spaceBetween: 32
			},
			992: {
				spaceBetween: 40
			},
			1800: {
				spaceBetween: 64
			}
		}
	}); //menu

	$('.burger-js').click(function () {
		$('.m-menu--js').fadeToggle(function () {
			$(this).toggleClass('active');
		});
		$('body').toggleClass('fixed2');
	}); //sTeam

	var sTeamSlider = new Swiper('.sTeam-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		},
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 16
			},
			992: {
				spaceBetween: 40
			},
			1800: {
				spaceBetween: 64
			}
		}
	}); //yandex lazy

	if ($('body').hasClass('contact-page')) {
		window.setTimeout(function () {
			var yandexScript = document.createElement('script');
			yandexScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=e27e46e9-4530-4518-b27a-3bba6a08eeff');
			yandexScript.setAttribute('type', 'text/javascript');
			document.body.appendChild(yandexScript);
			window.setTimeout(function () {
				try {
					ymaps.ready(function () {
						var myMap = new ymaps.Map('map', {
							center: [55.664096, 37.536517],
							zoom: 16
						}, {
							searchControlProvider: 'yandex#search'
						}),
								// Создаём макет содержимого.
						MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),
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
						myMap.geoObjects.add(myPlacemark);
						myMap.behaviors.disable('scrollZoom');
					});
				} catch (_unused) {}
			}, 1000);
		}, 2000);
	}

	var sCertificatsSlider = new Swiper('.sCertificats-slider-js', {
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		},
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 16
			},
			992: {
				spaceBetween: 40
			},
			1800: {
				spaceBetween: 64
			}
		}
	}); //sFlat

	var sFlatSlider = new Swiper('.sFlat-slider-js', {
		//...defaultSl,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 15
		},
		navigation: {
			// nextEl: $(this).find('.swiper-next'),
			// prevEl: $(this).find('.swiper-prev'),
			nextEl: '.sFlat-swiper-next',
			prevEl: '.sFlat-swiper-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		//
		slidesPerView: 'auto',
		breakpoints: {
			0: {
				spaceBetween: 16
			},
			992: {
				spaceBetween: 40
			},
			1800: {
				spaceBetween: 64
			}
		}
	}); //new for sasha

	$('.custom-modal-js').click(function () {
		event.preventDefault();
		var href = this.getAttribute('href');
		var modal = document.querySelector(href);
		modal.classList.add('active');
		$('body').addClass('fixed2');
	});
	$('.close-mw-js').click(function () {
		$('body').removeClass('fixed2');
		$('.mod-win-cont-js').removeClass('active');
	}); //end new for sasha
	//end luckyone js
	//todo
	//1.clean js file
	//2.
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}