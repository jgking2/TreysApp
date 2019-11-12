interface Collision {
    bodyA: { id: number, type: string, label: string }
    bodyB: { id: number, type: string, label: string }
}

type Vector = {
    x: number;
    y: number;
}

export interface MatterBody extends Matter.Body {
    onCollide: (callback: (collision:Collision) => void) => void;
    position: Vector,
    bounds: {
        min: Vector;
        max: Vector;
    }
}

export interface CharacterProps {
    body: MatterBody;
    onDefeat: () => void;
}