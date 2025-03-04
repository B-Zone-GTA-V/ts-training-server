import { DiamondCasino } from "./interiors/casino";
import { GunRunningYaht } from "./interiors/gunrunning_yaht";
import { HeistsYaht } from "./interiors/heist_yaht";

class interiorsUtils {
    init(): void {
        this.enableIpls();
        this.disableIpls();
        mp.gui.chat.push("Interiors initialized.");
        return;
    }

    enableIpls() {
        this.loadLosSantosPoliceDepartamentIpl();
        this.loadMechanicsIpl();
        this.loadMichaelhouse();
        // LS Beach House
        mp.game.streaming.requestIpl('ch1_02_closed');
        // Load interiors
        DiamondCasino.Load();
        HeistsYaht.Load();
        GunRunningYaht.Load();
    }

    loadMechanicsIpl() {
        mp.game.streaming.requestIpl('ajaxon_burton_lscv2_milo_');
        const interiorID = mp.game.interior.getInteriorAtCoords(-344.962, -122.361, 41.5921);
        mp.game.interior.enableInteriorProp(interiorID, 'office_01');
        // mp.game.interior.enableInteriorProp(interiorID, 'office_02');
    }

    loadMichaelhouse() {
        const michaleHouseInteriorId = 166657;
        mp.game.interior.enableInteriorProp(michaleHouseInteriorId, 'V_Michael_bed_tidy');
        mp.game.interior.enableInteriorProp(michaleHouseInteriorId, 'V_Michael_M_items');
        mp.game.interior.enableInteriorProp(michaleHouseInteriorId, 'V_Michael_D_items');
        mp.game.interior.enableInteriorProp(michaleHouseInteriorId, 'V_Michael_S_items');
        mp.game.interior.enableInteriorProp(michaleHouseInteriorId, 'V_Michael_L_Items');

        mp.game.interior.refreshInterior(michaleHouseInteriorId);

    }

    loadLosSantosPoliceDepartamentIpl() {
        mp.game.streaming.requestIpl('gabz_mrpd_milo_');
        const interiorID = mp.game.interior.getInteriorAtCoords(451.0129, -993.3741, 29.1718);
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm1');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm2');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm3');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm4');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm5');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm6');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm7');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm8');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm9');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm10');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm11');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm12');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm13');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm14');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm15');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm16');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm17');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm18');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm19');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm20');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm21');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm22');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm23');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm24');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm25');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm26');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm27');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm28');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm29');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm30');
        mp.game.interior.enableInteriorProp(interiorID, 'v_gabz_mrpd_rm31');
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