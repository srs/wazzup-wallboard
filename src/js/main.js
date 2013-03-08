// Declare global namespace
app = {};

// Configuration
app.config = {

    display: {
        interval: 10000
    },

    yt: {
        url: 'https://youtrack.enonic.net',
        interval: 10 * 60 * 1000  // 10 minutes
    },

    tc: {
        url: 'http://teamcity.enonic.net',
        interval: 60 * 1000  // 60 seconds
    }

};

// Enter password for youtrack
if (!$.cookie('auth_hash')) {
    app.config.yt.user = window.prompt("YouTrack User?", "");
    app.config.yt.password = window.prompt("YouTrack Password?", "");

    if (app.config.yt.user && app.config.yt.password) {
        app.config.yt.auth_hash = $.base64.encode(app.config.yt.user + ':' + app.config.yt.password);
        $.cookie('auth_hash', app.config.yt.auth_hash);
    }
} else {
    app.config.yt.auth_hash = $.cookie('auth_hash');
}