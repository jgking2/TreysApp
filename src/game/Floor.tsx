import React from "react";
import { View } from "react-native";

export interface BirdProps {
    size: number[];
    body: {
        position: {
            x: number;
            y: number;
        }
    };
    color: string;
}

export const Floor = (props: BirdProps) => {
    // console.log(props);
    const width = props.size[0];
    const height = props.size[1];
    // const x = props.body.position.x - width / 2;
    // const y = props.body.position.y - height / 2;        
    return (
        <View
            style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: width,
                height: height,
                backgroundColor: props.color
            }} />
    );
}