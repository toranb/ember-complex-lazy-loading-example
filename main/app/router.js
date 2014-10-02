var Router = Ember.Router.extend();

Router.map(function() {
    this.resource("people", { path: "/" });
    this.resource("reports", { path: "/reports" });
});

export default Router;
