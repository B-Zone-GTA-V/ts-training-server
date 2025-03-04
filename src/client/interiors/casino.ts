import { enableIpl } from './helpers';

export const DiamondCasino = {
    Ipl: {
        Building: {
            ipl: [
                'hei_dlc_windows_casino',
                'hei_dlc_casino_aircon',
                'vw_dlc_casino_door',
                'hei_dlc_casino_door',
            ],
            Load: () => enableIpl(DiamondCasino.Ipl.Building.ipl, true),
            Remove: () => enableIpl(DiamondCasino.Ipl.Building.ipl, false)
        },
        Main: {
            ipl: 'vw_casino_main',
            //Normal Version: 1110.20, 216.60 -49.45
            //Heist Version: 2490.67, -280.40, -58.71
            Load: () => enableIpl(DiamondCasino.Ipl.Main.ipl, true),
            Remove: () => enableIpl(DiamondCasino.Ipl.Main.ipl, false)
        },
        Garage: {
            ipl: 'vw_casino_garage',
            // Loading Bay Garage: 2536.276, -278.98, -64.722
            // Vault Lobby: 2483.151, -278.58, -70.694
            // Vault: 2516.765, -238.056, -70.737
            Load: () => enableIpl(DiamondCasino.Ipl.Garage.ipl, true),
            Remove: () => enableIpl(DiamondCasino.Ipl.Garage.ipl, false)
        },
        Carpark: {
            ipl: 'vw_casino_carpark',
            // Carpark Garage: 1380.000 200.000 -50.000
            // VIP Carpark Garage: 1295.000 230.000 -50.000
            Load: () => enableIpl(DiamondCasino.Ipl.Carpark.ipl, true),
            Remove: () => enableIpl(DiamondCasino.Ipl.Carpark.ipl, false)
        }
    },

    Load: () => {
        DiamondCasino.Ipl.Building.Load();
        // DiamondCasino.Ipl.Main.Load();
        // DiamondCasino.Ipl.Carpark.Load();
        // DiamondCasino.Ipl.Garage.Load();
    }
};