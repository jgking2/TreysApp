import React, { useState, useCallback, useEffect } from 'react';

import { ViroARScene, ViroARPlaneSelector, ViroConstants, ViroARSceneNavigator } from 'react-viro';

const API_KEY = 'D3C29FFC-3B57-42E1-A914-947120CE38A9';

export const FindHeroes = (props : ViroNavigatorProps<any>) => {
    const exit = console.log;
    const onSave = console.log;

    return (
        <ViroARSceneNavigator
            viroAppProps={{ exit, onSave }}
            apiKey={API_KEY}
            initialScene={{ scene: SceneSelection }} />
        
    )
};

const SceneSelection = () => {
    console.log('hey!');
    const onAnchorFound = useCallback(() => {
        console.log('anchor found');
    },[]);
    const onTrackingUpdated = useCallback(() => {
        console.log('tracking updated');
    },[]);
    const onSelectPlane = useCallback(() => {
        console.log('Plane selected');
    },[]);
    return <ViroARScene
            onAnchorFound={onAnchorFound}
            anchorDetectionTypes={[`PlanesHorizontal`]}
            onTrackingUpdated={onTrackingUpdated}>
            <ViroARPlaneSelector
                alignment={"Horizontal"}
                onPlaneSelected={onSelectPlane}>
            </ViroARPlaneSelector>
        </ViroARScene>
}