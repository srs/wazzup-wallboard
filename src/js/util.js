app.util = {

    createGravatarUrl: function (user) {
        var email = user + '@' + app.config.gravatar.email_domain;
        return app.config.gravatar.url + '/' + $.md5(email);
    },

    daysUntil: function (timestamp) {

        var now = new Date().getTime();
        var diff = timestamp - now;

        if (diff <= 0) {
            return 0;
        }

        return Math.round(diff / (24 * 60 * 60 * 1000));
    },

    timeSince: function (timestamp) {
        return moment(timestamp).fromNow();
    }

};

