// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: "app",
    paths: {
        "lib": "../lib",
        "jquery": "../lib/jquery"
    },
    waitSeconds: 15
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['structures/game', 'structures/match', 'structures/settings'], function (Game, Match) {
    CurrentGame = Game.new(this);
    //console.log("foi");
    CurrentGame.init();
    CurrentGame.match = Match.new();
    CurrentGame.match.start();
    CurrentGame.playMatch();
});