/**
 * Init to check enemey ratios
 */

var myAttack = 0;
var myDefense = 0;
var threshold = 0;

function fight_helper_init() {

	fight_my_ratios();

}

function fight_my_ratios() {

	$.get('profile.php?x=1&selectedTab=main', function(data) {

		var stats = fight_calculate_stats(data);

		myAttack = stats['attack'];
		myDefense = stats['defense'];
		threshold = myAttack * (100 - options.fight_threshold) / 100;

		$('.hdFightMobster').text('Threshold attack: ' + numberWithCommas(threshold));

		fight_find_each_enemy();

	});

}

function fight_calculate_stats(data) {

	var attack = 0;
	var defense = 0;

	$(data).find('div[onclick^="javascript:itemDescription"]').each(function(index) {
		var quantity = format_number($(this).next().text());

		var href = $(this).attr('onclick').replace('javascript:itemDescription(', '');
		href = href.split(", ");

		attack += format_number(href[1]) * quantity;
		defense += format_number(href[2]) * quantity;

	});

	return {
		"attack": attack,
		"defense": defense
	};

}

function fight_find_each_enemy() {

	$('.fightMobster > div > a').each(function(index) {

		fight_find_enemy_ratio($(this));

	});

}

function fight_find_enemy_ratio(fightPage) {

	var attack = 0;
	var defense = 0;
	var url = $(fightPage).attr('href');

	$.get(url, function(data) {

		var stats = fight_calculate_stats(data);

		$(fightPage).closest('.fightMobster > div').next().text('Defense: ' + numberWithCommas(stats['defense']));

		if (stats['defense'] > threshold) {
			$(fightPage).closest('.fightItem').hide();
		}

	})

}
