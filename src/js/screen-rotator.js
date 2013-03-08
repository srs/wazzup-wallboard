app.display = {};

app.display.ScreenRotator = {
    timeoutId: -1,
    currentIdx: -1,

    init: function () {
        this.next();
    },

    next: function () {
        var me = this;
        me.currentIdx++;

        if (me.currentIdx === me.getAll().length) {
            me.currentIdx = 0;
        }
        me.displayScreen();

		// Wait n seconds before displaying next
        me.timeoutId = window.setTimeout(function () {
            me.next();
        }, app.config.display.interval);
    },

    displayScreen: function () {
        var me = this;
		var allScreens =  me.getAll();
		
        allScreens.each(function (i) {
            if (i === me.currentIdx) {
                $(this).css({'display': 'block', 'z-index': allScreens.length});
            } else {
                $(this).css({'display': 'none', 'z-index': i});
            }
        });
    },

	getAll: function () {
        return $('#screens').children('.screen');
    }

};

$(document).ready(function () {
    app.display.ScreenRotator.init();
});
