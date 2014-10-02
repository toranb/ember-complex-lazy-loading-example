var Router = Ember.Router.extend();

Router.map(function() {
    this.resource("reports", { path: "/" });
    this.route("wat", { path: "/wat" });
});

export default Router;
