app.util = {

    createGravatarUrl: function (user) {
        var email = app.config.gravatar.unknown_id;

        if (user != null) {
            email = user + '@' + app.config.gravatar.email_domain;
        }

        var url = app.config.gravatar.url + '/' + email;
        url += '?size=500x500';

        if (app.config.gravatar.photo) {
            url += '&gravatar=yes';
        }

        return url;
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

