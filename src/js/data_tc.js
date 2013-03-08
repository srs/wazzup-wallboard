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

    loadBuildTypes: function () {
        var buildTypes = this.getJson('/app/rest/buildTypes');
        this.loadBuilds(buildTypes);
    },

    loadBuilds: function (projects) {
        for (var i = 0; i < projects.buildType.length; i++) {
            var buildInfo = this.getJson('/app/rest/builds/?locator=buildType:' + projects.buildType[i].id + '&count=1');
            this.loadBuildDetails(buildInfo, i);
        }
    },

    loadBuildDetails: function (buildInfo, index) {
        var buildDetails = this.getJson('/app/rest/builds/id:' + buildInfo.build[0].id);
        var buildStats = this.getJson('/app/rest/builds/id:' + buildInfo.build[0].id + '/statistics');

        app.data.model.tc.builds[index] = buildDetails;
        app.data.model.tc.builds[index].stats = buildStats;
    },

    loadAgents: function () {
        var agentInfos = this.getJson("/app/rest/agents");

        console.log(agentInfos);

        for (var i = 0; i < agentInfos.agent.length; i++) {
            var agentRunning = this.getJson("/app/rest/agents/id:" + agentInfos.agent[i].id + "/enabled");
            app.data.model.tc.agents[i] = {
                "name": agentInfos.agent[i].name,
                "running": agentRunning
            };
        }
    },

    loadAll: function () {
        this.loadBuildTypes();
        this.loadAgents();
        $(window).trigger('loadData');
    }
};

