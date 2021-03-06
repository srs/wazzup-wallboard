// Declare global namespace
app = {};

// Configuration
app.config = {

    display: {
        interval: 10000
    },

    yt: {
        url: 'https://youtrack.enonic.net'
    },

    tc: {
        url: 'http://teamcity.enonic.net',
        mock_failure: true,
        mock_success_rate: 0.6
    },

    gravatar: {
        url: 'http://robohash.org',
        email_domain: 'enonic.com',
        photo: true,
        unknown_id: '123456@enonic.com'
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


