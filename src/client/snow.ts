class Snow {
    init(): void {
        return;
    }

    enableSnow(): void {
        (mp as Mp & { game1: any }).game1.gameplay.enableSnow = true;
    }

    events = [
        mp.events.add('snow::enable', () => {
            mp.console.logWarning('snow::enable');
            this.enableSnow();
        })
    ];
}

const snow = new Snow();
export { snow };