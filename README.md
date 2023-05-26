[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

# 0xTowerGame-tutorial

<p align="center">
  <img src="https://github.com/Cerebellum-Network/0xTowerGame-tutorial/blob/master/assets/main-loading.gif?raw=true" width="180"></img>
</p>

Open Source remake of an old mobile classic, 0xTowerGame!

The most up2date version of the [0xTowerGame Tutorial](https://www.notion.so/cere/34df8a8699344d4e9192b1572858dbb1) can be found on the [Cere Community Portal](https://portal.cere.network).

## Installing the SDK

In the case you would like to use the bleeding edge version of the SDK, you can clone the Cere Games SDK repo from Github and install using NPM.

```
$> git clone https://github.com/cere-io/cere-games-sdk.git
$> npm install --save
```

Alternatively, you can save & install the latest [@cere/games-sdk package](https://www.npmjs.com/package/@cere/games-sdk) NPM package directly.

```
$> npm install --save @cere/games-sdk
```

To proceed, we must decide on a useful name for your new game variant that is unique within your wallet. 
This step is critical in order for the game to launch later, so just make sure to pay attention.
For our example, we are going to use the name `0xTowerGame`, as mentioned.

## Start Integrating

Assuming you already have a Game ID / Game Code / “unique game name” in order to integrate Cere Games SDK into your game, then all that’s remaining are the next few simple steps:

1. Install the Cere Games SDK.
2. Initialize the Cere Games SDK.
3. Launch the pre-loader modal while game assets are loading.
4. Save player scores.
5. Load the Leaderboard.

### Install the SDK

The Cere Games SDK will be installed as a dependency later when we start up 0xTowerGame demo in the next step. 
In the case you would like to use the bleeding edge version of the SDK, you can clone the [Cere Games SDK](https://github.com/cere-io/cere-games-sdk) repo from Github and install using NPM. You could also install the latest [@cere/games-sdk package](https://www.npmjs.com/package/@cere/games-sdk) NPM package directly with `npm install @cere/games-sdk`.

### Clone the upstream TowerGame repo

To deploy your own version of the TowerGame demo, you can clone a pre-configured version of 0xTowerGame repository we created for this tutorial by running the following command.

```
$> git clone https://github.com/Cerebellum-Network/0xTowerGame-tutorial.git 0xTowerGame
```

Once we have the game repo, let's run the demo 0xTowerGame. It should work out-of-the-box, as expected.

```
$> cd 0xTowerGame
$> npm install
$> npm start
```

<aside>
💡 Kill the browser tab that opens and the running npm server process with `ctrl-c`.
</aside>

Amazing! Easy as that. Now that we have the code and seem the game in action, let’s look under the hood and better understand what’s going on in the code.

### Initialize the Cere Games SDK

First things that we notice in comparison to the original version of the open source game we forked we started building from off github is that we added a new file [games-sdk.js](https://github.com/Cerebellum-Network/0xTowerGame-tutorial/blob/master/games-sdk.js). This file is used to create and initialize the Cere Games SDK. This can be done, for example, on page load.

Loading the [games-sdk.js](https://github.com/Cerebellum-Network/0xTowerGame-tutorial/blob/master/games-sdk.js) file, found in the root directory of the [0xTowergame repository](https://github.com/Cerebellum-Network/0xTowerGame-tutorial). The next section will be about this file. You can follow along while we review a few simple instructions for how to get this integration working inside.

The first things are first, import the @cere/games-sdk npm package, which will then be initialized  with parameters according to each game’s needs. For a full list of accepted parameters, see the [cere-games-sdk](https://github.com/cere-io/cere-games-sdk/tree/master/packages/sdk) package repository on github.

```
const { GamesSDK } = require("@cere/games-sdk");

window.CereGamesSdk = new GamesSDK({
  gameId: '0xTowerGame',

  gameInfo: {
    name: '0xTowerGame',
    tags: ['towergame', 'web3', 'gamer'],
    url: window.location.href,
    logoUrl: "http://..."
  },

	//...
//...
```

In addition to the basics, we need to define how we’ll react to events once the SDK is initialized. For example, in our case, we just run the Cere Games pre-loader modal to display the custom start screen that we set-up before in this tutorial (COMING SOON!).

```
//...
  onReady: (sdk) => {
    window.gamesSdkPreloader = sdk.showPreloader({
      onStart:() => {
        document.getElementById('start')?.click();
      }
    });
  },
//...
```

Once the SDK is configured, we just initialize the SDK, and we’re just about ready to go.

```
window.CereGamesSdk.init();
```

### Launch the Pre-loader Modal

Inside the game logic, after the SDK is initialized and game assets are loaded, for example, we call the `gamesSdkPreloader.setReady()` method to indicate the game is ready to be played to launch the pre-loader modal and let your players start their game.

In 0xTowerGame, we added this to the main [/index.html](https://github.com/Cerebellum-Network/0xTowerGame-tutorial/blob/master/index.html) file as follows.

```
// loading animation
function hideLoading() {
  if (domReady && canvasReady) {
		//...
      window.gamesSdkPreloader.setReady();
    //...
	}
}
```

### Save Scores & Show the Leaderboard

Still inside [/index.html](https://github.com/Cerebellum-Network/0xTowerGame-tutorial/blob/master/index.html), after the game has launched and the player has a new score, we can save the score and immediately show the leaderboard modal `CereGamesSdk.saveScore()` and `CereGamesSdk.showLeaderBoard()` methods provided by the SDK respectively. For example, in 0xTowerGame, a good place for this might be when the player has died:

```
setGameFailed: function (f) {
      //...
	        window.CereGamesSdk.saveScore(score).then(() => {
          window.CereGamesSdk.showLeaderboard({
            onPlayAgain: () => {
              // Restart the game
              window.location.href = window.location.href + '?s=' + (+new Date());
            }
          });
        });
			//...
}
```

Wha-la! That’s it! We’ve managed to take an existing Open Source clone and upgrade it with Cere’s Decentralized Leaderboard score tracking features in just a few lines of code! 🍾 

## Deploy, serverless!

To upload our game to DDC and start seeing the benefits of the Cere Games SDK in action, just follow these 3 easy steps:

1. Prepare an archive of your game assets as a .zip file.
2. Upload the archive to DDC using Freeport.
3. Configure the Game Properties in Freeport.

### Prepare the archive

The folder to be archived should include a single root folder with all the game’s assets and an `index.html` as shown in the following example.

```
[game_name].zip
└── [game_name]/
    ├── ...(game assets)
    └── index.html
```

If you use a bundler like **Webpack, don’t forget to** build the game bundle files.

Remove unnecessary files from the archive to minimize storage use.

Prepare a zip archive of the resulting static assets, and you’ll be ready for to upload your game!

For example, for 0xTowerGame, we’d run:

```
$> npm run build
$> cd ..
$> ls
    0xTowerGame/
$> zip -r 0xtowergame-v1.zip 0xTowerGame/
```

### Upload to DDC

When you have the game’s archive ready, the next step is to upload it to DDC using Freeport.

1. Open [Freeport Creation Suite](https://freeport.cere.network/).
2. Connect your wallet (eg. MetaMask).
3. Enter Game admin panel.
4. Click `Add game`
5. Fill in the game information and drag the game’s archive to the `Upload zip file` area
    ⚠️ You must use the same Game ID or Game Code as used in your SDK config.
6. On the next step you will be asked to sign a message with your wallet and then the game will start uploading
7. After successful upload, you can go back to you game list to see the newly added game.

## Configure your game
### Add a Leaderboard Tournament

Next, let’s set-up Tournaments by selecting `Setup Tournaments` button in the wizard or `Setup Tournament Leaderboard` from the My Games dashboard.

A Leaderboard Tournament is a time-blocked episode where your players will compete in a closed competition, and the final scores and player ranking will be saved to DDC.
1. Give your tournament a title
2. Add a descriptive subtitle
3. Define the start and end dates.
4. Select Create Tournament
5. Sign the transaction

That’s it! You’re tournament is ready.

Once we’re done with the set-up, it’s time to play!

## Launch the Game

Hit the Launch Game to start playing, or copy the link and share it! Congratulations!

### Local Testing

To start a local game server on your machine, you must first have already uploaded the game and configured the Game Properties in Freeport.
The most important thing to consider here is the GameId. Make sure this is correct.
Once this step has been completed, you can now run the following command to start your game locally for further development and testing.

```
$> npm start
```

The server should start and a new browser window should open automatically with your game loading screen as expected. Once the SDK is initialized and game assets loaded, you’ll see the Cere Games pre-loader modal pop-up with the start button as seen in the screenshot below.
You can play the game now as you would expect, and once you have run out of lives, your score will be saved and the leaderboard will be opened as expected!

## Report Issues

If you found an issue, let us know by filing an [Issue in github](https://github.com/Cerebellum-Network/0xTowerGame-tutorial/issues). 
