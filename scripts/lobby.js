import * as server from "@minecraft/server";
// もし world を単体で使う場合は、以下のようにインポートに含めるか server.world を使います
const world = server.world;

server.system.beforeEvents.startup.subscribe(ev => {
    ev.customCommandRegistry.registerCommand({
        name: "t6:lobby",
        description: "初期位置にTPできます。",
        permissionLevel: server.CommandPermissionLevel.Any,
        mandatoryParameters: [],
        optionalParameters: []
    }, (origin, arg) => {
        server.system.run(() => {
            const player = origin.sourceEntity;
            if (!player) return;

            // プレイヤーのteleportメソッドを正しく呼び出す
            player.teleport(
                { x: 0, y: -50, z: 0 },
                { dimension: world.getDimension("overworld") }
            );
        });
    });
});