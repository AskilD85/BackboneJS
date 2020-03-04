
var ViewError = Backbone.View.extend({

    tagName: 'div',

    events: {
       
    },

    initialize: function () {
        this.template = _.template($('#viewError').html());
        this.listenTo(this.model,'change', this.render);
    },

    render: function () {
        this.model.destroy();
        var view = this.template(this.model.toJSON());
        this.$el.html(view);
        return this.$el;
    },

    deleteError: function () {
        this.model.destroy();
    },
   
    
});
