import Matter from 'matter-js';
import { Blast } from '../entities/Blast'

let shotsCount = 0;

export const Shoot = (entities:Entities, { touches } : { touches: RNGETouch[] }) => {
    const { physics : { world } } = entities;
    const diameter = 25;
    touches.filter(t => t.type === 'press')
        .forEach(t => {
            const key = `blast-${++shotsCount}`;
            const start = entities.hero.body.position;
            const blast = Matter.Bodies.rectangle(start.x + 15, start.y, diameter, diameter, { force: { x: .1, y: -.01 }, collisionFilter: { mask: 1, category: 2, group: 0 } });
            blast.onCollide((e) => {
                const { bodyA, bodyB } = e;
                if(bodyA.label !== 'hero') {
                    Matter.World.remove(world, blast);
                    delete entities[key];
                }
            });
            Matter.World.addBody(world, blast);
            entities[key] = {
                body: blast, 
                size: [diameter,diameter], color:'grey', renderer: Blast }
        });
    return entities;
};