function accuracy(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalGoalsAttempted = 0;
	var totalGoalsAttemptedOnTarget = 0;
	for (var t = 0; t < matches.length; t++) {
		totalGoalsAttempted += matches[t].goalsAttempted;
		totalGoalsAttemptedOnTarget += matches[t].goalsAttemptedOnTarget;
	};
	var totalAccuracy = totalGoalsAttemptedOnTarget/totalGoalsAttempted;
	return totalAccuracy;
}

function delivery(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalGoalsScored = 0;
	var totalGoalsAttemptedOnTarget = 0;
	for (var j = 0; j < matches.length; j++) {
		totalGoalsScored += matches[j].goalsScored;
		totalGoalsAttemptedOnTarget += matches[j].goalsAttemptedOnTarget;
	};
	var totalDelivery = totalGoalsScored/totalGoalsAttemptedOnTarget;
	return totalDelivery;
}

function defense(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalOpponentAttempts = 0;
	var totalOpponentAttemptsOnTarget = 0;
	for (var k = 0; k < matches.length; k++) {
		totalOpponentAttempts += matches[k].shotsAttempted;
		totalOpponentAttemptsOnTarget += matches[k].shotsAttemptedOnTarget;
	};
	var totalDefense = 1 - totalOpponentAttemptsOnTarget/totalOpponentAttempts;
	return totalDefense;
}

function goalie(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalOpponentGoals = 0;
	var totalOpponentAttemptsOnTarget = 0;
	for (var m = 0; m < matches.length; m++) {
		totalOpponentGoals += matches[m].shotsAllowed;
		totalOpponentAttemptsOnTarget += matches[m].shotsAttemptedOnTarget
	};
	var totalGoalie = 1 - totalOpponentGoals/totalOpponentAttemptsOnTarget;
	return totalGoalie;
}

function possession(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalPossession = 0;
	for (var n = 0; n < matches.length; n++) {
		totalPossession += matches[n].possession;
	};
	var totalPoss = totalPossession/(n+1);
	return totalPoss;
}

function offensivePossession(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalPossession = 0;
	for (var n = 0; n < matches.length; n++) {
		totalPossession += matches[n].possession;
	};
	return totalPossession;
}

function defensivePossession(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalPossession = 0;
	for (var n = 0; n < matches.length; n++) {
		totalPossession += (100-matches[n].possession);
	};
	return totalPossession;
}

function offensiveEffectiveness(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalPossession = offensivePossession(team);
	var totalGoalsScored = 0;
	for (var p = 0; p < matches.length; p++) {
		totalGoalsScored += matches[p].goalsScored;
	};
	var totalOffensiveEffectiveness = totalGoalsScored/totalPossession;
	return totalOffensiveEffectiveness;
}

function defensiveEffectiveness(team) {
	var i = 0;
	while (teams[i].name != team) {
		i++;
	}
	var matches = teams[i].matches;
	var totalPossession = defensivePossession(team);
	var totalOpponentGoals = 0;
	for (var p = 0; p < matches.length; p++) {
		totalOpponentGoals += matches[p].shotsAllowed;
	};
	var totalDefensiveEffectiveness = totalOpponentGoals/totalPossession;
	return totalDefensiveEffectiveness;
}

function compareTeamRatings(team1, team2) {
	var team1Acc = accuracy(team1);
	var team1Del = delivery(team1);
	var team1Def = defense(team1);
	var team1Goa = goalie(team1);
	var team1Rating = (team1Acc*.4 + team1Goa*.1 + team1Def*.4 + team1Goa*.1)*100;
	document.getElementById("team1_rating").innerHTML = team1 + "'s Rating: " + rounding(team1Rating).toString();
	var team2Acc = accuracy(team2);
	var team2Del = delivery(team2);
	var team2Def = defense(team2);
	var team2Goa = goalie(team2);
	var team2Rating = (team2Acc*.4 + team2Goa*.1 + team2Def*.4 + team2Goa*.1)*100;
	document.getElementById("team2_rating").innerHTML = team2 + "'s Rating: " + rounding(team2Rating).toString();
	return;
}

