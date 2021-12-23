require('dotenv').config();


// connecting to MongoDB/Mongoose
const mongoose = require('mongoose');

const MONGOOSE_URI = 'mongodb+srv://admin:XXXXXXXXXXX@myfcc-cluster.c9kdq.mongodb.net/FCC_Backend?retryWrites=true&w=majority';
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("connected to DB"))
    .catch(err => console.log(err));



// Create Schema
const Schema = mongoose.Schema;
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});



// Create Model
const Person = mongoose.model('Person', personSchema);



// Functions
const createAndSavePerson = (done) => {
    var Jamie = new Person({
        name: "Jim",
        age: 21,
        favoriteFoods: ["eggs", "avocados", "fresh fruit"]
    });

    Jim.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, data) {
        if (err) return handleError(err);
        console.log(data);
        done(null, data);
    });
};


const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
        if (err) return handleError(err);
        console.log(data);
        done(null, data);
    })
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) return handleError(err);
        console.log(data);
        done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById({ _id: personId }, (err, data) => {
        if (err) return handleError(err);
        console.log(data);
        done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById({ _id: personId }, (err, data) => {
        if (err) return handleError(err);
        data.favoriteFoods.push(foodToAdd);
        data.save((err, data) => {
            if (err) return console.error(err);
            done(null, data);
        })
        console.log(data);
    });
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({ name: personName, }, { $set: { age: ageToSet } }, { new: true },
        (err, data) => {
            if (err) return console.log(err);
            done(null, data);
        });
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    Person.remove({ name: nameToRemove }, (err, data) => {
        if (err) return console.error(err);
        data.ok = true;
        data.n = data.deletedCount;
        done(null, data);
    });
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: "asc" })
        .limit(2)
        .select("-age")
        .exec(function(error, searchResult) {
            if (error) {
                return console.log(error);
            }
            done(null, searchResult);
        });
};


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;