define(function() {
   /**
    * Mix into the first argument properties from the remaining arguments.
    * No check is made to see if the properties exist in the first place.
    */
   function mixin(target) {
      Array.prototype.slice.call(arguments, 1)
         .forEach(function(source) {
            Object.keys(source).forEach(function(key) {
               target[key] = source[key];
            });
         });
      return target;
   }

   /**
    * Mix into the first argument properties from the remaining arguments,
    * but ONLY if those properties don't already exist.
    */
   mixin.safe = function safeMixin(target) {
      Array.prototype.slice.call(arguments, 1)
         .forEach(function(source) {
            Object.keys(source).forEach(function(key) {
               if (!target.hasOwnProperty(key)) {
                  target[key] = source[key];
               }
            });
         });
      return target;
   };

   return mixin;
});
