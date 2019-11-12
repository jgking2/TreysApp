import Matter from "matter-js";

export const Physics = (entities, { touches, time }) => {
    const engine = entities.physics.engine;

    Matter.Engine.update(engine, time.delta);
    return entities;
};