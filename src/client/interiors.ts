class interiorsUtils {
    init(): void {
        this.enableIpls();
        this.disableIpls();
        mp.gui.chat.push("Interiors initialized.");
        return;
    }

    enableIpls() {
        // LS Beach House
        mp.game.streaming.requestIpl('ch1_02_closed');
    }
    
    disableIpls() {
        // For Pillbox Hospital
        mp.game.streaming.removeIpl('rc12b_default');
        mp.game.streaming.removeIpl('rc12b_destroyed');
        mp.game.streaming.removeIpl('rc12b_hospitalinterior');
        mp.game.streaming.removeIpl('rc12b_hospitalinterior_lod');
        mp.game.streaming.removeIpl('rc12b_fixed');
    }
}

const interiors = new interiorsUtils();
export { interiors };