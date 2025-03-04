import { SHARED_CONSTANTS } from '@shared/constants';
import { chatModule } from './chat';
import { weaponsUtils } from './weapons';
import { globalRender } from './render';
import { teleporter } from './teleporter';
import { cayoUtils } from './cayo';
import { debugLabel } from './debug_labels';
import { snow } from './snow';
import { interiors } from './interiors';
import { vehicleSpeedo } from './speedo';
import { externalPackages } from './external/index';

mp.events.add('playerReady', () => {
	mp.console.logInfo(`${mp.players.local.name} is ready!`);
	mp.console.logInfo(SHARED_CONSTANTS.HELLO_WORLD);

	mp.players.local.customProperty = 1;
	mp.console.logInfo(`customProperty: ${mp.players.local.customProperty}`);

	mp.players.local.customMethod = () => {
		mp.console.logInfo(`customMethod called.`);
	};

	mp.players.local.customMethod();

	initializeClient();
});

function initializeClient(): void {
	chatModule.init();
	weaponsUtils.init();
	globalRender.init();
	teleporter.init();
	cayoUtils.init();
	debugLabel.init();
	snow.init();
	interiors.init();
	vehicleSpeedo.init();
	externalPackages.init();

	mp.gui.chat.push(`Client initialized.`);
	mp.gui.chat.push(`_______________________`);
	mp.gui.chat.push(`Welcome to Mapping B-Zone V. Use /help for commands.`);
	mp.gui.chat.push(`Don't forget to change the PORT (from 12345 to 22005) before you connect to the OFFICIAL Server!`);
	mp.gui.chat.push(`_______________________`);
}

function drawHud(): void {
	mp.game.graphics.drawText(`Mapping B-Zone V`, [0.5, 0.005], { 
		font: 4, 
		color: [255, 255, 255, 185], 
		scale: [0.5, 0.5], 
		outline: true
	});
	const player = mp.players.local;
	const statusInfo = `${player.name} (H: ${player.getHealth()}, A: ${player.getArmour()})`;
	mp.game.graphics.drawText(statusInfo, [0.91, 0.91], { 
		font: 4, 
		color: [255, 255, 255, 185], 
		scale: [0.5, 0.5], 
		outline: true,
	});

	const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTimestamp = `${day}/${month}/${year}~n~${hour}:${minute}:${seconds}`;

	mp.game.graphics.drawText(currentTimestamp, [0.940, 0.050], {
		font: 7,
		color: [115, 186, 131, 255],
		scale: [0.5, 0.5],
	});
}

// NO CLIP
let bindVirtualKeys = {
	F2: 0x71
};
let bindASCIIKeys = {
	Q: 69,
	E: 81,
	LCtrl: 17,
	Shift: 16
};

let isNoClip = false;
let shiftModifier = false;
let controlModifier = false;
let localPlayer = mp.players.local;
let noclipEntity: VehicleMp | PlayerMp = localPlayer;

mp.keys.bind(bindVirtualKeys.F2, true, function() {
	isNoClip = !isNoClip;

	if (localPlayer.vehicle) {
		noclipEntity = localPlayer.vehicle;
	} else {
		noclipEntity = localPlayer;
	}

	if (isNoClip) {	
		noclipEntity.freezePosition(true);
		noclipEntity.setInvincible(true);
		noclipEntity.setCollision(false, false);
		noclipEntity.setAlpha(128);
	} else {
		noclipEntity.freezePosition(false);
		noclipEntity.setInvincible(false);
		noclipEntity.setCollision(true, true);
		noclipEntity.setAlpha(255);
	}
});


mp.keys.bind(9, true, function() {
	let veh = mp.players.local.vehicle;
	if (veh) {
		if (veh.getPedInSeat(-1) === mp.players.local.handle) {
			veh.setEngineOn(!veh.getIsEngineRunning(), true, true);
			mp.gui.chat.push(`Engine: ${veh.getIsEngineRunning() ? 'ON' : 'OFF'}`);
		}
	}
});

let config = {
    controls: {
        openKey: 288, // [[F2]]
        goUp: 86, // [[E]]
        goDown: 85, // [[Q]]
        turnLeft: 34, // [[A]]
        turnRight: 35, // [[D]]
        goForward: 32,  // [[W]]
        goBackward: 33, // [[S]]
        changeSpeed: 21, // [[L-Shift]]
    },

    offsets: {
        y: 0.5, // [[How much distance you move forward and backward while the respective button is pressed]]
        z: 0.2, // [[How much distance you move upward and downward while the respective button is pressed]]
    },
}

mp.events.add('render', function() {
	drawHud();
	mp.game.vehicle.defaultEngineBehaviour = false;
	mp.players.local.setConfigFlag(429, true); //ENGINE TURN ON FLAG
	mp.players.local.setConfigFlag(241, true); //ENGINE TURN OFF FLAG
	
	if (!isNoClip || mp.gui.cursor.visible) {
		return;
	}
	controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
	shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
	let yoff = 0.0
	let xoff = 0.0
	let zoff = 0.0

	let currentSpeed = 1.5;
	let fastMult = 1;
	let slowMult = 1;
	if (shiftModifier) {
		fastMult = 2;
	} else if (controlModifier) {
		slowMult = 0.05;
	}
	currentSpeed *= fastMult * slowMult;

	const camHeading = mp.game.cam.getGameplayCamRot(2); 
	noclipEntity.setHeading(camHeading.z);

	mp.game.controls.disableControlAction(0, 32, true);
	mp.game.controls.disableControlAction(0, 33, true);
	mp.game.controls.disableControlAction(0, 34, true);
	mp.game.controls.disableControlAction(0, 35, true);
	mp.game.controls.disableControlAction(0, 86, true);
	mp.game.controls.disableControlAction(0, 85, true);

	if (mp.game.controls.isDisabledControlPressed(0, config.controls.goForward)) {
		yoff = config.offsets.y;
	}
	
	if (mp.game.controls.isDisabledControlPressed(0, config.controls.goBackward)) {
		yoff = -1 * config.offsets.y;
	}

	if (mp.game.controls.isDisabledControlPressed(0, config.controls.turnLeft)) {
		xoff = -1 * config.offsets.y;
	}
	
	if (mp.game.controls.isDisabledControlPressed(0, config.controls.turnRight)) {
		xoff = config.offsets.y;
	}
	
	if (mp.game.controls.isDisabledControlPressed(0, config.controls.goUp)) {
		zoff = config.offsets.z;
	}
	
	if (mp.game.controls.isDisabledControlPressed(0, config.controls.goDown)) {
		zoff = -config.offsets.z;
	}

	let newPos = noclipEntity.getOffsetFromInWorldCoords(xoff * (currentSpeed + 0.3), yoff * (currentSpeed + 0.3), zoff * (currentSpeed + 0.3));
	let heading = noclipEntity.getHeading();
	noclipEntity.setVelocity(0.0, 0.0, 0.0);
	noclipEntity.setRotation(0.0, 0.0, 0.0, 0, false);
	noclipEntity.setHeading(heading);
	noclipEntity.setCoordsNoOffset(newPos.x, newPos.y, newPos.z, isNoClip, isNoClip, isNoClip);
});