Astronomy.Behavior({
  name: 'Timestamp',
  fields: {
    createdAt: {
      type: 'date',
      default: null
    },
    updatedAt: {
      type: 'date',
      default: null
    }
  },
  events: {
    beforeInsert: function() {
      this.createdAt = new Date();
    },
    beforeUpdate: function() {
      this.updatedAt = new Date();
    }
  }
});
