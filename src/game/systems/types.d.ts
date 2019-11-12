interface Entities {
    physics: {
        world: import('matter-js').World;
        engine: import('matter-js').Engine;
    }
    hero: any;
    floor: any;
    boss: any;
}