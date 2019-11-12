import './plugins/ObjectCollision';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar, Dimensions } from 'react-native';
import Matter from 'matter-js';
import { Floor } from './Floor';
import { Physics, Jump, Shoot, Boss as BossSystem } from './systems';
import { Hero, Boss } from './entities';

Matter.use('matter-collision-events')

export const TreyGame = () => {
    const [ entities, setEntities ] = useState<any>(undefined);
    const [ running, setRunning ] = useState(false);
    const gameEngine = useRef<any>();

    // const onCollision = useCallback((e) => {
    //     gameEngine.current!.dispatch({ hello: 'world'});
    // },[]);

    useEffect(() => {
        const { height, width } = Dimensions.get('window');
        const engine = Matter.Engine.create({ enableSleeping: true });
        const world = engine.world;

        const hero = Matter.Bodies.rectangle(width/4, height/4, 50, 50, { label: 'hero' });
        const boss = Matter.Bodies.rectangle((width - width/4), height/4, 100, 100, { label: 'boss' });
        const floor = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true, label: 'floor' });
        Matter.World.add(world, [hero, floor, boss]);

        setEntities({
            physics: { engine, world },
            hero: { 
                onDefeat: () => gameEngine.current.dispatch({ type: 'stage-lose' }),
                body: hero,
                renderer: Hero
            },
            floor: {
                body: floor,
                size: [width, 50],
                color: 'blue',
                renderer: Floor
            },
            boss: {
                onDefeat: () => gameEngine.current.dispatch({ type: 'stage-win' }),
                body: boss,
                renderer: Boss
            }
        });
        setRunning(true);
        // return () => Matter.Events.off(engine, 'collisionStart', onCollision);
    }, []);

    const onEvent = useCallback((event) => {
        console.log(event);
    },[]);
    if(!entities) return null;
    return (<GameEngine
        ref={ref => gameEngine.current = ref!}
        style={{flex: 1}}
        onEvent={onEvent}
        entities={entities}
        systems={[Physics, Jump, Shoot, BossSystem]}
        // systems={[MoveFinger]}
        >
            <StatusBar hidden={true} />
    </GameEngine>)
};