export const Jump = (entities, { touches, time }) => {
    const hero = entities.hero.body;
    entities.hero.jump = false;

    touches.filter(t => t.type === 'move' && t.delta.locationY < -10)
        .forEach(touch => {
            console.log('jump');
            entities.hero.jump = true;
        });
    return entities;
};