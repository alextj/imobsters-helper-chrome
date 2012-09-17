var requestFilter = {
	urls: ["*://*.im.storm8.com/*"]
},

	extraInfoSpec = ['requestHeaders', 'blocking'],

	handler = function(details) {

		// Droid
		if (details.url.indexOf('version=a1.54') > 0) {
			var UA = 'Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13';
		}

		// iOS
		if (details.url.indexOf('version=1.74') > 0) {
			var UA = "Mozilla/5.0 (iPod; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A403";
		}

		if (!UA) {
			return;
		}

		var headers = details.requestHeaders,
			blockingResponse = {};

		for (var i = 0, l = headers.length; i < l; ++i) {
			if (headers[i].name == 'User-Agent') {
				headers[i].value = UA;
				break;
			}
		}

		blockingResponse.requestHeaders = headers;
		return blockingResponse;

	};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);