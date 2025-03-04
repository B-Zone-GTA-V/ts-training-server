export function enableIpl(ipl: string | Array<string>, activate: boolean) {
    if (typeof ipl !== 'string') 
        for (const value of ipl) {
            enableIpl(value, activate);
        }
    else {
        if (activate) {
            if (!mp.game.streaming.isIplActive(ipl))
                mp.game.streaming.requestIpl(ipl);
        } else {
            if (mp.game.streaming.isIplActive(ipl))
                mp.game.streaming.removeIpl(ipl);
        }
    }
}

export interface InteriorProps {
    coords: Vector3,
    props: Array<string>,
}

export function enableInteriorProps(interiorProps: InteriorProps) {        
    const interior = mp.game.interior.getInteriorAtCoords(interiorProps.coords.x, interiorProps.coords.y, interiorProps.coords.z);
    for (const prop of interiorProps.props) {
        if (!mp.game.interior.isInteriorPropEnabled(interior, prop)) mp.game.interior.enableInteriorProp(interior, prop);
    }
    
    mp.game.interior.refreshInterior(interior);
}