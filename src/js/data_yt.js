app.data.yt = {

    getJson: function (path) {
        var result = {};

        $.ajax({
            type: 'GET',
            url: app.config.yt.url + '/rest/' + path,
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": "Basic " + app.config.yt.auth_hash
            },
            success: function (data) {
                result = data;
            }
        });

        return result;
    },

    loadAll: function () {
        var sprint = this.loadSprintData();
        var rawIssues = this.loadSprintIssues(sprint.name);
        var issues = this.transformIssues(rawIssues);
        var status = this.buildStats(issues);

        app.data.model.yt = {
            sprint: sprint,
            status: status
        };

        console.log(app.data.model.yt);
    },

    loadSprintData: function () {
        var now = new Date();
        var data = this.getJson('agile/CMS/sprints');
        var sprint = data.sprint[0];

        return {
            name: sprint.name,
            release: new Date(sprint.finish + ' ' + now.getFullYear()).getTime()
        };
    },

    loadSprintIssues: function (sprint) {
        var url = 'issue';

        url += '?filter=Sprint: {' + sprint + '}';
        url += '&with=State';
        url += '&with=Priority';
        url += '&with=Estimation';
        url += '&with=Resolved';
        url += '&max=500';

        return this.getJson(url);
    },

    transformIssues: function (issues) {
        var result = [];
        var me = this;

        $.each(issues['issue'], function (index, issue) {

            var item = {
                id: issue.id,
                resolved: me.extractFieldValue(issue, 'resolved', false),
                priority: me.extractFieldValue(issue, 'priority', 'unknown').toLowerCase(),
                state: me.extractFieldValue(issue, 'state', 'unknown').toLowerCase(),
                estimation: me.extractFieldValue(issue, 'estimation', '?')
            };

            result.push(item);
        });

        return result;
    },

    extractFieldValue: function (issue, name, defValue) {

        var result = defValue;

        $.each(issue['field'], function (index, field) {
            if (field['name'].toLowerCase() == name) {
                result = field['value'];

                if (Array.isArray(result)) {
                    result = result[0];
                }
            }
        });

        return result;
    },

    sumEstimation: function (issues) {

        var sum = 0;

        $.each(issues, function (index, issue) {
            var estimation = Number(issue['estimation']);
            if (!isNaN(estimation)) {
                sum += estimation;
            }
        });

        return sum;
    },

    buildStats: function (issues) {

        var resolvedStats = this.buildStatusInfo(issues, function (issue) {
            return issue['resolved'];
        });

        var pullRequestStats = this.buildStatusInfo(issues, function (issue) {
            return issue['state'] == 'pull request';
        });

        var inProgressStats = this.buildStatusInfo(issues, function (issue) {
            return issue['state'] == 'in progress';
        });

        var openStats = this.buildStatusInfo(issues, function (issue) {
            return issue['state'] == 'open';
        });

        return {
            resolved: resolvedStats,
            pull_request: pullRequestStats,
            in_progress: inProgressStats,
            open: openStats
        }
    },

    buildStatusInfo: function (issues, filter) {

        // Find filtered issues
        var filteredIssues = issues.filter(filter);

        // Build info
        return {
            count: filteredIssues.length,
            points: this.sumEstimation(filteredIssues)
        };
    }

};

$(document).ready(function () {
    app.data.yt.loadAll();

    setInterval(function () {
        app.data.yt.loadAll();
    }, app.config.yt.interval);
});
