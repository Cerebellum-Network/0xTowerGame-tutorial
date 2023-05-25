const { GamesSDK } = require("@cere/games-sdk");

window.CereGamesSdk = new GamesSDK({
  env: 'dev',
  gameId: '0xTowerGame',

  gameInfo: {
    name: 'Tower Game',
    tags: ['towergame', 'web3', 'gamer'],
    url: window.location.href,
  },

  onReady: (sdk) => {
    window.gamesSdkPreloader = sdk.showPreloader({
      onStart:() => {
        document.getElementById('start')?.click();
      }
    });
  },

  onWalletDisconnect: () => {
    window.location.reload()
  },
});

window.CereGamesSdk.init();
