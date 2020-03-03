var RocketsView = Backbone.View.extend({

    tagName: 'tr',

    events: {
        "click .addObject": "addObject",
    },

    initialize: function() {
        this.template = _.template($('#viewRockets').html());
        this.$el.html(this.template());
        this.coll = new RocketsCollection(
          
        );

        


        this.myModel = new RocketModel();
        this.Error = new ModelError(); 
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);
        this.fill();
    },

    
    fill: function () {
        console.log(users.toJSON())
        //console.log(this.coll.set(users));
        var view = _.template(document.getElementById('viewRocket').innerHTML)(users.toJSON());
        this.$el.html(view);

        //$(this.el).html(this.templates[state](this.model.toJSON()));

        return this.$el;
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
        console.log(1, model)
        var view = new RocketView({ model: model });
        this.$('.rocketsList').append(view.render());
    },

    

    err: function (err) {
        var view = new ViewError({ model: err });
        this.$('#error').html(view.render());
    }
});

var users = new RocketModel(
    [
        { name: "Саша", phone: 555555555 },
        { name: "Юля", phone: 66666666 },
        { name: "Надя", phone: 77777777  }
    ]
)
