// @ts-nocheck
import * as server from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import * as admin from "@minecraft/server-admin";

function showForm(player) {
    let objective = server.world.scoreboard.getObjective("t6servertime");
    let score = objective(player)
    if (score <= 0) {
        const form = new ui.ModalFormData();
        form.title("サーバーに転送する");
        form.textField("サーバーIDを入力してください", "例: play.example.com");
        form.textField("ポート番号を入力してください", "例: 19132");

        form.show(player).then((response) => {
            if (response.canceled) {
                player.sendMessage("§cキャンセルしました。");
                return;
            }

            server.syetem.run(() => {
                const form2 = new ui.ModalFormData();
                form2.title("プレイヤーを選択してください");
                form2.body("サーバーID" + response.formValues[0] + "\nポート番号" + response.formValues[1] + "\nに転送するプレイヤーを選んでください。");
                let players = server.world.getAllPlayers()
                for (let i = 0; i <= players.length; i++) {
                    form2.toggle(gpl())
                }

                form2.show(player).then((response2) => {
                    if (response2.canceled) {
                        player.sendMessage("§cキャンセルされました");
                        return;
                    }

                    serversystem.run(() => {
                        const form3 = new ui.ActionFormData();
                        form3.title("最終確認");
                        form.body("サーバーID" + response.formValues[0] + "\nポート番号" + response.formValues[1] + "/n/n選択したプレイヤー" + glp2())
                        form3.button("はい");
                        form3.button("いいえ");

                        form3.show(player).then((response3) => {
                            if (response3.canceled || response3.selection === 1) {
                                player.sendMessage("§cキャンセルされました");
                                return;
                            }
                            if (response3.selection === 0) {
                                serverwith(player);
                                objective.setScore(player, 600);
                                player.sendMessage("送信されました");
                                return;
                            }
                        })
                    })
                })
            })
        })
    } else {
        player.sendMessage("§c[error] クールダウン中です。あと" + score + "秒待ってください")
    }
}

function gpl() {
    let player_list = [];
    for (const player of server.world.getAllPlayers()) {
        player_list.push(player.name);
    }
    return player_list;
}

function glp2() {
    let player_list2 = []
    for (let i = 0; i <= plyers.length; i++) {
        if (response2.formValues[i] = true) {
            player_list2.push(players[i].name)
        }
    }
    return player_list2;
}

function serverwith(player) {
    for (let i = 0; i <= plyer_list2.length; i++) {
        let sendPlayer = player_list2[i];
        sendplayer.sendMessage(player + "からのリクエストです")
        const form4 = new ui.ActionFormData();
        form4.title(player + "からリクエスト");
        form4.body("サーバーID" + response.formValues[0] + "\nポート番号" + response.formValues[1] + "\nに転送しますか？");
        form4.button("はい");
        form4.button("いいえ");

        form4.show(sendPlayer).then((response4) => {
            if (response4.canceled || response4.selection === 1) {
                sendPlayer.sendMessage("§cキャンセルしました");
            }
            if (response4.selection === 0) {
                sendPlayer.sendMessage("サーバーに接続しています...");
                try {
                    admin.transferPlayer(sendPlayer, { hostname: response.formValues[0], port: parseInt(response.formValues[1]) });
                    return;
                } catch (e) {
                    sendPlayer.sendMessage("§c[error] 転送に失敗しました。");
                    return;
                }
            }
        })
    }
}

server.system.beforeEvents.startup.subscribe(ev => {
    ev.customCommandRegistry.registerCommand({
        name: "t6:serverwith",
        description: "リスト以外のサーバーに他プレイヤーを転送します。",
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