# Behaviors module for Meteor Astronomy

Behaviors module is a nice way of reusing your code for more than one class. If you have similar features in two or more classes, you should consider creating behavior for a such feature. An example of good behavior can be `createdAt` and `updateAt` fields which should be filled with the current date on document's save and on every document's update. And it's why we've created `timestamp` behavior for that purpose.

A detailed information about module can be found on [this Wiki page](https://github.com/jagi/meteor-astronomy/wiki/Behaviors).
