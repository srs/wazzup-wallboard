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
    var ytUser = window.prompt("YouTrack User?", "");
    var ytPassword = password = window.prompt("YouTrack Password?", "");

    if (ytUser && ytPassword) {
        app.config.yt.auth_hash = $.base64.encode(ytUser + ':' + ytPassword);
        $.cookie('auth_hash', app.config.yt.auth_hash);
    }
} else {
    app.config.yt.auth_hash = $.cookie('auth_hash');
}

$(document).ready(function () {

    $('#broken-build-alert').addClass('animate');
});

