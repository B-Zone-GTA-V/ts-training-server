class GlobalRender {
    init(): void {
        setInterval(() => {
            this.disableAmbientSounds();
        }, 120000);
        mp.gui.chat.push("Global Render initialized.");
        return;
    }

    hidePlayerHealthAndArmour() {
        mp.game.graphics.pushScaleformMovieFunction(1, 'SETUP_HEALTH_ARMOUR');
        mp.game.graphics.pushScaleformMovieFunctionParameterInt(3);
        mp.game.graphics.popScaleformMovieFunctionVoid();
    }

    customPauseMenu(): void {
        if (!mp.game.ui.isPauseMenuActive()) return;
        const firstLineText = `Mapper`; // 'First line'
        const secondLineText = `${mp.players.local.name}`; // 'Second line'
        const thirdLineText = 'Mapping B-Zone V'; // 'Third line'

        mp.game.graphics.beginScaleformMovieMethodOnFrontend('SET_HEADING_DETAILS');
        mp.game.graphics.scaleformMovieMethodAddParamTextureNameString(firstLineText);
        mp.game.graphics.scaleformMovieMethodAddParamTextureNameString(secondLineText);
        mp.game.graphics.scaleformMovieMethodAddParamTextureNameString(thirdLineText);
        mp.game.graphics.scaleformMovieMethodAddParamBool(false);
        mp.game.graphics.endScaleformMovieMethod();
    }

    hidePartOfHud(): void {
        mp.game.ui.hideHudComponentThisFrame(2); // Ammo right corner
        mp.game.ui.hideHudComponentThisFrame(3); // Hud Cash
        mp.game.ui.hideHudComponentThisFrame(4); // Hud Bank Cash
        mp.game.ui.hideHudComponentThisFrame(6); // Vehicle Name (On Enter)
        mp.game.ui.hideHudComponentThisFrame(7); // Area Name
        mp.game.ui.hideHudComponentThisFrame(9); // Street Name
        mp.game.ui.hideHudComponentThisFrame(16); // Radio Station
        mp.game.ui.hideHudComponentThisFrame(20); // Weapon Status
    }

    disableStealthMode(): void {
        mp.players.local.setStealthMovement(false, 'DEFAULT_ACTION');
    }

    disableAmbientSounds() {
        mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", false, true);
        mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", true, true);
    
        mp.game.audio.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", false);
        mp.game.audio.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", false);
        mp.game.audio.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", false);
        mp.game.audio.setAmbientZoneState("", false, false);
    
        mp.game.audio.setAudioFlag("DisableFlightMusic", true);
        mp.game.audio.setAudioFlag("PoliceScannerDisabled", true);
        mp.game.audio.setFlag("LoadMPData", true);
        mp.game.audio.setFlag("DisableFlightMusic", true);
    
        mp.game.water.setDeepOceanScaler(0.0);
        mp.game.misc.setRandomEventFlag(false);
    
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_BIKE_OFF_ROAD_RACE", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_BUSINESSMEN", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_EMPTY", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_MECHANIC", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_BIG", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_SMALL", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_POLICE_BIKE", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_POLICE_CAR", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_POLICE_NEXT_TO_CAR", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_SALTON_DIRT_BIKE", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_SALTON", false);
        mp.game.task.setScenarioTypeEnabled("WORLD_VEHICLE_STREETRACE", false);
    
        mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_01_STAGE", false);
        mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM", false);
        mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM", false);
        mp.game.audio.setStaticEmitterEnabled("se_dlc_aw_arena_construction_01", false);
        mp.game.audio.setStaticEmitterEnabled("se_dlc_aw_arena_crowd_background_main", false);
        mp.game.audio.setStaticEmitterEnabled("se_dlc_aw_arena_crowd_exterior_lobby", false);
        mp.game.audio.setStaticEmitterEnabled("se_dlc_aw_arena_crowd_interior_lobby", false);
    
        mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
        mp.game.audio.startAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
        mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
    }

    render = mp.events.add('render', () => {
        const player = mp.players.local;

        player.setHelmet(false);

        if (player.vehicle) {
            mp.game.audio.setRadioToStationName('OFF');
        }

        this.hidePlayerHealthAndArmour();

        this.customPauseMenu();

        this.hidePartOfHud();

        this.disableStealthMode();
    });
}

const globalRender = new GlobalRender();
export { globalRender };