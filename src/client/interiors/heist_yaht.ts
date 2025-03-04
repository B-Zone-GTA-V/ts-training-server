import { enableIpl } from './helpers';

export const HeistsYaht = {
    Ipl: {
        // Heist Yatch: -2043.974 -1031.582 11.981
        Yaht: {
            ipl: [
                'hei_yacht_heist',
                'hei_yacht_heist_bar',
                'hei_yacht_heist_bar_lod',
                'hei_yacht_heist_bedrm',
                'hei_yacht_heist_bedrm_lod',
                'hei_yacht_heist_bridge',
                'hei_yacht_heist_bridge_lod',
                'hei_yacht_heist_enginrm',
                'hei_yacht_heist_enginrm_lod',
                'hei_yacht_heist_lod',
                'hei_yacht_heist_lounge',
                'hei_yacht_heist_lounge_lod',
                'hei_yacht_heist_slod'
            ],
            Load: () => enableIpl(HeistsYaht.Ipl.Yaht.ipl, true),
            Remove: () => enableIpl(HeistsYaht.Ipl.Yaht.ipl, false)
        },
    },

    
    Water: {
        handle: 0,
        water: 0,
        modelHash: mp.game.joaat('apa_mp_apa_yacht_jacuzzi_ripple1'),

        Enable: async (state: boolean) => {
            HeistsYaht.Water.handle = mp.game.object.getClosestObjectOfType(-2023.773, -1038.0, 5.40, 5.0, HeistsYaht.Water.modelHash, false, false, false)

            if (state) {
                if (HeistsYaht.Water.handle === 0) {
                    mp.game.streaming.requestModel(HeistsYaht.Water.modelHash);
                    
                    const success = await mp.game.waitForAsync(() => mp.game.streaming.hasModelLoaded(HeistsYaht.Water.modelHash), 5000);

                    if (!success) return;

                    HeistsYaht.Water.water = mp.game.object.createObjectNoOffset(HeistsYaht.Water.modelHash, -2023.773, -1038.0, 5.40, false, false, false)
                    mp.game.entity.setAsMissionEntity(HeistsYaht.Water.water, false, false)
                }
            } else {
                if (HeistsYaht.Water.handle !== 0) {
                    mp.game.entity.setAsMissionEntity(HeistsYaht.Water.handle, false, false)
                    mp.game.entity.delete(HeistsYaht.Water.handle)
                }
            }
        }
    },

    Load: () => {
        HeistsYaht.Ipl.Yaht.Load();
        HeistsYaht.Water.Enable(true);
    }
};