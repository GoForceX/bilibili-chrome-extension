(function () {
	'use strict'
	function registerOmnibox() {
		var videoHint = chrome.i18n.getMessage("videoHint");
		var searchHint = chrome.i18n.getMessage("searchHint");
		var articleHint = chrome.i18n.getMessage("articleHint");
		var userHint = chrome.i18n.getMessage("userHint");
		var noSearchHint = chrome.i18n.getMessage("noSearchHint");
		chrome.omnibox.onInputChanged.addListener((text, suggest) => {
			if (!text) return;
			if (text.toLowerCase().startsWith("av")) {
				suggest([
					{ content: videoHint + text, description: videoHint + text },
					{ content: searchHint + text, description: searchHint + text }
				]);
			} else if (text.toUpperCase().startsWith("BV")) {
				suggest([
					{ content: videoHint + text, description: videoHint + text },
					{ content: searchHint + text, description: searchHint + text }
				]);
			} else if (text.toLowerCase().startsWith("cv")) {
				suggest([
					{ content: articleHint + text, description: articleHint + text },
					{ content: searchHint + text, description: searchHint + text }
				]);
			} else if (text.toLowerCase().startsWith("uid") && parseInt(text.substring(3)).toString() == text.substring(3)) {
				suggest([
					{ content: userHint + text, description: userHint + text },
					{ content: searchHint + text, description: searchHint + text }
				]);
			} else {
				suggest([
					{ content: searchHint + text, description: searchHint + text }
				]);
			}
			chrome.omnibox.setDefaultSuggestion(
				{ description: noSearchHint }
			);
		});

		chrome.omnibox.onInputEntered.addListener((text) => {
			if (!text) return;
			var href = "";
			if (text.startsWith(videoHint)) {
				href = "https://www.bilibili.com/video/" + text.replace(videoHint, "");
				setUrl(href);
			} else if (text.startsWith(articleHint)) {
				href = "https://www.bilibili.com/read/" + text.replace(articleHint, "");
				setUrl(href);
			} else if (text.startsWith(noSearchHint)) {
				href = "https://search.bilibili.com/all?keyword=" + text.replace(searchHint, "") + "&from_source=nav_search_new";
				setUrl(href);
			} else if (text.startsWith(userHint)) {
				href = "https://space.bilibili.com/" + text.replace(userHint, "").replace("uid", "");
				setUrl(href);
			}
		});

		function setUrl(url) {
			chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
				chrome.tabs.update(tabs[0].id, { url: url })
			});
		}
	}

	registerOmnibox();
})();