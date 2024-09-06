import { ClothesComponents, getVehicleHashByName, getWeaponHashByName, PropComponents } from "@shared/constants";
import { clothes } from "./clothes";

class Commands {
    init(): void {
        return;
    }

    weatherConditions: { [key: number]: string } = {
        0: 'EXTRASUNNY',
        1: 'CLEAR',
        2: 'CLOUDS',
        3: 'SMOG',
        4: 'FOGGY',
        5: 'OVERCAST',
        6: 'RAIN',
        7: 'THUNDER',
        8: 'CLEARING',
        9: 'NEUTRAL',
        10: 'SNOW',
        11: 'BLIZZARD',
        12: 'SNOWLIGHT',
        13: 'XMAS',
        14: 'HALLOWEEN'
    };

    commandsList = {
        HELP: 'help',
        GOTO: 'goto',
        GOTOXYZ: 'gotoxyz',
        GOTOWAYPOINT: 'gotowp',
        GETHERE: 'gethere',
        SETHP: 'sethp',
        SETARMOR: 'setarmor',
        MAKEFULL: 'mf',
        GETGUN: 'gg',
        REVIVE: 'revive',
        VEH: 'veh',
        FEMALE: 'female',
        MALE: 'male',
        TOP: 'top',
        UNDERSHIRT: 'undershirt',
        TORSO: 'torso',
        LEGS: 'legs',
        SHOES: 'shoes',
        BAG: 'bag',
        MASK: 'mask',
        HAIRSTYLE: 'hairstyle',
        HAT: 'hat',
        GLASSES: 'glasses',
        EARS: 'ears',
        WATCH: 'watch',
        BRACELET: 'bracelet',
        TATTOO: 'tattoo',
        SETTIME: 'settime',
        SETWEATHER: 'setweather',
        DESPAWN_VEHICLE: 'dv',
        CARCOLOR: 'carcolor',
        SETVW: 'setvw',
        DEBUG_LABELS: 'dl',
        SNOW: 'snow',
        REMOVE_SNOW: 'removesnow',
    }

    findPlayer(usernameOrId: string): PlayerMp | null {
        var isNumber = this.isStringOrNumber(usernameOrId) === 'number';
        // console.log(`isNumber: ${isNumber}`);
        if (isNumber) {
            // console.log(`player number: ${JSON.stringify(mp.players.at(parseInt(usernameOrId)))}`);
            return mp.players.at(parseInt(usernameOrId));
        } else if (typeof usernameOrId === 'string') {
            var target: null | PlayerMp = null;
            mp.players.forEach((p) => {
                if (target == null && p.name.toLowerCase().includes(usernameOrId.toLowerCase())) {
                    // console.log(`player: ${JSON.stringify(p)}`);
                    target = p;
                }
            });
            return target;
        }
        return null;
    }

    goto(player: PlayerMp, target: PlayerMp): void {
        player.position = target.position;
        mp.players.broadcast(`(/goto) ${player.name} Goes to ${target.name}.`);
    }

    gotoXYZ(player: PlayerMp, x: number, y: number, z: number): void {
        player.position = new mp.Vector3(x, y, z);
        mp.players.broadcast(`(/goto) ${player.name} Goes to ${x} ${y} ${z}.`);
    }

    gotoWaypoinnt(player: PlayerMp): void {
        player.call('teleporter::goto-waypoint');
        mp.players.broadcast(`(/goto) ${player.name} Goes to his Waypoint.`);
    }
    
    gethere(player: PlayerMp, target: PlayerMp): void {
        target.position = player.position;
        mp.players.broadcast(`(/gethere) ${player.name} Get ${target.name} to his position.`);
    }

    setHealth(player: PlayerMp, target: PlayerMp, health: number): void {
        target.health = health;
        mp.players.broadcast(`(/sethp) ${player.name} Sets Health ${health} to ${target.name}.`);
    }

    setArmor(player: PlayerMp, target: PlayerMp, armor: number): void {
        target.armour = armor;
        mp.players.broadcast(`(/setarmor) ${player.name} Sets Armor ${armor} to ${target.name}.`);
    }

    makeFull(player: PlayerMp): void {
        player.health = 100;
        player.armour = 100;
        player.notify(`You are now full health and armor.`);
    }

