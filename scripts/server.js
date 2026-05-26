import * as server from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import * as admin from "@minecraft/server-admin";

function showForm(player) {
    const form = new ui.ModalFormData();
    form.title("サーバーに行く");
    form.textField("サーバーIDを入力してください", "例: play.example.com");
    form.textField("ポート番号を入力してください", "例: 19132");

    form.show(player).then((response) => {
        if (response.canceled) {
            player.sendMessage("§cキャンセルしました。");
            return;
        }

        server.system.run(() => {
            const form2 = new ui.ActionFormData();
            form2.title("最終確認");
            form2.body("サーバーID : " + response.formValues[0] + "\nポート番号 : " + response.formValues[1] + "\nに移動しますか？");
            form2.button("はい");
            form2.button("いいえ");

            form2.show(player).then((response2) => {
                if (response2.canceled || response2.selection === 1) {
                    player.sendMessage("§cキャンセルされました。");
                    return;
                }

                if (response2.selection === 0) {
                    player.sendMessage("サーバーに接続しています...");
                    try {
                        admin.transferPlayer(player, { hostname: response.formValues[0], port: parseInt(response.formValues[1]) });
                    } catch (e) {
                        player.sendMessage("§c[error] 転送に失敗しました。");
                    }
                }
            });
        });
    }).catch((error) => {
        player.sendMessage("§c[error] エラーが発生しました: " + error.message);
    });
}

server.system.beforeEvents.startup.subscribe(ev => {
    ev.customCommandRegistry.registerCommand({
        name: "t6:server",
        description: "リスト以外のサーバーに行けます。",
        permissionLevel: server.CommandPermissionLevel.Any,
        mandatoryParameters: [],
        optionalParameters: []
    }, (origin, arg) => {
        server.system.run(() => {
            if (!origin.sourceEntity) return;
            showForm(origin.sourceEntity);
        });
    });
});