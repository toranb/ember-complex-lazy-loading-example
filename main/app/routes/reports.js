var ReportsRoute = Ember.Route.extend({
    beforeModel: function() {
        return $.getScript('reports/dist/deps.min.js');
    }
});

export default ReportsRoute;
