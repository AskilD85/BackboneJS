var ModelError = Backbone.Model.extend({
    defaults: {
        error: '',
    },
});
var ErrorCollection = Backbone.Collection.extend({
    model: ModelError
});