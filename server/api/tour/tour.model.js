'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('mongoose-validator'),
    User = require('../user/user.model.js'),
    uniqueValidator = require('mongoose-unique-validator');

var titleValidate = [
  validate({
    validator: 'isLength',
    arguments: [0,50],
    message: 'title should be less than 50 characters'
  })
];

// var cities = 'San Francisco,New York,Los Angelous'.split(',');
var themes = 'Romantic,Athletic,Ourdoor,Nature,Art,Music,Food,Social,Solitary,Adventure,Urban,Daytime,Nighttime'.split(',');
// var durations = 'More than a day,All day,Most of the day,Half day,Around an hour'.split(',');
var costs = '$,$$,$$$,$$$$'.split(',');

var TourSchema = new Schema({
  title: {type:String, required:true, validate:titleValidate, trim:true},
  author: {type: Schema.ObjectId, ref: User},
  description: String,
  reviews: [{body: String, rating: {type:Number, max:5, min:0}, reviewer: {name: String, id: {type: Schema.ObjectId, ref: User}}}],     //future features to fulfill on the front-end side
  city: String,
  duration: {type: String},
  theme: [{type:String, enum: themes}],   //future feature
  neighborhood: [String],
  cost: {type: String, enum: costs},      //future feature
  createdAt: {type: Date, default: Date.now()},
  spots: [{
    // tags:[String], 
    // in future iterations, it would be good to use consolidate all the boolean properties into
    // tags property
    free: Boolean,
    paid: Boolean,
    indoors: Boolean,
    outdoors: Boolean,
    photo: Boolean,
    adventure: Boolean,
    food: Boolean,
    drink: Boolean,
    task: String,
    address: String,
    points: String,      //todo: changes it to integer and make it a property of user
    imgurl: String
  }]
});


//This virtual could return the shortened profile of a single tour, which could be used in the future
// in api/:cityname.
TourSchema
  .virtual('profile')
  .get(function(){
    var sum = 0;
    for(var i = 0; i < this.reviews.length; i++){
      sum += this.reviews[i].rating;
    }

    return{
      'title': this.title,
      'author': this.author,
      'description': this.description,
      'rating': sum/this.reviews.length,
      'duration': this.duration
    };
  });

TourSchema.method('findAuthor',function(callback){
  return this.db.model('User').findById(this.author,callback);
});


module.exports = mongoose.model('Tour', TourSchema);
