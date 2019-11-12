import Matter from 'matter-js';

/**
 * @type {Matter.Plugin}
 */
const MatterCollisionEvents = {
  name: 'matter-collision-events',
  version: '0.1.5',
  for: 'matter-js@^0.14.2',
  install: function(matter : typeof Matter) {
    // add the onCollide, onCollideEnd, and onCollideActive callback handlers
    // to the native Matter.Body created
    const create = matter.Body.create;
    matter.Body.create = function() {
      //@ts-ignore
      const body = create.apply(null, arguments);
      //@ts-ignore
      body.onCollide = function(cb) { body._mceOC = cb; }
      //@ts-ignore
      body.onCollideEnd = function(cb) { body._mceOCE = cb; }
      //@ts-ignore
      body.onCollideActive = function(cb) { body._mceOCA = cb; }
      return body;
    }
    //@ts-ignore
    matter.after('Engine.create', function() {
      //@ts-ignore
      matter.Events.on(this, 'collisionStart', function(event) {
        //@ts-ignore
        event.pairs.map(function(pair) {
          //@ts-ignore
          matter.Events.trigger(pair.bodyA, 'onCollide', { pair : pair });
          //@ts-ignore
          matter.Events.trigger(pair.bodyB, 'onCollide', { pair : pair });
          pair.bodyA._mceOC &&
            pair.bodyA._mceOC(pair)
          pair.bodyB._mceOC &&
            pair.bodyB._mceOC(pair)
        });
      });

      matter.Events.on(this, 'collisionActive', function(event) {
        event.pairs.map(function(pair) {
          matter.Events.trigger(
            pair.bodyA,
            'onCollideActive',
            { pair: pair }
          );
          matter.Events.trigger(
            pair.bodyB,
            'onCollideActive',
            { pair: pair }
          );
          pair.bodyA._mceOCA &&
            pair.bodyA._mceOCA(pair)
          pair.bodyB._mceOCA &&
            pair.bodyB._mceOCA(pair)
        });
      });

      matter.Events.on(this, 'collisionEnd', function(event) {
        event.pairs.map(function(pair) {
          matter.Events.trigger(pair.bodyA, 'onCollideEnd', { pair : pair });
          matter.Events.trigger(pair.bodyB, 'onCollideEnd', { pair : pair });
          pair.bodyA._mceOCE &&
            pair.bodyA._mceOCE(pair)
          pair.bodyB._mceOCE &&
            pair.bodyB._mceOCE(pair)
        });
      });
    });
  },
};

Matter.Plugin.register(MatterCollisionEvents as any);

export {
    MatterCollisionEvents
}