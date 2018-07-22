// Link to this file from a dummy HTML page and open the console in dev tools

// Practicing constructor functions, etc.

// The constructor starts with a capital letter, by convention. 
// Notice the use of the *this* object.
function BookConstructor(title, author, pubDate, genre, publisher, tags){
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
    this.genre = genre;
    this.publisher = publisher;
    this.tags = tags;
}

// Add a method to the BookConstructor function's prototype object
// Again, notice the use of the *this* object
BookConstructor.prototype.summarize = function(){
    return `${this.title} by ${this.author} was published in ${this.pubDate} by ${this.publisher}.`
    }

// Create a new book "instance" using the BookConstructor function
// Notice the use of the *new* operator
const otherLands = new BookConstructor("In Other Lands", "Sarah Rees Brennan", 2017, "fantasy", "Big Mouth House");

console.log("This is the book constructor:");
console.log(BookConstructor);
// Below I'm using the summarize function inherited from BookConstructor
console.log("This is the 'In Other Lands' instance.");
console.log(otherLands);

// Call the summarize method on otherLands
console.log("Let's call the summarize function on 'In Other Lands':")
console.log(otherLands.summarize());

// otherLands owns whatever properties are defined in its constructor at the time that otherLands was instantiated. For example, author and title are properties that 'belong' to otherLands.
console.log("Does otherLands.hasOwnProperty() return true for author and title? ");
console.log(otherLands.hasOwnProperty("author", "title")); //=> true
console.log("Now how about summarize? ");
console.log(otherLands.hasOwnProperty("summarize")); // => false

// How do I know that otherLands is an instance of the BookConstructor constructor? The instanceof operator.
console.log("Is 'In Other Lands' an instance of the book constructor function? ")
console.log(otherLands instanceof BookConstructor); // => true

// Getting prototype info:
console.log("Is BookConstructor's prototype the prototype of otherLands?");
console.log(BookConstructor.prototype.isPrototypeOf(otherLands)); //=> true
console.log("Get prototype of otherLands");
console.log(Object.getPrototypeOf(otherLands));

//We can extend the BookConstructor function, but include new parameters
function StoryConstructor(anthology, title, author, pubDate, genre, publisher, tags){
    // Steal BookConstructor's properties and methods, but use the *call* method to use StoryConstructor's *this* object, not BookConstructor's
    BookConstructor.call(this, title, author, pubDate, genre, publisher, tags)
    this.anthology = anthology;
}

// Overwrite StoryConstructor's prototype with BookConstructor's, but create a new copy, not a reference to the original
StoryConstructor.prototype = Object.create(BookConstructor.prototype);
// Then set the constructor property back to StoryConstructor
StoryConstructor.prototype.constructor = StoryConstructor;

// Create a story instance.
const myStory = new StoryConstructor("An Anthology", "My Story", "JJ");
console.log("A new story instance, created using the story constructor function, which is an extension of the book constructor function.")
console.log(myStory)

console.log("Does myStory.hasOwnProperty() return true for author and title? ");
console.log(myStory.hasOwnProperty("author", "title")); //=> true
console.log("Now how about summarize? ");
console.log(myStory.hasOwnProperty("summarize")); // => false

// How do I know that myStory is an instance of the story constructor function? The instanceof operator.
console.log("Is 'My Story' an instance of the story constructor function? ")
console.log(myStory instanceof StoryConstructor); // => true
console.log("However, it is also an instance of the book constructor function, because book constructor is in its prototype chain.")
console.log(myStory instanceof BookConstructor); // => true

// Getting prototype info:
console.log("Is StoryConstructor's prototype the prototype of myStory?");
console.log(StoryConstructor.prototype.isPrototypeOf(myStory)); //=> true
console.log("However, BookConstructor's prototype is also the prototype of myStory.");
console.log(BookConstructor.prototype.isPrototypeOf(myStory)); //=> true
console.log("Get prototype of myStory");
console.log(Object.getPrototypeOf(myStory));