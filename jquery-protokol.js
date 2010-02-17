/*
 * Protokol.js - jQuery/Ajax fake protocol handling
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
	            if (!Protokol.proxies[scheme]) Protokol.proxies[scheme] = [];
	            var proxy = function(evt, data) {
	                evt.preventDefault();
	                handler(evt)
	            };
	            Protokol.proxies[scheme].push(proxy);
	            var elements =
	            $('[' + (type == 'click' ? 'href': 'action') + '^=' + scheme + ']');
	            elements.bind(type,proxy);				
			}
            return Protokol;
        },
        unregister: function(scheme, type) {
            var elements =
            $('[' + (type == 'click' ? 'href': 'action') + '^=' + scheme + ']');
            $.each(Protokol.proxies[scheme],
            function(index, handler) {
                elements.unbind(type, handler)
            });
            return Protokol;
        }
    });
	$.extend(true,{Protokol:Protokol});
})(jQuery);