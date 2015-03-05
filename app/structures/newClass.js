define(function() {

// Class infrastructure
return function newClass(init, superclass) {
   var cls, proto;

   init = init || function() {};
   superclass = superclass || Object;
   proto = Object.create(superclass.prototype);
   cls = Object.create({}, { "super": { value: superclass } });
   cls.prototype = proto;
   Object.defineProperty(cls.prototype, "class", { value: cls });
   cls.initialize = init;
   cls.new = function newObj() {
      var o = Object.create(cls.prototype);
      cls.initialize.apply(o, arguments);
      return o;
   };

   return cls;
}

});