    getGun(player: PlayerMp, weapon: string, ammo: number): void {
        const weaponHash = getWeaponHashByName(weapon);
        if (weaponHash === undefined) {
            player.outputChatBox(`Weapon ${weapon} not found!`);
            return;
        }
        player.giveWeapon(parseInt(weaponHash), ammo);
        mp.players.broadcast(`(/gg) ${player.name} Get ${weapon} with ${ammo} ammo.`);
    }

    revive(player: PlayerMp, target: PlayerMp): void {
        if (target.health > 0) {
            player.outputChatBox(`Player is not dead!`);
            return;
        }
        target.spawn(new mp.Vector3(target.position.x, target.position.y, target.position.z + 1));
        target.health = 100;
        mp.players.broadcast(`(/revive) ${player.name} Revive ${target.name}.`);
    }

    spawnVehicle(player: PlayerMp, name: string): void {
        const vehicleHash = getVehicleHashByName(name);
        if (vehicleHash === undefined) {
            player.outputChatBox(`Vehicle not found!`);
            return;
        }
        const veh = mp.vehicles.new(parseInt(vehicleHash), player.position,
            {
                engine: true,
                color: [
                    [Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1],
                    [Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1]
                ]
            });
        veh.numberPlate = 'TR-BZONE';
        player.putIntoVehicle(veh, 0);
        mp.players.broadcast(`(/veh) ${player.name} Spawned a ${name}.`);
    }

    despawnVehicle(player: PlayerMp, vehicleId: number): void {
        const vehicle = mp.vehicles.at(vehicleId);
        if (!vehicle) {
            player.outputChatBox(`Vehicle not found!`);
            return;
        }
        vehicle.destroy();
        mp.players.broadcast(`(/dv) ${player.name} Despawned a Vehicle.`);
    }

    setCarColor(player: PlayerMp, color1: number, color2: number): void {
        const vehicle = player.vehicle;
        if (!vehicle) {
            player.outputChatBox(`You are not in a vehicle!`);
            return;
        }
        vehicle.setColor(color1, color2);
        mp.players.broadcast(`(/carcolor) ${player.name} Sets Car Color to ${color1} ${color2}.`);
    }

    setTime(player: PlayerMp, time: number): void {
        mp.world.time.hour = time;
        mp.players.broadcast(`(/settime) ${player.name} Sets Time to ${time}.`);
    }
    
    setWeather(player: PlayerMp, weather: number): void {
        const weatherString = this.weatherConditions[weather] || 'UNKNOWN';
        if (weatherString === 'UNKNOWN') {
            player.outputChatBox(`Weather ${weather} not found!`);
            return;
        }
        mp.world.weather = weatherString;
        mp.players.broadcast(`(/setweather) ${player.name} Sets Weather to ${weather}.`);
    }

    setVirtualWorld(player: PlayerMp, vw: number): void {
        player.dimension = vw;
        mp.players.broadcast(`(/setvw) ${player.name} Sets Virtual World to ${vw}.`);
    }

    setSnow(player: PlayerMp): void {
        mp.world.weather = 'XMAS';
        player.call('snow::toggle', [true]);
    }

    removeSnow(player: PlayerMp): void {
        mp.world.weather = 'EXTRASUNNY';
        player.call('snow::toggle', [false]);
    }

