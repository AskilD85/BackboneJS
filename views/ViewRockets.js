var RocketsView = Backbone.View.extend({

    tagName: 'tr',

    events: {
        "click .addObject": "addObject",
    },

    initialize: function() {
        this.template = _.template($('#viewRockets').html());
        this.$el.html(this.template());
        this.coll = new RocketsCollection();
        this.myModel = new RocketModel();
        this.Error = new ModelError(); 
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);
        this.coll.set(users.toJSON())
    },

    addObject: function() {


        var username = document.getElementById('addUsername').value;
        var phone = document.getElementById('addPhone').value;
        
        this.myModel.clear()

        this.myModel.set({
            name: username,
            phone: phone
        }, { validate: true });


        var errorTxt = this.myModel.validationError;
        if (this.myModel.isValid()) {
            this.coll.add([
                {
                    name: username,
                    phone: phone
                }
            ]
                
            );
            this.Error.set({
                error: ''
            });
            //очищаем поля
            document.getElementById('addUsername').value = '';
            document.getElementById('addPhone').value = '';

        } else {
            this.Error.set({
                error: errorTxt
            });
                  
            this.err(this.Error);
           
        }
    },

    addOne: function(model) {
        var view = new RocketView({ model: model });
        this.$('.rocketsList').append(view.render());
    },

    

    err: function (err) {
        var view = new ViewError({ model: err });
        this.$('#error').html(view.render());
    }
});
// начальные значения
var users = new RocketsCollection(
    [
        { name: "Саша", phone: '555555555' },
        { name: "Юля", phone: '666666666' },
        { name: "Маша", phone: '777777777' },
        { name: "Петя", phone: '00000000' }
    ]
)
