import { enableIpl } from './helpers';

export const GunRunningYaht = {
    Ipl: {
        // GunRunning Yatch: -1363.724 6734.108 2.44598
        Yaht: {
            ipl: [
                'gr_heist_yacht2',
                'gr_heist_yacht2_bar',
                'gr_heist_yacht2_bar_lod',
                'gr_heist_yacht2_bedrm',
                'gr_heist_yacht2_bedrm_lod',
                'gr_heist_yacht2_bridge',
                'gr_heist_yacht2_bridge_lod',
                'gr_heist_yacht2_enginrm',
                'gr_heist_yacht2_enginrm_lod',
                'gr_heist_yacht2_lod',
                'gr_heist_yacht2_lounge',
                'gr_heist_yacht2_lounge_lod',
                'gr_heist_yacht2_slod',
            ],
            Load: () => enableIpl(GunRunningYaht.Ipl.Yaht.ipl, true),
            Remove: () => enableIpl(GunRunningYaht.Ipl.Yaht.ipl, false)
        },
    },

    Water: {
        handle: 0,
        water: 0,
        modelHash: mp.game.joaat('apa_mp_apa_yacht_jacuzzi_ripple1'),

        Enable: async (state: boolean) => {
            GunRunningYaht.Water.handle = mp.game.object.getClosestObjectOfType(-1369.0, 6736.0, 5.40, 5.0, GunRunningYaht.Water.modelHash, false, false, false)

            if (state) {
                if (GunRunningYaht.Water.handle === 0) {
                    mp.game.streaming.requestModel(GunRunningYaht.Water.modelHash);
                    
                    const success = await mp.game.waitForAsync(() => mp.game.streaming.hasModelLoaded(GunRunningYaht.Water.modelHash), 5000);

                    if (!success) return;

                    GunRunningYaht.Water.water = mp.game.object.createObjectNoOffset(GunRunningYaht.Water.modelHash, -1369.0, 6736.0, 5.40, false, false, false)
                    mp.game.entity.setAsMissionEntity(GunRunningYaht.Water.water, false, false)
                }
            } else {
                if (GunRunningYaht.Water.handle !== 0) {
                    mp.game.entity.setAsMissionEntity(GunRunningYaht.Water.handle, false, false)
                    mp.game.entity.delete(GunRunningYaht.Water.handle)
                }
            }
        }
    },

    Load: () => {
        GunRunningYaht.Ipl.Yaht.Load();
        GunRunningYaht.Water.Enable(true);
    }
};