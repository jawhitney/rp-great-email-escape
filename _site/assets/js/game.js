var rpApp = rpApp || {};
var rpGame = rpGame || {};

rpGame.resizeGameWrapper = function() {
    rpGame.window.setTimeout(function() {
        if (rpGame.isMobileDevice) {
            if (rpGame.window.innerWidth > rpGame.window.innerHeight) {
                rpGame.gameHeight = rpGame.window.innerHeight;
                rpGame.gameWidth = 16 * rpGame.gameHeight / 9;
            } else {
                rpGame.gameWidth = rpGame.window.innerWidth;
                rpGame.gameHeight = 9 * rpGame.gameWidth / 16;
            }

            document.getElementById('rpGameWrapper').style.width = rpGame.gameWidth + 'px';
            document.getElementById('rpGameWrapper').style.height = rpGame.gameHeight + 'px';
            document.getElementById('rpGameWrapper').style.margin = '0 auto';
        }
    }, 200);
};

rpGame.launchGame = function () {
    document.getElementById('rpGame').classList.add('active');

    rpGame.started = false;
    rpGame.over = false;
    rpGame.questionActive = false;
    rpGame.isAudioMuted = false;
    rpGame.complete = false;
    rpGame.scenes = ['Intro', 'Level', 'Countdown', 'Clock', 'Calendar', 'Portrait', 'Crown', 'Computer', 'Inbox', 'Chart', 'Fish', 'List', 'Laptop', 'Outro'];

    rpGame.phaserConfig = {
        resolution: 1,
        parent: 'rpGame',
        width: 1600,
        height: 900,
        backgroundColor: '#000000',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
            },
        },
        input: {
            gamepad: true
        },
        scene: [],
    };

    rpGame.scenes.forEach(function (scene) {
        rpGame.phaserConfig.scene.push(rpGame[scene]);
    });

    rpGame.resizeGameWrapper();

    rpGame.game = new Phaser.Game(rpGame.phaserConfig);
};

(function() {
    rpGame.window = window;

    document.addEventListener('DOMContentLoaded', function(e) {
        var resizeTimeout,
            images = [],
            mp3 = [],
            ogg = [];

        if (rpApp.hasOwnProperty('preloadAssests')) {
            rpApp.preloadAssests.images.forEach(function(image, i) {
                images[i] = new Image();
                images[i].src = rpApp.assetsPath + image;
            });

            if (!rpGame.isMobileDevice) {
                rpApp.preloadAssests.mp3.forEach(function(audio, a) {
                    mp3[a] = new Audio();
                    mp3[a].src = rpApp.assetsPath + audio;
                });

                rpApp.preloadAssests.ogg.forEach(function(audio, a) {
                    ogg[a] = new Audio();
                    ogg[a].src = rpApp.assetsPath + audio;
                });
            }
        }

        rpGame.window.addEventListener('resize', function(e) {
            if (resizeTimeout) {
                rpGame.window.cancelAnimationFrame(resizeTimeout);
            }

            resizeTimeout = rpGame.window.requestAnimationFrame(function () {
                rpGame.resizeGameWrapper();
            });
        });

        document.getElementById('rpGameLaunch').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('rpGameModal').classList.add('active');
            rpGame.launchGame();
        });
    });
})();
