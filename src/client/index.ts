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
import './external/index';

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

	mp.gui.chat.push(`Client initialized.`);
	mp.gui.chat.push(`_______________________`);
	mp.gui.chat.push(`Welcome to Training B-Zone V. Use /help for commands.`);
	mp.gui.chat.push(`Don't forget to change the PORT (from 12345 to 22005) before you connect to the OFFICIAL Server!`);
	mp.gui.chat.push(`_______________________`);
}

function drawHud(): void {
	mp.game.graphics.drawText(`Training B-Zone V`, [0.5, 0.005], { 
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
let getNormalizedVector = function(vector: any) {
	let mag = Math.sqrt(
		vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
	);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
};
let getCrossProduct = function(v1: any, v2: any) {
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
};
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
let noClipCamera : any;
let shiftModifier = false;
let controlModifier = false;
let localPlayer = mp.players.local;

mp.keys.bind(bindVirtualKeys.F2, true, function() {
	isNoClip = !isNoClip;
	if (isNoClip) startNoClip();
	else stopNoClip();
});

function startNoClip() {
	let camPos = new mp.Vector3(
		localPlayer.position.x,
		localPlayer.position.y,
		localPlayer.position.z
	);
	let camRot = mp.game.cam.getGameplayCamRot(2);
	noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
	noClipCamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false, 0);
	localPlayer.freezePosition(true);
	localPlayer.setInvincible(true);
}
function stopNoClip() {
	if (noClipCamera) {
		localPlayer.position = noClipCamera.getCoord();
		localPlayer.setHeading(noClipCamera.getRot(2).z);
		noClipCamera.destroy(true);
		noClipCamera = null;
	}
	mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
	localPlayer.freezePosition(false);
	localPlayer.setInvincible(false);
}
mp.events.add('render', function() {
	drawHud();
	
	if (!noClipCamera || mp.gui.cursor.visible) {
		return;
	}
	controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
	shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
	let rot = noClipCamera.getRot(2);
	let fastMult = 1;
	let slowMult = 1;
	if (shiftModifier) {
		fastMult = 3;
	} else if (controlModifier) {
		slowMult = 0.5;
	}
	let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
	let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
	let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
	let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
	let pos = noClipCamera.getCoord();
	let rr = noClipCamera.getDirection();
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = rr.x * leftAxisY * fastMult * slowMult;
	vector.y = rr.y * leftAxisY * fastMult * slowMult;
	vector.z = rr.z * leftAxisY * fastMult * slowMult;
	let upVector = new mp.Vector3(0, 0, 1);
	let rightVector = getCrossProduct(
		getNormalizedVector(rr),
		getNormalizedVector(upVector)
	);
	rightVector.x *= leftAxisX * 0.5;
	rightVector.y *= leftAxisX * 0.5;
	rightVector.z *= leftAxisX * 0.5;
	let upMovement = 0.0;
	if (mp.keys.isDown(bindASCIIKeys.Q)) {
		upMovement = 0.5;
	}
	let downMovement = 0.0;
	if (mp.keys.isDown(bindASCIIKeys.E)) {
		downMovement = 0.5;
	}
	mp.players.local.position = new mp.Vector3(
		pos.x + vector.x + 1,
		pos.y + vector.y + 1,
		pos.z + vector.z + 1
	);
	mp.players.local.heading = rr.z;
	noClipCamera.setCoord(
		pos.x - vector.x + rightVector.x,
		pos.y - vector.y + rightVector.y,
		pos.z - vector.z + rightVector.z + upMovement - downMovement
	);
	noClipCamera.setRot(
		rot.x + rightAxisY * -5.0,
		0.0,
		rot.z + rightAxisX * -5.0,
		2
	);
});