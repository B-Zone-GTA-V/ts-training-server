class VehicleSpeedo {
    init(): void {
        mp.gui.chat.push("Vehicle Speedo initialized.");
        return;
    }

    getColorBySpeed(speed: number): string {
        if (speed < 30) return '~w~';
        if (speed < 90) return '~g~';
        if (speed < 150) return '~p~';
        if (speed < 180) return '~p~'
        return '~r~';
    }

    renderVehicle = mp.events.add('render', () => { 
        const currentVehicle = mp.players.local.vehicle;

        if (currentVehicle) {
            const speed = currentVehicle.getSpeed();
            const vehicleSpeed = speed < 64 ? speed * (speed / 20) * 2 : speed * 6;

            const finalSpeed = Math.floor(vehicleSpeed);
            const color = this.getColorBySpeed(finalSpeed);
            const speedoInfo = `${color}${finalSpeed}~w~ km h`;
            mp.game.graphics.drawText(speedoInfo, [0.77, 0.77], { 
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.9, 0.9],
                outline: true,
            });
        }
    });
}

const vehicleSpeedo = new VehicleSpeedo();
export { vehicleSpeedo };