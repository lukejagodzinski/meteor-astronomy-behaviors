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
Post = Astro.Class({
  name: 'Post',
  collection: Posts,
  fields: ['title'],
  behaviors: ['timestamp']
});
```

We can also pass options to behavior, if it accepts any.

```js
Post = Astro.Class({
  name: 'Post',
  collection: Posts,
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

You can read more about this behavior in the behavior's [repo](https://github.com/jagi/meteor-astronomy-timestamp-behavior).

### Sort

You can read more about this behavior in the behavior's [repo](https://github.com/jagi/meteor-astronomy-sort-behavior).

### NestedSet

You can read more about this behavior in the behavior's [repo](https://github.com/jagi/meteor-astronomy-nestedset-behavior).

## Writing behaviors

We will describe process of creating a behavior on the example of the simplified `timestamp` behavior.

```js
Astro.createBehavior({
  name: 'timestamp',
  oninitbehavior: function(behaviorData) {
    // Here, we can do something with the behavior data (options) sent to
    // behavior in the class schema definition. In the "timestamp" behavior
    // we can override here names of the "createdAt" and "updatedAt" fields.
    // However, we have here simplified version of this behavior.
  },
  oninitclass: function(Class) {
    // Add fields to the Class.
    Class.addFields({
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
    Class.addEvents({
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

As you can see in the example above we have two functions. The first one "oninitbehavior" is called on the behavior initialization. When developer defines class schema and adds given behavior to the schema definition, he/she can also pass some options. Those options are passed as a first argument of the "oninitbehavior" method.

The second function is "oninitclass". It's called in the context of the module and the first and only argument is class object. In the "timestamp" behavior we add some methods and fields to the class in this method.

## Contribution

If you have any suggestions or want to write new modules please contact me, or just create issue or pull request.

## License

MIT
