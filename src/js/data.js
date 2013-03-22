// Declare data namespace
app.data = {};

// Setup initial data placeholders for model
app.data.model = {
    yt: {
        sprint: {
            name: 'Sprint 101',
            daysLeft: 10
        },
        status: {
            resolved: {
                count: 11,
                points: 88
            },
            pull_request: {
                count: 12,
                points: 89
            },
            in_progress: {
                count: 8,
                points: 10
            },
            open: {
                count: 10,
                points: 80
            }
        }
    },
    tc: {
        builds: {
            count: 8,
            broken_count: 0,
            broken: [
                {
                    project: 'Enonic CMS 5.x',
                    timestamp: 1345542982077,
                    change: 'CMS-44 Fixed something easy',
                    user: {
                        id: 'tsi',
                        name: 'Thomas Sigdestad'
                    }
                },
                {
                    project: 'Enonic CMS 4.x',
                    date: 1345542982077,
                    change: 'CMS-44 Fixed something easy',
                    id: 'tsi'
                }

            ]
        },
        agents: {
            count: 3,
            failure: 0,
            running: 2
        }
    }
};

// Declare TeamCity methods
app.data.tc = {

    // http://teamcity.enonic.net/guestAuth/app/rest/builds
    // http://teamcity.enonic.net/guestAuth/app/rest/builds/id:103
    // http://teamcity.enonic.net/guestAuth/app/rest/builds/id:103/statistics
    // http://api.jquery.com/promise/
    loadBuilds: function () {
        $.getJSON(app.config.tc.url + '/guestAuth/app/rest/builds?locator=count:20', function (data) {
            app.data.model.tc.builds = data;
            $(window).trigger('loadBuild', app.data.model.tc.builds);
        });
    },

    loadAll: function () {
        this.loadBuilds();
    }

};

