app.util = {

    createGravatarUrl: function (user, size) {
        var email = user + '@' + app.config.gravatar.email_domain;

        var url = app.config.gravatar.url + '/' + $.md5(email);
        url += '?size=' + size;
        url += '&d=retro';

        return url;
    },

    daysUntil: function (timestamp) {
        // 3
    },

    timeSince: function (timestamp) {
        // 2 hours
    }

};

