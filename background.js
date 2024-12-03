chrome.app.runtime.onLaunched.addListener(() => {
    chrome.app.window.create('window.html', {
        id: 'mainWindow',
        bounds: { width: 200, height: 300 },
        resizable: false
    });
});