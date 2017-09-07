
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	suggest([
		{content: "Filmstarts Kritik, " + text, description: "Read Filmstarts Reviews"},
		{content: "Gametrailers Review, " + text, description: "Watch Gametrailers Reviews"}
	]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
	var baseUrl = "http://google.com/search?q=";
	var searches = text.split(",");
	var frontAndBack = searches[0].split(":");
	var front = frontAndBack[0] + " ";
	var back = "";
	if (frontAndBack.length > 1)
		back = " " + frontAndBack[1];

	if (searches.length <= 1) 
		return;
	var createQueryUrl = function(s) {
		return baseUrl + front + s + back;
	};
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
		chrome.tabs.update(tabs[0].id, {url: createQueryUrl(searches[1]), active: true});
	});
	for (var i = 2; i < searches.length; i++) {
		var queryUrl = createQueryUrl(searches[i]);
		chrome.tabs.create({url: queryUrl, active: false});
	}
});
