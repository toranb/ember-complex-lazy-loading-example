import Report from 'js/models/report';

var ReportsController = Ember.ArrayController.extend({
    bar: function() {
        var model = Report.create();
        var foo = model.get('foo');
        return '%@ and ... bar'.fmt(foo);
    }.property()
});

export default ReportsController;
