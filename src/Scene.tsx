import React, { useState, useCallback, useEffect } from 'react';


import { ViroARScene, ViroARPlaneSelector, ViroConstants } from 'react-viro';

export const SceneSelection = (props : ViroNavigatorProps<any>) => {
    const onAnchorFound = useCallback(() => {
        console.log('anchor found');
    },[]);
    const onTrackingUpdated = useCallback(() => {
        console.log('tracking updated');
    },[]);
    const onSelectPlane = useCallback(() => {
        console.log('Plane selected');
    },[]);
    return (
        <ViroARScene
            onAnchorFound={onAnchorFound}
            anchorDetectionTypes={[`PlanesHorizontal`]}
            onTrackingUpdated={onTrackingUpdated}>
            <ViroARPlaneSelector
                alignment={"Horizontal"}
                onPlaneSelected={onSelectPlane}>
            </ViroARPlaneSelector>
        </ViroARScene>
    )
};