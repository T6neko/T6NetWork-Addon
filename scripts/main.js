import { system, world } from "@minecraft/server";

import "./server";

import "./lobby";

import "./serverwith"

world.afterEvents.worldLoad.subscribe(() => {
    world.sendMessage("T6NetWorkが読み込まれました！");
});

world.afterEvents.playerSpawn.subscribe(ev => {
    const { player, initialSpawn } = ev;

    if (!initialSpawn) return;

    player.sendMessage({
        rawtext: [
            { text: "T6NetWork Addonsが読み込まれました!\n" },
            { text: "詳しくはhttps://discord.gg/792jn4dpsNへ!" }
        ]
    });
});