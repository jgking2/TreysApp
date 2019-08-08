interface ViroConstants {
	RECORD_ERROR_ALREADY_RUNNING: 4;
	RECORD_ERROR_ALREADY_STOPPED: 5;
	RECORD_ERROR_INITIALIZATION: 2;
	RECORD_ERROR_NONE: -1;
	RECORD_ERROR_NO_PERMISSION: 1;
	RECORD_ERROR_UNKNOWN: 0;
	RECORD_ERROR_WRITE_TO_FILE: 3;
	TRACKING_LIMITED: 2;
	TRACKING_NORMAL: 3;
	TRACKING_REASON_EXCESSIVE_MOTION: 2;
	TRACKING_REASON_INSUFFICIENT_FEATURES: 3;
	TRACKING_REASON_NONE: 1;
	TRACKING_UNAVAILABLE: 1;
}

type ViroVector = [number, number, number];

interface ViroPlane {
	alignment: 'Horizontal' | 'Vertical';
	anchorId: string;
	center: ViroVector;
	height: number; //0.7970653772354126
	position: ViroVector;
	rotation: ViroVector;
	scale: ViroVector;
	type: 'plane';
	vertices: [ViroVector];
	width: number;
}

type isARSupportedOnDevice = (
	unsuccessfulCallback: Function,
	successfulCallback: Function
) => void;

declare module 'react-viro' {
	const ViroConstants: ViroConstants;
	const ViroARScene: any;
	const ViroText: any;
	const ViroImage: any;
	const ViroNode: any;
	const ViroARSceneNavigator: any;
	const ViroARPlaneSelector: any;
	const ViroARPlane: any;
	const ViroPolyline: any;
	const ViroCamera: any;
	const isARSupportedOnDevice: isARSupportedOnDevice;
}

declare type Vector = [number,number,number];
declare type Alignment = 'Horizontal'|'Vertical';
declare type Dimensions = 1 | 2 | 3;

type HitTestResultType = 'ExistingPlane' | 'FeaturePoint' | 'ExistingPlaneUsingExtent';

interface Transform {
    scale: Vector;
    position: Vector;
    rotation: Vector;
}

interface HitTestResult {
    type: HitTestResultType;
    transform: Transform;
}

declare interface ViroComponent {
    getTransformAsync: () => Promise<Transform>;
    setNativeProps: (props:any) => void;
}

/**
 * A measurement against a singular plane.
 */
interface PlaneMeasurement {
    /**
     * Identifier for the measurement.
     */
    id?: string;
    /**
     * The points that make up the cube, polygon, or the line.
     */
    points: Vector[];
    dimensions: number;
    /**
     * Allows for cubic measurements.
     */
    depth?: number;
    /**
     * If space needs to be removed from a measurement, this should help.
     */
    ignoreSpace?: [Vector[]];
}

declare interface MeasureState {
    headerComponents: JSX.Element[];
    footerComponents: JSX.Element[];
    selectedAnchor?: ViroAnchor;
    alignment: Alignment;   
    dimensions: Dimensions; 
    measurements: PlaneMeasurement[];
}

declare interface ViroARNavigator<T> {
    push: (scene: { scene: import('react').ComponentType<any> }) => void;
    replace: (scene: { scene: import('react').ComponentType<any> }) => void;
    pop: () => void;
    resetARSession: (resetTracking:boolean, removeAnchors:boolean) => void;
    viroAppProps: T;
}

declare interface ViroNavigatorProps<T> {
    arSceneNavigator: ViroARNavigator<T>;
}

declare interface ViroAnchor {
    alignment: Alignment;
    anchorId: string;
    center: Vector;
    height: number;
    position: Vector;
    rotation: Vector;
    scale: Vector;
    type: string; //"plane", what else?
    vertices: Vector[];
    width: number;
}