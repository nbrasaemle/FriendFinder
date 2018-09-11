//gets data
var friendData = require('../data/friends.js');
var path = require('path');


// ROUTING
module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendData);
    });

    app.get("/api/friends/:friend", function (req, res) {
        var chosen = req.params.friend;

        console.log(chosen);

        for (var i = 0; i < friendData.length; i++) {
            if (chosen === friendData[i].name) {
                return res.json(friendData[i]);
            }
        }

        return res.json(false);
    });


    app.post('/api/friends', function (req, res) {
        var compareFriend = req.body;

        var bestMatch = {};

        for (var i = 0; i < compareFriend.scores.length; i++) {
            if (compareFriend.scores[i] == "1 (Strongly Disagree)") {
                compareFriend.scores[i] = 1;
            } else if (compareFriend.scores[i] == "5 (Strongly Agree)") {
                compareFriend.scores[i] = 5;
            } else {
                compareFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }

        var bestMatchIndex = 0;
        var bestMatchDifference = 40;

        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;

            for (var index = 0; index < friendData[i].scores.length; index++) {
                var differenceScore = Math.abs(friendData[i].scores[index] - compareFriend.scores[index]);
                totalDifference += differenceScore;
            }


            if (totalDifference < bestMatchDifference) {
                bestMatchIndex = i;
                bestMatchDifference = totalDifference;
            }
        }

        bestMatch = friendData[bestMatchIndex];

        friendData.push(compareFriend);

        res.json(bestMatch);
    });
    

}