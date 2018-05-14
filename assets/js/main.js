/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:		'(max-width: 1680px)',
		large:		'(max-width: 1280px)',
		medium:		'(max-width: 980px)',
		small:		'(max-width: 736px)',
		xsmall:		'(max-width: 480px)',
		xxsmall:	'(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$footer = $('#footer'),
			$main = $('#main'),
			$main_articles = $main.children('article');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Fix: Flexbox min-height bug on IE.
			if (skel.vars.IEVersion < 12) {

				var flexboxFixTimeoutId;

				$window.on('resize.flexbox-fix', function() {

					clearTimeout(flexboxFixTimeoutId);

					flexboxFixTimeoutId = setTimeout(function() {

						if ($wrapper.prop('scrollHeight') > $window.height())
							$wrapper.css('height', 'auto');
						else
							$wrapper.css('height', '100vh');

					}, 250);

				}).triggerHandler('resize.flexbox-fix');

			}

		// Nav.
			var $nav = $header.children('nav'),
				$nav_li = $nav.find('li');

			// Add "middle" alignment classes if we're dealing with an even number of items.
				if ($nav_li.length % 2 == 0) {

					$nav.addClass('use-middle');
					$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

				}

		// Main.
			var	delay = 325,
				locked = false;

			// Methods.
				$main._show = function(id, initial) {

					var $article = $main_articles.filter('#' + id);

					// No such article? Bail.
						if ($article.length == 0) {
							$main._show('notfound', true);

							return;
						}

					// Handle lock.

						// Already locked? Speed through "show" steps w/o delays.
							if (locked || (typeof initial != 'undefined' && initial === true)) {

								// Mark as switching.
									$body.addClass('is-switching');

								// Mark as visible.
									$body.addClass('is-article-visible');

								// Deactivate all articles (just in case one's already active).
									$main_articles.removeClass('active');

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									$article.addClass('active');

								// Unlock.
									locked = false;

								// Unmark as switching.
									setTimeout(function() {
										$body.removeClass('is-switching');
									}, (initial ? 1000 : 0));

								return;

							}

						// Lock.
							locked = true;

					// Article already visible? Just swap articles.
						if ($body.hasClass('is-article-visible')) {

							// Deactivate current article.
								var $currentArticle = $main_articles.filter('.active');

								$currentArticle.removeClass('active');

							// Show article.
								setTimeout(function() {

									// Hide current article.
										$currentArticle.hide();

									// Show article.
										$article.show();

									// Activate article.
										setTimeout(function() {

											$article.addClass('active');

											// Window stuff.
												$window
													.scrollTop(0)
													.triggerHandler('resize.flexbox-fix');

											// Unlock.
												setTimeout(function() {
													locked = false;
												}, delay);

										}, 25);

								}, delay);

						}

					// Otherwise, handle as normal.
						else {

							// Mark as visible.
								$body
									.addClass('is-article-visible');

							// Show article.
								setTimeout(function() {

									// Hide header, footer.
										$header.hide();
										$footer.hide();

									// Show main, article.
										$main.show();
										$article.show();

									// Activate article.
										setTimeout(function() {

											$article.addClass('active');

											// Window stuff.
												$window
													.scrollTop(0)
													.triggerHandler('resize.flexbox-fix');

											// Unlock.
												setTimeout(function() {
													locked = false;
												}, delay);

										}, 25);

								}, delay);

						}

				};

				$main._hide = function(addState) {

					var $article = $main_articles.filter('.active');

					// Article not visible? Bail.
						if (!$body.hasClass('is-article-visible'))
							return;

					// Add state?
						if (typeof addState != 'undefined' && addState === true) {
							console.log('pushstate')
							history.pushState(null, null, '#');
						}

					// Handle lock.

						// Already locked? Speed through "hide" steps w/o delays.
							if (locked) {

								// Mark as switching.
									$body.addClass('is-switching');

								// Deactivate article.
									$article.removeClass('active');

								// Hide article, main.
									$article.hide();
									$main.hide();

								// Show footer, header.
									$footer.show();
									$header.show();

								// Unmark as visible.
									$body.removeClass('is-article-visible');

								// Unlock.
									locked = false;

								// Unmark as switching.
									$body.removeClass('is-switching');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								return;

							}

						// Lock.
							locked = true;

					// Deactivate article.
						$article.removeClass('active');

					// Hide article.
						setTimeout(function() {

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								setTimeout(function() {

									$body.removeClass('is-article-visible');

									// Window stuff.
										$window
											.scrollTop(0)
											.triggerHandler('resize.flexbox-fix');

									// Unlock.
										setTimeout(function() {
											locked = false;
										}, delay);

								}, 25);

						}, delay);


				};

			// Articles.
				$main_articles.each(function() {

					var $this = $(this);

					// Close.
						$('<div class="close navigation">Close</div>')
							.appendTo($this)
							.on('click', function() {
								location.hash = '';
							});

					// Prevent clicks from inside article from bubbling.
						$this.on('click', function(event) {
							event.stopPropagation();
						});

				});

			// Events.
				$body.on('click', '.navigation', function(event) {

					// Article visible? Hide.
						if ($body.hasClass('is-article-visible'))
							$main._hide(true);

				});

				// $window.on('keyup', function(event) {

				// 	switch (event.keyCode) {

				// 		case 27:

				// 			// Article visible? Hide.
				// 				if ($body.hasClass('is-article-visible'))
				// 					$main._hide(true);

				// 			break;

				// 		default:
				// 			break;

				// 	}

				// });

				$window.on('hashchange', function(event) {
					console.log(event);

					// Empty hash?
						if (location.hash == ''
						||	location.hash == '#') {


							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Hide.
								$main._hide();

						}

					// Otherwise, check for a matching article.
						else if ($main_articles.filter(location.hash).length > 0) {

							console.log(location.hash.substr(1));

							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Show article.
								$main._show(location.hash.substr(1));

						}

				});

			// Scroll restoration.
			// This prevents the page from scrolling back to the top on a hashchange.
				if ('scrollRestoration' in history)
					history.scrollRestoration = 'manual';
				else {

					var	oldScrollPos = 0,
						scrollPos = 0,
						$htmlbody = $('html,body');

					$window
						.on('scroll', function() {

							oldScrollPos = scrollPos;
							scrollPos = $htmlbody.scrollTop();

						})
						.on('hashchange', function() {
							$window.scrollTop(oldScrollPos);
						});

				}

			// Initialize.

				// Hide main, articles.
					$main.hide();
					$main_articles.hide();

				// Initial article.
					if (location.hash != '' &&	location.hash != '#') {
						$window.on('load', function() {
							$main._show(location.hash.substr(1), true);
						});
					}



	});


	var initPhotoSwipeFromDOM = function(gallerySelector) {

		// parse slide data (url, title, size ...) from DOM elements
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
				var thumbElements = el.childNodes,
						numNodes = thumbElements.length,
						items = [],
						figureEl,
						linkEl,
						size,
						item;

				for(var i = 0; i < numNodes; i++) {

						figureEl = thumbElements[i]; // <figure> element

						// include only element nodes
						if(figureEl.nodeType !== 1) {
								continue;
						}

						linkEl = figureEl.children[0]; // <a> element

						size = linkEl.getAttribute('data-size').split('x');

						// create slide object
						item = {
								src: linkEl.getAttribute('href'),
								w: parseInt(size[0], 10),
								h: parseInt(size[1], 10)
						};



						if(figureEl.children.length > 1) {
								// <figcaption> content
								item.title = figureEl.children[1].innerHTML;
						}

						if(linkEl.children.length > 0) {
								// <img> thumbnail element, retrieving thumbnail url
								item.msrc = linkEl.children[0].getAttribute('src');
						}

						item.el = figureEl; // save link to element for getThumbBoundsFn
						items.push(item);
				}

				return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
				return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
				e = e || window.event;
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				var eTarget = e.target || e.srcElement;

				// find root element of slide
				var clickedListItem = closest(eTarget, function(el) {
						return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
				});

				if(!clickedListItem) {
						return;
				}

				// find index of clicked item by looping through all child nodes
				// alternatively, you may define index via data- attribute
				var clickedGallery = clickedListItem.parentNode,
						childNodes = clickedListItem.parentNode.childNodes,
						numChildNodes = childNodes.length,
						nodeIndex = 0,
						index;

				for (var i = 0; i < numChildNodes; i++) {
						if(childNodes[i].nodeType !== 1) {
								continue;
						}

						if(childNodes[i] === clickedListItem) {
								index = nodeIndex;
								break;
						}
						nodeIndex++;
				}



				if(index >= 0) {
						// open PhotoSwipe if valid index found
						openPhotoSwipe( index, clickedGallery );
				}
				return false;
		};

		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
				params = {};

				if(hash.length < 5) {
						return params;
				}

				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
						if(!vars[i]) {
								continue;
						}
						var pair = vars[i].split('=');
						if(pair.length < 2) {
								continue;
						}
						params[pair[0]] = pair[1];
				}

				if(params.gid) {
						params.gid = parseInt(params.gid, 10);
				}

				return params;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
				var pswpElement = document.querySelectorAll('.pswp')[0],
						gallery,
						options,
						items;

				items = parseThumbnailElements(galleryElement);

				// define options (if needed)
				options = {
						history: false,

						// define gallery index (for URL)
						// galleryUID: galleryElement.getAttribute('data-pswp-uid'),

						getThumbBoundsFn: function(index) {
								// See Options -> getThumbBoundsFn section of documentation for more info
								var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
										pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
										rect = thumbnail.getBoundingClientRect();

								return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
						}

				};

				// PhotoSwipe opened from URL
				if(fromURL) {
						if(options.galleryPIDs) {
								// parse real index when custom PIDs are used
								// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
								for(var j = 0; j < items.length; j++) {
										if(items[j].pid == index) {
												options.index = j;
												break;
										}
								}
						} else {
								// in URL indexes start from 1
								options.index = parseInt(index, 10) - 1;
						}
				} else {
						options.index = parseInt(index, 10);
				}

				// exit if index not found
				if( isNaN(options.index) ) {
						return;
				}

				if(disableAnimation) {
						options.showAnimationDuration = 0;
				}

				// Pass data to PhotoSwipe and initialize it
				gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();

				gallery.listen('destroy', function() {
					console.log('close');
					// window.location.hash = 'pictures';

				});

				// $()

				// pswp.close()


		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll( gallerySelector );

		for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		// var hashData = photoswipeParseHash();
		// if(hashData.pid && hashData.gid) {
		// 		openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
		// }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');

})(jQuery);