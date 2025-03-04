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

    Load: () => {
        HeistsYaht.Ipl.Yaht.Load();
    }
};