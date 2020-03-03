
var RocketView = Backbone.View.extend({

    tagName: 'tr',

    events: {
        'click .changeSize': 'changeSize',
        'click .deleteRow':  'deleteRow',
       
        'click .editRow': 'editRow',
        'click .saveEditRow': 'saveEditRow',
    },

    templates: {
        "users": _.template(document.getElementById('viewRocket').innerHTML),
        "edit": _.template(document.getElementById('edit').innerHTML),
    },

    initialize: function () {
        //this.template = _.template($('#viewRocket').html());
        
        //this.model = new RocketsCollection();
        this.Error = new ModelError(); 
        this.listenTo(this.model,'change', this.render);
        this.listenTo(this.model,'destroy', this.remove);
    },

    render: function () {
        
        var state = this.model.get('state');
        var view = this.templates[state](this.model.toJSON());
        this.$el.html(view);

        //$(this.el).html(this.templates[state](this.model.toJSON()));

        return this.$el;

    },

    deleteRow: function() {
        this.Error.set({
            error: ''
        });
        this.model.destroy();
    },
    

    editValue: function (model) {
        var res = this.model.set({
            name: this.$('.name').text(),
            description: this.$('.desc').text(),
          
        },{validate: true});
        if (!res) this.render();
    },



    editRow: function () {
        this.model.set({
            state: 'edit'
        });
    },

    saveEditRow: function () {
        var name =  this.$('.editName').val();
        var phone = this.$('.editPhone').val();
        this.myModel = new RocketModel();

        this.myModel.set({
            name,
            phone,
           }, {validate: true});

        var errorTxt = this.myModel.validationError;

       if(this.myModel.isValid()) {
           this.model.set({
               name,
               phone,
               state: 'users'
           });
           this.Error.set({
               error: ''
           });
       } else {
            this.Error.set({
               error: errorTxt
           });

           this.err(this.Error);
       };

    },

    err: function (err) {
        var view = new ViewError({ model: err });
        $('#error').html(view.render());
    },  

    
    changeSize: function(ev) {
        var diff = parseInt($(ev.target).attr('data-rel'));
        var size = this.model.get('size');
        var res = this.model.set({
            size: size+diff
        },{validate: true});

        if (!res) this.render();
    }, 
    
});
