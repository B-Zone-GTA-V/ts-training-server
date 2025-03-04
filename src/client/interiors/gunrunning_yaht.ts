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

    Load: () => {
        GunRunningYaht.Ipl.Yaht.Load();
    }
};