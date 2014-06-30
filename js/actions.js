var more_info_active = false;
var about_active = false;
var sim_has_run = false;

$("#more_info").click(function() {
	if (more_info_active) {
		$("#info_section").text("");
		more_info_active = false;
	}
	else {
		$("#info_section").text("This simulator takes the performance of each team in their group games into account. Each team's offensive skill is compared against their opponent's defensive skill with the thinking that a higher offensive ability will beat out a weaker defensive ability. This is 'futbol,' however, and the human factor must be taken into account. Even Messi and Ronaldo have bad days. As a result, a random 'human' factor is generated each time and applied to each team's rating. The final ratings, offensive and defensive, are then compared to determine which team has a greater chance of winning that match. Then, that match is simulated 10,000 times with random human factors generated each time. The result is a surprisingly accurate simulation. Case in point: Yesterday, (28 June) Brazil played Chile and Colombia played Uruguay. The sim predicted a very close victory for Brazil (the game went to overtime and was resolved on penalty kicks) and a victory for Colombia (they won 2-0). Want to see who wins? Click 'Run Simulation' and see who comes out on top.")
		more_info_active = true;
	}
});

$("#about").click(function() {
	if (about_active) {
		$("#info_section").text("");
		about_active = false;
	}
	else {
		$("#info_section").text("My name's Patrick RoDee. I'm a designer, programmer, and photographer in Tucson, Arizona and wrote this for fun.")
		about_active = true;
	}
});

$(function () {
      $(".match_button").tooltip({
          content: function () {
              return $(this).prop('title');
          }
      });
  });

function abbreviate(name) {
	if (name == "Brazil"){return "BRA"}
	else if (name == "Chile"){return "CHI"}
	else if (name =="Colombia"){return "COL"}
	else if (name =="Uruguay"){return "URU"}
	else if (name =="France"){return "FRA"}
	else if (name =="Nigeria"){return "NGA"}
	else if (name =="Germany"){return "GER"}
	else if (name =="Algeria"){return "ALG"}
	else if (name =="Netherlands"){return "NED"}
	else if (name =="Mexico"){return "MEX"}
	else if (name =="Costa Rica"){return "CRC"}
	else if (name =="Greece"){return "GRE"}
	else if (name =="Argentina"){return "ARG"}
	else if (name =="Switzerland"){return "SWI"}
	else if (name =="Belgium"){return "BEL"}
	else if (name =="USA"){return "USA"}
};

function countryCode(name) {
	if (name == "Brazil"){return "br"}
	else if (name == "Chile"){return "cl"}
	else if (name =="Colombia"){return "co"}
	else if (name =="Uruguay"){return "uy"}
	else if (name =="France"){return "fr"}
	else if (name =="Nigeria"){return "ng"}
	else if (name =="Germany"){return "de"}
	else if (name =="Algeria"){return "dz"}
	else if (name =="Netherlands"){return "nl"}
	else if (name =="Mexico"){return "mx"}
	else if (name =="Costa Rica"){return "cr"}
	else if (name =="Greece"){return "gr"}
	else if (name =="Argentina"){return "ar"}
	else if (name =="Switzerland"){return "ch"}
	else if (name =="Belgium"){return "be"}
	else if (name =="USA"){return "us"}
};

function updateTooltip(match_number, team1_name, team1_score, team2_name, team2_score) {
	var match_to_update = "#match_" + match_number.toString();
	if (team1_score > team2_score) {
		var winning_team = team1_name;
		var winner_ratio = rounding(team1_score/(team1_score+team2_score))*100;
	}
	else {
		var winning_team = team2_name;
		var winner_ratio = rounding(team2_score/(team1_score+team2_score))*100;
	}
	var tooltip_text = winning_team + " wins with " + winner_ratio.toFixed(0) + "% confidence";
	$(match_to_update).attr('title',tooltip_text);
}

function updateNextMatch(match_number, team1, team2) {
	var match_to_update = "#match_" + match_number.toString();
	var first_to_update = "#first_" + match_number.toString();
	var second_to_update = "#second_" + match_number.toString();
	$(match_to_update).children("#team1").text(team1);
	$(match_to_update).children("#team2").text(team2);
	$(match_to_update).children("#teams").append(abbreviate(team1) + " vs " + abbreviate(team2));
	$(first_to_update).attr('class', 'flag-icon flag-icon-'+countryCode(team1));
	$(second_to_update).attr('class', 'flag-icon flag-icon-'+countryCode(team2));
}

$("#reset_sim").click(function() {
	document.location.reload(true);
});

