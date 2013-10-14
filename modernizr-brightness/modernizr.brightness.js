/**
 * Feature test if brightness is present and is using the old brightnessmodel or the new one.
 */
;(function() {
	Modernizr.testStyles('', function(elem, rule) {
		
		// Test if the standard brightness model is present.
		elem.setAttribute('style', '-webkit-filter: brightness(101%)');
		var standardBrightnessModel = !!(elem.style.webkitFilter);
		
		// Also feature test if older model is existent.
		// There's a double !! in case it will return undefined.
		elem.setAttribute('style', '-webkit-filter: brightness(99%)');
		var oldBrightnessModel = !!(!standardBrightnessModel && elem.style.webkitFilter);
		
		// Add tests 
		Modernizr.addTest('brightness', standardBrightnessModel);
		Modernizr.addTest('oldbrightness', oldBrightnessModel);
	});
})();