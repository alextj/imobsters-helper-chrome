chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.action == 'gpmeGetOptions') {
	var settings = new Store("settings");
    sendResponse(settings.toObject());
  }
});