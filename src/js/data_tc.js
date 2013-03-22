app.data.tc = {

    getJson: function (path) {

        var result = {};

        $.ajax({
            type: 'GET',
            url: app.config.tc.url + '/guestAuth' + path,
            dataType: 'json',
            async: false,
            success: function (data) {
                result = data;
            }
        });

        return result;
    },

    loadAll: function () {
        this.loadBuildTypes();
        this.loadAgents();
    },

    loadBuildTypes: function () {
        var buildTypes = this.getJson('/app/rest/buildTypes');

        this.loadBuilds(buildTypes);
    },

    loadBuilds: function (projects) {

        app.data.model.tc.builds.broken = [];

        app.data.model.tc.builds.count = projects.buildType.length;

        var numberOfBrokenBuilds = 0;

        for (var i = 0; i < projects.buildType.length; i++) {

            var buildInfo = this.getJson('/app/rest/builds/?locator=buildType:' + projects.buildType[i].id + '&count=1');

            var buildStatus = buildInfo.build[0];
            var projectName = projects.buildType[i].projectName;

            if (buildStatus.status != "SUCCESS") {
                this.loadBrokenBuilds(projectName, buildInfo);
                numberOfBrokenBuilds++;
            }
        }

        app.data.model.tc.builds.broken_count = numberOfBrokenBuilds;
    },

    loadBrokenBuilds: function (projectName, buildInfo) {
        var buildDetails = this.getJson('/app/rest/builds/id:' + buildInfo.build[0].id);

        var relatedIssues = buildDetails.relatedIssues;

        if (relatedIssues != null) {

            var changeId = relatedIssues.issueUsage[0].changes.change[0].id;
            var changeDetails = this.getJson('/app/rest/changes/id:' + changeId);

            var changeTime = moment(changeDetails.date, 'YYYYMMDDTHHmmssZ');
            var userId = changeDetails.username;

            var brokenBuildInfo = {
                project: projectName,
                id: userId,
                change: changeDetails.comment,
                broken_since: app.util.timeSince(new Date(changeTime).getTime()),
                blame_image: app.util.createGravatarUrl(userId)
            }

            app.data.model.tc.builds.broken.push(brokenBuildInfo);
        }
    },

    loadAgents: function () {
        var agentInfos = this.getJson("/app/rest/agents");
        var agentCount = agentInfos.agent.length;
        var agentsRunning = 0;
        var agentsFailure = 0;

        for (var i = 0; i < agentInfos.agent.length; i++) {
            var agentRunning = this.getJson("/app/rest/agents/id:" + agentInfos.agent[i].id + "/enabled");

            if (agentRunning) {
                agentsRunning++;
            } else {
                agentsFailure++;
            }
        }

        app.data.model.tc.agents = {
            count: agentCount,
            running: agentsRunning,
            failures: agentsFailure
        }

    }
}
;

$(document).ready(function () {
    app.data.tc.loadAll();

    setInterval(function () {
        app.data.tc.loadAll();
    }, app.config.tc.interval);
});

