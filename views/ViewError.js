
var ViewError = Backbone.View.extend({

    tagName: 'div',

    events: {
       
    },

    initialize: function () {
        this.template = _.template($('#viewError').html());
        this.listenTo(this.model,'change', this.render);
    },

    render: function () {
        console.log('render', this.model.toJSON() )
        this.model.destroy();
        var view = this.template(this.model.toJSON());
        this.$el.html(view);
        console.log('render', this.model.toJSON())
        return this.$el;
    },

    deleteError: function () {
        this.model.destroy();
    },
   
    
});
