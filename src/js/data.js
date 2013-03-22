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
            broken: [
                {
                    project: 'Enonic CMS 5.x',
                    timestamp: 1345542982077,
                    change: 'CMS-44 Fixed something easy',
                    user: {
                        id: 'tsi',
                        name: 'Thomas Sigdestad'
                    }
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

