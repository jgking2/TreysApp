import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Assets } from '../../assets';

import Matter from 'matter-js';
import { CharacterProps } from "./types";

export interface HeroProps extends CharacterProps {
    jump: boolean;
}

export const Hero = ({ body, jump, onDefeat }: HeroProps) => {
    const [ jumping, setJumping ] = useState(true);  
    // const [ defeated, setDefeated ] = useState(false);  
    //Allow hero to jump again upon landing
    useEffect(() => {
        let defeated = false;
        body.onCollide(collision => {
            if(collision.bodyB.label === 'floor') {
                console.log('hit the floor!');
                setJumping(false);
            }
            if(collision.bodyB.label === 'boss' && !defeated) {
                defeated = true;
                onDefeat()                
            }
        });
    }, []);

    useEffect(() => {
        if(jump && !jumping) {
            setJumping(true);
            Matter.Body.applyForce(body, body.position, {x: 0.00, y: -0.10 });
        }
    }, [jump, jumping]);
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    // const width = props.size[0];
    // const height = props.size[1];
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;        
    return (
        <Image 
            resizeMode={'stretch'}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height
            }}
            source={jumping? Assets.MegaManJumping : Assets.MegaManStanding}/>
        // <View
        //     >
                
        //     </View>
    );
}