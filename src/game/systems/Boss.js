import Matter from 'matter-js';

let ticks = 30;
let count = 0;
let jumpEvery = 140;
export const Boss = (entities, { touches, time }) => {
    const boss = entities.boss.body;
    count++;
    if(count % ticks === 0) {
        // console.log(boss);
        Matter.Body.applyForce(boss, boss.position, { x: -.07, y: 0 });
    }
    if(count % jumpEvery === 0) {
        Matter.Body.applyForce(boss, boss.position, { x: 0, y: -0.3 });
    }

    return entities;
};