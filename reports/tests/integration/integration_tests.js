var App;

module('integration tests', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, 'destroy');
    }
});

test('default page has a link-to for wat', function() {
    visit('/').then(function() {
        var x = find('.reportz');
        equal(' and foo... and ... bar', x.text());
    });
    click('.wat');
    andThen(function() {
        var x = find('h2');
        equal('In the Wat', x.text());
    });
});

