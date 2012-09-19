var options;
$(document).ready(function() {

	chrome.extension.sendRequest({action: 'gpmeGetOptions'}, function(theOptions) {
		options = theOptions;
		init();
	});

});

function init() {


}