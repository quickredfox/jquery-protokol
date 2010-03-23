/*
 * Protokol.js - jQuery custom scheme handling
 * 
 * Copyright (c) 2010 Francois Lafortune (quickredfox.at)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php 
*/
 (function($) {
    var Protokol = {
        Version: '0.0.1'
    };
    $.extend(true, Protokol, {
        proxies: {},
        /*
			scheme: protocol scheme ex: http
			type:   click|submit
		*/
        register: function(scheme, type, handler) {
			if(!$.isReady) $(function(){Protokol.register(scheme, type, handler)});
			else{
				// Tainted handler
	            var proxy = function(evt, data) {
	                evt.preventDefault();
					var $el = $(evt.target);
	                handler({
						element: $el,
						type: (type == 'click' ? $el.attr('href') : $el.attr('action') ),
						event: evt,
						protocol: scheme
					});
	            };
				// Storage for tainted handler
	            if (!Protokol.proxies[scheme]) Protokol.proxies[scheme] = [];
	            Protokol.proxies[scheme].push(proxy);
				// grabs targeted elements with [attr^=scheme]
	            var elements =
	            $('[' + (type == 'click' ? 'href': 'action') + '^=' + scheme + ']');
				// bind listener
	            elements.bind(type,proxy);				
			}
			// make protokol chainable
            return Protokol;
        },
        unregister: function(scheme, type) {
			// grabs targeted elements with [attr^=scheme]
            var elements =
            $('[' + (type == 'click' ? 'href': 'action') + '^=' + scheme + ']');
			// unbind stored tainted handlers
            $.each(Protokol.proxies[scheme],
            function(index, handler) {
                elements.unbind(type, handler)
            });
			// make protokol chainable
            return Protokol;
        }
    });
	// 
	$.extend(true,{Protokol:Protokol});
})(jQuery);