;(function(window, undefined) {
	'use strict';

	var $ = window.$;

	$.extend($.fn, {

		dynamicUpdate: function(html, settings) {
			function swap(selector, target, source) {
				source = source.find(selector).html();
				target.find(selector).html(source);
			}

			var $this = this;
			var $html = $('<div/>').html(html);

			// if no settings provided, fetch all settings from DOM.
			if (!settings) {
				var dynamicElems = this.find('[data-dynamic]');
				settings = [];

				dynamicElems.each(function() {
					var name = $(this).attr('data-dynamic');
					if (!name.match(/\:/)) {
						settings.push(name);
					}
				})

			}

			$.each(settings, function(i) {
				var setting = settings[i].split(/\:|\|/);
				var mainSelector = '[data-dynamic="' + setting[0] + '"]';

				if (setting.length === 1) {
					swap(mainSelector, $this, $html);
				} else {
					var target = $this.find(mainSelector);
					var source = $html.find(mainSelector);

					// If we need to update contents of this block, loop through each setting.
					for (var i = 1, l = setting.length; i < l; i++) {
						if (setting[i] === '+') {
							// Add added rows.
							var listTarget = target.find('[data-dynamic^="' + setting[0] + ':"]');
							var listSource = source.find('[data-dynamic^="' + setting[0] + ':"]');
							var last = listTarget.last();

							listSource.each(function() {
								var $this = $(this);
								var attr = $this.attr('data-dynamic');
								if (!listTarget.filter('[data-dynamic="' + attr + '"]').length) {
									last.after($this);
								}
							});
						} else if (setting[i] === 'x') {
							// Remove deleted rows
							var listTarget = target.find('[data-dynamic^="' + setting[0] + ':"]');
							var listSource = source.find('[data-dynamic^="' + setting[0] + ':"]');

							listTarget.each(function() {
								var $this = $(this);
								var attr = $this.attr('data-dynamic');
								if (!listSource.filter('[data-dynamic="' + attr + '"]').length) {
									$this.remove();
								}
							});
						} else {
							// Update selected rows
							swap('[data-dynamic="' + setting[0] + ':' + setting[i] + '"]', target, source);
						}
					}
				}
			});

			return this;
		}

	});

})(window);