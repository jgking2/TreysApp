import React, { useState } from "react";
import { Image } from "react-native";
import { CharacterProps } from "./types";
import { Assets } from "../../assets";


export const Boss = ({ body, onDefeat }: CharacterProps) => {
        const [ defeated, setDefeated ] = useState(false);
        body.onCollide((pairs) => console.log(pairs));
        // console.log(props.body.position);
        const width = body.bounds.max.x - body.bounds.min.x;
        const height = body.bounds.max.y - body.bounds.min.y;
        const x = body.position.x - width / 2;
        const y = body.position.y - height / 2; 
        if(body.position.y > 1000 && !defeated) {
            setDefeated(true);
            onDefeat();
            // console.log('you win!');
        }
        // console.log(body.position.y);       
        return (
            <Image
                resizeMode="stretch"
                source={Assets.Boss}
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height
                }} />
    );
}