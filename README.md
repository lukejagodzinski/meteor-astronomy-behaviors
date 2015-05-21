# Behaviors module for Meteor Astronomy

**Table of Contents**
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Behaviors](#behaviors)
  - [Timestamp](#timestamp)
  - [Slug](#slug)
  - [Sort](#sort)
- [Writing behaviors](#writing-behaviors)
- [Contribution](#contribution)
- [License](#license)

## About

Astronomy Behaviors is a module for [Meteor Astronomy](https://github.com/jagi/meteor-astronomy) package that introduces behaviors feature into you model. Behaviors are nice way of reusing your code for more than one model. If you have similar features in two or more classes, you should consider creating behavior for such feature. An example of good behavior can be `createdAt` and `updateAt` fields which should be filled with the current date on document save and on every document update. And it's why we've created `Timestamp` behavior for that.

## Installation

You shouldn't add the Astronomy Behaviors package directly to your project. Instead you should add a package for behavior you want to use. Right now there are three behaviors.

**Timestamp**

```sh
$ meteor add jagi:astronomy-timestamp-behavior
```

**Slug**

```sh
$ meteor add jagi:astronomy-slug-behavior
```

**Sort**

```sh
$ meteor add jagi:astronomy-sort-behavior
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

### Slug

You can read more about this behavior in the behavior's [repo](https://github.com/jagi/meteor-astronomy-slug-behavior).

### Sort

You can read more about this behavior in the behavior's [repo](https://github.com/jagi/meteor-astronomy-sort-behavior).

## Writing behaviors

We will describe process of creating a behavior on the example of the simplified `timestamp` behavior.

```js
Astro.createBehavior({
  name: 'timestamp',
  events: {
    addbehavior: function(behaviorData) {
      var Class = this;

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
    },
    initclass: function(schemaDefinition) {},
    initinstance: function(attrs) {}
  }
});
```

As you can see in the example above we have three events.

The `addbehavior` event is called on a behavior initialization. When defining behaviors in a class schema, you can pass some options to the behavior. Those options are available as the first argument of the `addbehavior` event handler.

Next event is `initclass`. It's called during a class creation in the context of this class.

The last event is `initinstance`. It's called during an instance creation in the context of this instance.

## Contribution

If you have any suggestions or want to write new modules please contact me, or just create issue or pull request.

## License

MIT