function findWinner(team1, team2) {
	// Team 1 Rating
	var team1Acc = accuracy(team1);
	var team1Del = delivery(team1);
	var team1Def = defense(team1);
	var team1Goa = goalie(team1);
	var team1OffRating = rounding((team1Acc*.4 + team1Del*.1)*100);
	var team1DefRating = rounding((team1Def*.4 + team1Goa*.1)*100);
	// Team 2 Rating
	var team2Acc = accuracy(team2);
	var team2Del = delivery(team2);
	var team2Def = defense(team2);
	var team2Goa = goalie(team2);
	var team2OffRating = rounding((team2Acc*.4 + team2Del*.1)*100);
	var team2DefRating = rounding((team2Def*.4 + team2Goa*.1)*100);
	// Comparison
	var team1Wins = 0;
	var team1Points = 0;
	var team2Wins = 0;
	var team2Points = 0;
	for (var i = 0; i < 10000; i++) {
		var team1Score = (team1OffRating/randomness(1,4) - team2DefRating/randomness(1,4));
		var team2Score = (team2OffRating/randomness(1,4) - team1DefRating/randomness(1,4));
		if (team1Score > team2Score) {
			team1Wins++;
			team1Points += team1Score;
		}
		else {
			team2Wins++;
			team2Points += team2Score;
		}
	};
	if (team1Wins > team2Wins) {
		return [team1,team2,team1Points,team2Points];
	}
	else {
		return [team2,team1,team2Points,team1Points];
	}
}

function compareTeams(team1, team2) {
	var team1Acc = accuracy(team1);
	var team1Del = delivery(team1);
	var team1Def = defense(team1);
	var team1Goa = goalie(team1);
	var team1OffEff = offensiveEffectiveness(team1);
	var team1DefEff = defensiveEffectiveness(team1);
	var team2Acc = accuracy(team2);
	var team2Del = delivery(team2);
	var team2Def = defense(team2);
	var team2Goa = goalie(team2);
	var team2OffEff = offensiveEffectiveness(team2);
	var team2DefEff = defensiveEffectiveness(team2);
	var team1Final = 1 + (((team1Acc*team1OffEff) - (team2Def*team2DefEff)) + ((team1Del*team1OffEff) - (team2Goa*team2DefEff)));
	var team2Final = 1 + (((team2Acc*team2OffEff) - (team1Def*team1DefEff)) + ((team2Del*team2OffEff) - (team1Goa*team1DefEff)));
	return [team1Final, team2Final];
}

function randomness(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min)/10;
}

function displayOutcome(team1, team2) {
	results = compareTeams(team1, team2);
	team1Results = results[0];
	team2Results = results[1];
	var output;
	if (team1Results > team2Results) {
		var goalDifference = Math.ceil(team1Results - team2Results);
		output = team1 + " will win by " + goalDifference.toString();
	}
	else if (team1Results < team2Results) {
		var goalDifference = Math.ceil(team2Results - team1Results);
		output = team2 + " will win by " + goalDifference.toString();
	}
	document.getElementById("team1_points").innerHTML = team1 + ", " + rounding(team1Results).toString();
	document.getElementById("team2_points").innerHTML = team2 + ", " + rounding(team2Results).toString();
	return;
}

function rounding(value) {
	return Math.round(value*1000)/1000;
}

function displayRatings(team) {
	var teamAccuracy = rounding(accuracy(team));
	var teamDelivery = rounding(delivery(team));
	var teamDefense = rounding(defense(team));
	var teamGoalie = rounding(goalie(team));
	document.getElementById("accuracy_target").innerHTML = teamAccuracy;
	document.getElementById("delivery_target").innerHTML = teamDelivery;
	document.getElementById("defense_target").innerHTML = teamDefense;
	document.getElementById("goalie_target").innerHTML = teamGoalie;
	return;
}