    events = [
        // Help
        mp.events.addCommand(this.commandsList.HELP, (player, _fullText) => {
            player.outputChatBox(`Teleport Commands: /goto, /gethere, /gotoxyz, /gotowp F2 - No Clip`);
            player.outputChatBox(`Health & Armor Commands: /sethp, /setarmor, /mf, /revive`);
            player.outputChatBox(`Weather Commands: /settime, /setweather`);
            player.outputChatBox(`Weapon Commands: /gg`);
            player.outputChatBox(`Vehicle Commands: /veh, /dv, /setcolor`);
            player.outputChatBox(`Clothes Commands: /male, /female, /top, /undershirt, /torso, /legs, /shoes, /bag, /mask, /hairstyle, /hat, /glasses, /ears, /watch, /bracelet, /tattoo`);
            player.outputChatBox(`World Commands: /setvw, /snow, /removesnow`);
        }),

        // Teleport
        mp.events.addCommand(this.commandsList.GOTO, (player, id) => {
            if (!id) {
                player.outputChatBox(`Usage: [/goto <Player Name / Player Id>]`);
                return;
            }
            let target = this.findPlayer(id);
            if (!target) {
                player.outputChatBox(`Player not found!`);
                return;
            }
            this.goto(player, target);
        }),

        mp.events.addCommand(this.commandsList.GETHERE, (player, id) => {
            if (!id) {
                player.outputChatBox(`Usage: [/gethere <Player Name / Player Id>]`);
                return;
            }
            let target = this.findPlayer(id);
            if (!target) {
                player.outputChatBox(`Player not found!`);
                return;
            }
            this.gethere(player, target);
        }),

        mp.events.addCommand(this.commandsList.GOTOXYZ, (player, _fullText, x, y, z) => {
            if (!x || !y || !z) {
                player.outputChatBox(`Usage: [/gotoxyz <X> <Y> <Z>]`);
                return;
            }
            this.gotoXYZ(player, parseFloat(x), parseFloat(y), parseFloat(z));
        }),

        mp.events.addCommand(this.commandsList.GOTOWAYPOINT, (player, _fullText) => {
            this.gotoWaypoinnt(player);
        }),

        // Health & Armor
        mp.events.addCommand(this.commandsList.SETHP, (player, _fullText, id, health) => {
            if (!id || !health) {
                player.outputChatBox(`Usage: [/sethp <Player Name / Player Id> <Health>]`);
                return;
            }
            let target = this.findPlayer(id);
            if (!target) {
                player.outputChatBox(`Player not found!`);
                return;
            }
            this.setHealth(player, target, parseInt(health) || 100);
        }),

        mp.events.addCommand(this.commandsList.SETARMOR, (player, _fullText, id, armor) => {
            if (!id || !armor) {
                player.outputChatBox(`Usage: [/setarmor <Player Name / Player Id> <Armor>]`);
                return;
            }
            let target = this.findPlayer(id);
            if (!target) {
                player.outputChatBox(`Player not found!`);
                return;
            }
            this.setArmor(player, target, parseInt(armor));
        }),

        mp.events.addCommand(this.commandsList.MAKEFULL, (player, _fullText) => {
            this.makeFull(player);
        }),

        // Weapons
        mp.events.addCommand(this.commandsList.GETGUN, (player, _fullText, weapon, ammo) => {
            if (!weapon || !ammo) {
                player.outputChatBox(`Usage: [/givegun <Weapon Name> <Ammo>]`);
                return;
            }
            this.getGun(player, weapon, parseInt(ammo) || 100);
        }),

        // Revive
        mp.events.addCommand(this.commandsList.REVIVE, (player, _fullText, id) => {
            if (!id) {
                player.outputChatBox(`Usage: [/revive <Player Name / Player Id>]`);
                return;
            }
            let target = this.findPlayer(id);
            if (!target) {
                player.outputChatBox(`Player not found!`);
                return;
            }
            this.revive(player, target);
        }),
        
        // Vehicles
        mp.events.addCommand(this.commandsList.VEH, (player, _fullText, vehicleName) => {
            if (!vehicleName) {
                player.outputChatBox(`Usage: [/veh <Vehicle Name>]`);
                return;
            }
            this.spawnVehicle(player, vehicleName);
        }),

        mp.events.addCommand(this.commandsList.DESPAWN_VEHICLE, (player, _fullText, vehicleId) => {
            if (!vehicleId) {
                player.outputChatBox(`Usage: [/dv <Vehicle Id>]`);
                return;
            }
            this.despawnVehicle(player, parseInt(vehicleId));
        }),
        
        mp.events.addCommand(this.commandsList.CARCOLOR, (player, _fullText, color1, color2) => {
            if (!color1 || !color2) {
                player.outputChatBox(`Usage: [/carcolor <Color 1> <Color 2>]`);
                return;
            }
            this.setCarColor(player, parseInt(color1), parseInt(color2));
        }),
        
        mp.events.addCommand(this.commandsList.DEBUG_LABELS, (player, _fullText) => {
            player.call('debuglabel::change-state');
        }),

        // Clothes
        mp.events.addCommand(this.commandsList.MALE, (player, _fullText) => {
            player.model = mp.joaat('mp_m_freemode_01');
            clothes.removeClothes(player);
            player.outputChatBox(`You are now ${player.model}.`); 
        }),

        mp.events.addCommand(this.commandsList.FEMALE, (player, _fullText) => {
            player.model = mp.joaat('mp_f_freemode_01');
            clothes.removeClothes(player);
            player.outputChatBox(`You are now ${player.model}.`); 
        }),

        mp.events.addCommand(this.commandsList.TOP, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/top <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.TOP, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.UNDERSHIRT, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/undershirt <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.UNDERSHIRT, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.TORSO, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/torso <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.TORSO, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.LEGS, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/legs <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.LEGS, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.SHOES, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/shoes <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.SHOES, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.BAG, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/bag <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.BAG, parseInt(drawable), parseInt(texture), 2);
        }),
        
        mp.events.addCommand(this.commandsList.MASK, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/mask <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.MASK, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.HAIRSTYLE, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/hairstyle <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setClothes(ClothesComponents.HAIRSTYLE, parseInt(drawable), parseInt(texture), 2);
        }),

        mp.events.addCommand(this.commandsList.HAT, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/hat <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setProp(PropComponents.HAT, parseInt(drawable), parseInt(texture));
        }),

        mp.events.addCommand(this.commandsList.GLASSES, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/glasses <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setProp(PropComponents.GLASSES, parseInt(drawable), parseInt(texture));
        }),

        mp.events.addCommand(this.commandsList.EARS, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/ears <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setProp(PropComponents.EARS, parseInt(drawable), parseInt(texture));
        }),

        mp.events.addCommand(this.commandsList.WATCH, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/watch <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setProp(PropComponents.WATCH, parseInt(drawable), parseInt(texture));
        }),

        mp.events.addCommand(this.commandsList.BRACELET, (player, _fullText, drawable, texture) => {
            if (!drawable || !texture) {
                player.outputChatBox(`Usage: [/bracelet <Drawable Id> <Texture Id>]`);
                return;
            }
            player.setProp(PropComponents.BRACELET, parseInt(drawable), parseInt(texture));
        }),

        mp.events.addCommand(this.commandsList.TATTOO, (player, _fullText, collection, overlay) => {
            if (!collection || !overlay) {
                player.outputChatBox(`Usage: [/tattoo <Collection> <Overlay>]`);
                return;
            }
            player.setDecoration(mp.joaat(collection), parseInt(overlay));
        }),
        
        // Weather
        mp.events.addCommand(this.commandsList.SETTIME, (player, _fullText, time) => {
            if (!time) {
                player.outputChatBox(`Usage: [/settime <Time (0-24)>]`);
                return;
            }
            this.setTime(player, parseInt(time));
        }),

        mp.events.addCommand(this.commandsList.SETWEATHER, (player, _fullText, weather) => {
            if (!weather) {
                player.outputChatBox(`Usage: [/settime <Weather (0-14)>]`);
                return;
            }
            this.setWeather(player, parseInt(weather));
        }),

        // World
        mp.events.addCommand(this.commandsList.SETVW, (player, _fullText, vw) => {
            if (!vw) {
                player.outputChatBox(`Usage: [/setvw <Virtual Id>]`);
                return;
            }
            this.setVirtualWorld(player, parseInt(vw));
        }),

        mp.events.addCommand(this.commandsList.SNOW, (player, _fullText) => {
            this.setSnow(player);
        }),

        mp.events.addCommand(this.commandsList.REMOVE_SNOW, (player, _fullText) => {
            this.removeSnow(player);
        }),

        mp.events.add("playerCommand", (player, command) => {
            player.outputChatBox(`${command} is not a valid command. Use /help for a list of commands.`);
        }),
    ];

    // Utils
    isStringOrNumber(value: any): "string" | "number" | null {
        if (typeof value === "string") {
          if (!isNaN(Number(value)))  return "number";
          return "string";
        } else if (typeof value === "number") return "number";
        else return null;
    }
}

const commands = new Commands();
export { commands };