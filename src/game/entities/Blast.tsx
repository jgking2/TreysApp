import React from "react";
import { Image } from "react-native";
import { Assets } from "../../assets";

export interface BossProps {
    size: number[];
    body: {
        position: {
            x: number;
            y: number;
        }
    };
    color: string;
}

export const Blast = (props: BossProps) => {
        const width = props.size[0];
        const height = props.size[1];
        const x = props.body.position.x - width / 2;
        const y = props.body.position.y - height / 2;        
        return (
            <Image 
                resizeMode={'stretch'}
                style={{
                position: "absolute",
                left: x,
                top: y,
                borderRadius: 10,
                width: width,
                height: height
            }} source={Assets.Blast} />
    );
}