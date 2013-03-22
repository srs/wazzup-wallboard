app.display = {};


app.display.ScreenRotator = {
    timeoutId: -1,
    currentIdx: -1,

    init: function () {
        this.showSprintInfo();
    },

    showSprintInfo: function () {
        app.data.yt.loadAll();
        app.data.tc.loadAll();

        this.showBlamePopupIfNeeded();
        this.renderTemplate("sprintInfo", app.data.model);
        this.delay(this.showTasksInfo);
    },

    showTasksInfo: function () {
        this.renderTemplate("tasksInfo", app.data.model);
        this.delay(this.showBuildInfo);
    },

    showBuildInfo: function () {
        this.renderTemplate("buildInfo", app.data.model);
        this.delay(this.showBrokenBuilds);
    },

    showBrokenBuilds: function () {
        var me = this;

        if (app.data.model.tc.builds.broken.length > 0) {
            me.showBrokenBuild(0);
        } else {
            this.showSprintInfo();
        }
    },

    showBrokenBuild: function (index) {
        var me = this;

        me.renderTemplate("brokenBuild", app.data.model.tc.builds.broken[index]);
        index++;

        if (index < app.data.model.tc.builds.broken.length) {
            me.delay(function () {
                me.showBrokenBuild(index);
            });
        } else {
            me.delay(me.showSprintInfo);
        }
    },

    renderTemplate: function (name, data) {
        var source = $("#template-" + name).html();
        var template = Handlebars.compile(source);
        $("#screens").html(template(data));
    },

    delay: function (next) {
        var me = this;
        window.setTimeout(function () {
            next.call(me);
        }, app.config.display.interval);
    },

    showBlamePopupIfNeeded: function () {
        var brokenBuildsCount = app.data.model.tc.builds.broken.length;
        if (brokenBuildsCount > 0) {
            $('#blame-popup div').text(brokenBuildsCount + ' broken build(s)');
            $('#blame-popup').addClass('animate');
        } else {
            $('#blame-popup').removeClass('animate');
        }
    }
};

$(document).ready(function () {
    app.display.ScreenRotator.init();
});
