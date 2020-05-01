/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	(function (jQuery, IBM) {

	    var app = {
	        data: undefined,
	        init: function init() {
	            console.log('app ready');
	            app.getData();
	        },
	        getData: function getData() {
	            var app = this;
	            jQuery.getJSON('assets/data.json', {}).done(function (data) {
	                app.setData(data);
	                stories.renderStories(data);

	                if (window.location.hash) {
	                    stories.detectHash();
	                } else {}
	            });
	        },
	        setData: function setData(data) {
	            app.data = data;
	        },
	        sortByKey: function sortByKey(array, key) {
	            return array.sort(function (a, b) {
	                var x = a[key];
	                var y = b[key];
	                return x < y ? -1 : x > y ? 1 : 0;
	            });
	        }
	    };

	    var stories = {
	        renderStories: function renderStories(data) {
	            //Initial Data State
	            var allStories = data.clientStories;
	            var featuredItems = [];
	            //Iterate through stories to find items that have a set order
	            jQuery.each(allStories, function (index, value) {
	                if (value.order !== null) {
	                    featuredItems.push(value);
	                }
	            });

	            //Sort the items by their order number and reverse their order (most recent stories first, oldest to the back)
	            var orderedItems = app.sortByKey(featuredItems, 'order').reverse();

	            //Render the template for stories
	            var source = jQuery('#client-stories-list').html();
	            var template = Handlebars.compile(source);
	            var renderedHtml = template({ clientStories: orderedItems });
	            jQuery('#client-stories').append(renderedHtml);

	            //Instantiate the overlays
	            jQuery('.ibm-common-overlay').overlay();

	            //Show overlay on click
	            jQuery('.ibm-show-overlay').on('click', function (event) {
	                var overlayStoryID = jQuery(this).data('overlay');
	                IBMCore.common.widget.overlay.show('overlayStory' + overlayStoryID);
	            });

	            jQuery('.story-toggle-btn').text('Read More Stories');
	            jQuery('#reveal-stories').on('click', function () {
	                // toggle the unfeatured stories on click
	                jQuery('.featured-false, .featured-animation-false').toggle();
	                // switch button text on click
	                var btnText = jQuery('.story-toggle-btn');
	                btnText.text(function (i, v) {
	                    return v === 'Read More Stories' ? 'View Fewer Stories' : 'Read More Stories';
	                });
	            });

	            jQuery('.previous-link').on('click', function () {
	                var currentStory = window.location.hash;
	                var currentNum = Number(currentStory.replace('#', ''));
	                var previousStory = currentNum - 1;
	                //count the number of stories on the page and thats your max stories
	                var maxStories = '4';

	                if (previousStory > maxStories) {
	                    //disable or hide button
	                } else {
	                    IBM.common.widget.overlay.hide('overlayStory' + currentNum);
	                    IBM.common.widget.overlay.show('overlayStory' + previousStory);
	                    window.location.hash = '#' + previousStory;
	                    // console.log(window.location.hash);
	                }
	            });

	            jQuery('.next-link').on('click', function () {
	                var currentStory = window.location.hash;
	                var currentNum = Number(currentStory.replace('#', ''));
	                var nextStory = currentNum + 1;

	                //count the number of stories on the page and thats your max stories
	                var maxStories = '14';

	                if (nextStory > maxStories) {
	                    //disable or hide button
	                } else {
	                    IBM.common.widget.overlay.hide('overlayStory' + currentNum);
	                    IBM.common.widget.overlay.show('overlayStory' + nextStory);
	                    window.location.hash = '#' + nextStory;
	                }
	            });
	        },
	        detectHash: function detectHash() {
	            var storyID = window.location.hash.replace('#', '');
	            //if it's present, the show the overlay
	            if (storyID !== undefined) {
	                IBMCore.common.widget.overlay.show('overlayStory' + storyID);
	            }
	        }
	    };

	    jQuery(document).ready(function () {
	        console.log('doc ready');
	        app.init();
	    });
	})(jQuery, IBMCore);

/***/ })
/******/ ]);