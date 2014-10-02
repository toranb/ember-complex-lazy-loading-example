import Router from 'js/router';
import Resolver from 'ember/resolver';

var Application = Ember.Application.extend({
  modulePrefix: 'js',
  Resolver: Resolver['default']
});

function startApp() {
  var App;

  var attributes = {
    rootElement: '#ember-testing'
  };

  Router.reopen({
    location: 'none'
  });

  Ember.run(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset();

  return App;
}

export default startApp;
