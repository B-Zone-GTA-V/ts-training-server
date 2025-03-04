export function enableIpl(ipl: string | Array<string>, activate: boolean) {
    if (typeof ipl !== 'string') 
        for (const value of ipl) {
            enableIpl(value, activate);
        }
    else {
        if (activate) {
            if (!mp.game.streaming.isIplActive(ipl))
                mp.game.streaming.requestIpl(ipl);
        } else {
            if (mp.game.streaming.isIplActive(ipl))
                mp.game.streaming.removeIpl(ipl);
        }
    }
}