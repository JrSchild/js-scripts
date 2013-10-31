/**
 * Ultra simple deferred function. Useful for callbacks when you don't
 * know whether something will be synchronous or async.
 *
 * Create a deferred method e.g. by:
 * var done = SimpleDeferred();
 *
 * Then register methods by:
 * done(function(){});
 * fire methods with:
 * done();
 *
 * Useful feature is namespacing of your events. You can provide a string-name in the first
 * argument. This way it's possible to register functions for fail and success:
 * var done = SimpleDeferred();
 * done('success', function(){});
 * done('whatever', function(){});
 *
 * Once the chosen namespace is fired only functions added to this namespace will be executed.
 * So if done('whatever') is executed, functions to 'success' will not be called.
 * If no namespace is given the default namespace will be 'default'.
 */
;(function( window ) {
	"use strict";
	
	window.SimpleDeferred = function() {
		var doneCalled = false;
		var doneCallbacks = {};
		
		return function( name, method ) {
			var args = arguments;
			
			// Normalize passed arguments.
			if( typeof name === "function" || ( !name && !method ) ) {
				method = name;
				name = "default";
			}
			doneCallbacks[ name ] = doneCallbacks[ name ] || [];
			
			// If method is a function, it will be added to the callback list
			// except when the done function has already been fired, in that case
			// the method will be invoked immediately.
			if( typeof method === "function" ) {
				if( doneCalled === name ) {
					method.call( this, args[ 2 ] );
				} else {
					doneCallbacks[ name ].push( method );
				}
			} else if( !doneCalled ) {
				for( var i = 0, l = doneCallbacks[ name ].length; i < l; i++ ) {
					doneCallbacks[ name ][ i ].call( this, args[ 1 ] );
				}
				doneCalled = name;
			}
			return this;
		};
	};
})( window );