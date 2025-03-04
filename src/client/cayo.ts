import { cayoPericoNative, islandData, islandInteriorProps } from "./cayo_perico_constants";

class CayoUtils {
    islandPosition = new mp.Vector3(3643.571, -4975.425, 0);
    inCayoPerico = false;

    init(): void {
        this.unloadCayoPerico();
        this.loadIPLs();
        this.inCayoPerico = false;
        setInterval(() => {
            this.checkPlayerPosition();
        }, 1);
        return;
    }

    checkPlayerPosition() {
        const pos = mp.players.local.position;
        if (pos.x >= 3575 && pos.y <= -4000) {
            if (!this.inCayoPerico) {
                this.loadCayoPerico();
                this.inCayoPerico = true;
            }
        } else {
            if (this.inCayoPerico) {
                this.unloadCayoPerico();
                this.inCayoPerico = false;
            }
        }
    }

    loadCayoPerico() {
        // mp.gui.chat.push('Loading Cayo Perico...');
        this.enableInteriorProps();
        this.toggleCayoNatives(true);
        mp.game.zone.setZoneEnabled(mp.game.zone.getZoneFromNameId('PrLog'), false);
    }

    unloadCayoPerico() {
        // mp.gui.chat.push('Unloading Cayo Perico...');
        this.toggleCayoNatives(false);
        setTimeout(() => {
            this.loadIPLs();
        }, 1000);
    }

    toggleCayoNatives(toggle: boolean) {
        mp.game.invoke(cayoPericoNative.SET_TOGGLE_MINIMAP_HEIST_ISLAND, toggle);
        mp.game.invoke(cayoPericoNative.SET_ISLAND_ENABLED, 'HeistIsland', toggle);
        mp.game.invoke(cayoPericoNative.SET_AI_GLBOAL_PATH_NODES_TYPE, toggle);
    }

    loadIPLs() {
        for (let i = 0; i < islandData.ipls.length; i++) 
            if (!mp.game.streaming.isIplActive(islandData.ipls[i])) 
                mp.game.streaming.requestIpl(islandData.ipls[i]);

        const interior = mp.game.interior.getInteriorAtCoords(this.islandPosition.x, this.islandPosition.y, this.islandPosition.z);
        mp.game.interior.refreshInterior(interior);
    }

    enableInteriorProps() {        
        for (const prop of islandInteriorProps) {
            const interior = mp.game.interior.getInteriorAtCoordsWithType(prop.coords.x, prop.coords.y, prop.coords.z, prop.type);

            for (const propName of prop.props) 
                if (!mp.game.interior.isInteriorPropEnabled(interior, propName)) mp.game.interior.enableInteriorProp(interior, propName);

            mp.game.interior.refreshInterior(interior);
        }
    }

    render = mp.events.add('render', () => {
        mp.game.vehicle.displayDistantVehicles(false);
    });
}

const cayoUtils = new CayoUtils();
export { cayoUtils };