# Meteor Astronomy Behaviors

**Table of Contents**
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Behaviors](#behaviors)
  - [Timestamp](#timestamp)
  - [Sort](#sort)
  - [NestedSet](#nested-set)
- [Writing behaviors](#writing-behaviors)
- [Contribution](#contribution)
- [License](#license)

## About

Meteor Astronomy Behaviors is a module for [Meteor Astronomy](https://github.com/jagi/meteor-astronomy) package that introduces behaviors feature into you model. Behaviors are nice way of reusing your code for more than one model. If you have similar features in two or more schemas, you should consider creating behavior for such feature. An example of good behavior can be `createdAt` and `updateAt` fields which should be filled with the current date on document save and on every document update. And it's why we've created `Timestamp` behavior for that.

## Installation

You shouldn't add the Meteor Astronomy Behaviors package directly to your project. Instead you should add a package for behavior you want to use. Right now there are three behaviors.

**Timestamp**

```sh
$ meteor add jagi:astronomy-timestamp-behavior
```

**Sort**

```sh
$ meteor add jagi:astronomy-sort-behavior
```

**NestedSet**

```sh
$ meteor add jagi:astronomy-nestedset-behavior
```

## Usage

Let's see how to add behavior to our model.

```js
Post = Astronomy.Class({
  name: 'Post',
  collection: Posts,
  transform: true,
  fields: ['title'],
  behaviors: ['timestamp']
});
```

We can also pass options to behavior, if it accepts any.

```js
Post = Astronomy.Class({
  name: 'Post',
  collection: Posts,
  transform: true,
  fields: ['title'],
  behaviors: {
    'timestamp': {
      createdFieldName: 'created'
    }
  }
});
```

## Behaviors

Right now, there are three behaviors (more to come) [NestedSet](#nestedset), [Sort](#sort), [Timestamp](#timestamp).

### Timestamp

This behavior adds to fields to the schema `createdAt` and `updatedAt`. Those fields will be automatically filled with the current date on document insertion and update.

```js
var post = new Post();
post.save();
console.log(post.createdAt); // Prints out date of document saving
```

### Sort

The Sort behavior helps with the process of sorting documents. It delivers several useful methods to manage sorting.

The `takeOut` method takes document out of the sorted list.

```js
var post = Posts.findOne();
post.takeOut();
```

The `insertAt` method inserts document on the given position in the list.

```js
var post = Posts.findOne();
post.insert(0); // Insert at the beginning of the list
```

The `moveBy` method moves document up or down by given distance.

```js
var post = Posts.findOne();
post.moveBy(2); // Move up by 2
post.moveBy(-2); // Move down by 2
```

The `moveTo` method moves document to given position.

```js
var post = Posts.findOne();
post.moveTo(10); // Moves document to position 10
```

The `moveUp` and `moveDown` methods move document up or down by given distance.

```js
var post = Posts.findOne();
post.moveUp(2); // Move up by 2
post.moveDown(2); // Move down by 2
```

The `moveToTop` and `moveToBottom` methods move document to the top or bottom of the list.

```js
var post = Posts.findOne();
post.moveTop(); // Move to up
post.moveBottom(); // Move to bottom
```

### NestedSet

The NestedSet behavior is responsible for creating tree structures within collection. You can read more about Nested Sets on the [Wikipedia](http://en.wikipedia.org/wiki/Nested_set_model). Behavior provides only one method `getNode` that returns node object that takes care of all tree management. It has many methods but you will use only few of them.

`getDoc`

`isValidNode`

`isRoot`

`isLeaf`

`hasChildren`

`hasParent`

`getParent`

`hasPrevSibling`

`hasNextSibling`

`getPrevSibling`

`getNextSibling`

`getSiblings`

`getDescendants`

`getChildren`

`getLeftValue`

`setLeftValue`

`getRightValue`

`setRightValue`

`getDepthValue`

`setDepthValue`

`getRootValue`

`setRootValue`

`makeRoot`

`addChild`

`remove`

`insertAsLastChildOf`

`moveAsLastChildOf`

`moveAsPrevSiblingOf`

`moveAsNextSiblingOf`

## Writing behaviors

We will describe process of creating a behavior on the example of the simplified `timestamp` behavior.

```js
Astronomy.Behavior({
  name: 'timestamp',
  aliases: ['time'], // Add some aliases.
  init: function(behaviorData) {
    // Here, we can do something with the behavior data (options) sent to
    // behavior in the class schema definition. In the "timestamp" behavior
    // we can override here names of the "createdAt" and "updatedAt" fields.
    // However, we have here simplified version of this behavior.
  },
  initSchema: function() {
    // Add fields to the schema.
    schema.addFields({
      createdAt: {
        type: 'date',
        default: null
      },
      updatedAt: {
        type: 'date',
        default: null
      }
    });

    // Update the "createdAt" and "updatedAt" fields in proper events.
    schema.addEvents({
      beforeInsert: function() {
        this.createdAt = new Date();
      },
      beforeUpdate: function() {
        this.updatedAt = new Date();
      }
    });
  }
});
```

As you can see in the example above we have two functions. The first one "initSchema" is called on the behavior initialization. When developer defines class schema and adds given behavior to the schema definition, he/she can also pass some options. Those options are passed as a first argument of the "initSchema" method.

The second function is "initSchema". It's called in the context of the class schema. In the "timestamp" behavior we add some methods and fields to the schema.

## Contribution

If you have any suggestions or want to write new modules please contact me, or just create issue or pull request.

## License

MIT
