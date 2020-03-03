
//создаем прототип нашего объекта или модели
var RocketModel = Backbone.Model.extend({
    defaults: {
        name: '',
        phone: '',
        state: 'users'
    },
    initialize: function() {},


    validate: function (obj) {
        var name = obj.name;
        var phone = obj.phone;
        /* 
        Валидация: имя не пустое, телефон состоит только из цифр,
        тире (возможен “+” как первый символ). 
        Если валидация не пройдена - где то рядом появляется сообщение об ошибке.
        */
        var regPhone = /^((\+*\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (name != undefined && name.length === 0) {
            console.log('Имя не должно быть пустым')
            return 'Имя не должно быть пустым';
        }
        if (!regPhone.test(phone)) {
            console.log('Проверьте номер телефона')
            return 'Проверьте номер телефона';
        }
    }
});

var RocketsCollection = Backbone.Collection.extend({
    model: RocketModel
});