$("#run_sim").click(function() {
	if (!sim_has_run) {
		sim_has_run = true;
		for (var i = 49; i <=56; i++) {
			var match1_to_sim = "#match_" + i.toString();
			i++;
			//console.log(i);
			var match2_to_sim = "#match_" + i.toString();
			//console.log(match1_to_sim + ": " + $(match1_to_sim).children("#team1").text() + " vs " + $(match1_to_sim).children("#team2").text());
			//console.log(match2_to_sim + ": " + $(match2_to_sim).children("#team1").text() + " vs " + $(match2_to_sim).children("#team2").text());
			var outcome1 = findWinner($(match1_to_sim).children("#team1").text(), $(match1_to_sim).children("#team2").text());
			updateTooltip(i-1,outcome1[0],outcome1[2],outcome1[1],outcome1[3]);
			var outcome2 = findWinner($(match2_to_sim).children("#team1").text(), $(match2_to_sim).children("#team2").text());
			updateTooltip(i,outcome2[0],outcome2[2],outcome2[1],outcome2[3]);
			var winner1 = outcome1[0];
			var winner2 = outcome2[0];
			var loser1 = outcome1[1];
			var loser2 = outcome2[1];
			if (i == 50) {updateNextMatch(57, winner1, winner2)};
			if (i == 52) {updateNextMatch(59, winner1, winner2)};
			if (i == 54) {updateNextMatch(58, winner1, winner2)};
			if (i == 56) {updateNextMatch(60, winner1, winner2)};
		};
		//Match 61
		var team1_for_61 = findWinner($("#match_57").children("#team1").text(), $("#match_57").children("#team2").text());
		var team2_for_61 = findWinner($("#match_58").children("#team1").text(), $("#match_58").children("#team2").text());
		updateTooltip(57,team1_for_61[0],team1_for_61[2],team1_for_61[1],team1_for_61[3]);
		updateTooltip(58,team2_for_61[0],team2_for_61[2],team2_for_61[1],team2_for_61[3]);
		updateNextMatch(61, team1_for_61[0], team2_for_61[0]);
		//Match 62
		var team1_for_62 = findWinner($("#match_59").children("#team1").text(), $("#match_59").children("#team2").text());
		var team2_for_62 = findWinner($("#match_60").children("#team1").text(), $("#match_60").children("#team2").text());
		updateTooltip(59,team1_for_62[0],team1_for_62[2],team1_for_62[1],team1_for_62[3]);
		updateTooltip(60,team2_for_62[0],team2_for_62[2],team2_for_62[1],team2_for_62[3]);
		updateNextMatch(62, team1_for_62[0], team2_for_62[0]);
		//Match 64
		var team1_for_64 = findWinner($("#match_61").children("#team1").text(), $("#match_61").children("#team2").text());
		var team2_for_64 = findWinner($("#match_62").children("#team1").text(), $("#match_62").children("#team2").text());
		updateTooltip(61,team1_for_64[0],team1_for_64[2],team1_for_64[1],team1_for_64[3]);
		updateTooltip(62,team2_for_64[0],team2_for_64[2],team2_for_64[1],team2_for_64[3]);
		updateNextMatch(64, team1_for_64[0], team2_for_64[0]);
		updateNextMatch(63, team1_for_64[1], team2_for_64[1]);
		//Match 63
		var first_and_second = findWinner($("#match_64").children("#team1").text(), $("#match_64").children("#team2").text());
		var third_and_fourth = findWinner($("#match_63").children("#team1").text(), $("#match_63").children("#team2").text());
		updateTooltip(64,first_and_second[0],first_and_second[2],first_and_second[1],first_and_second[3]);
		updateTooltip(63,third_and_fourth[0],third_and_fourth[2],third_and_fourth[1],third_and_fourth[3]);
		$(".to_900").css("visibility", "visible");
		$("#world_cup_1st").text(first_and_second[0]);
		$("#world_cup_1st_flag").addClass("flag-icon-" + countryCode(first_and_second[0]));
		$("#world_cup_2nd").text(first_and_second[1]);
		$("#world_cup_2nd_flag").addClass("flag-icon-" + countryCode(first_and_second[1]));
		$("#world_cup_3rd").text(third_and_fourth[0]);
		$("#world_cup_3rd_flag").addClass("flag-icon-" + countryCode(third_and_fourth[0]));
		$("#world_cup_4th").text(third_and_fourth[1]);
		$("#world_cup_4th_flag").addClass("flag-icon-" + countryCode(third_and_fourth[1]));
	};
	return;
});

