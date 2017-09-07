chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('html/index.html', {
    "bounds": {
      "width": 400,
      "height": 350
    }
  });
});