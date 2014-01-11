var skill_timer = 0;

function skill_timer_start() {
    skill_timer = setInterval(skill_timer_tick, 10000);
}

function skill_timer_tick() {
    skill_run_auto_skill();
}

function skill_timer_stop() {
    clearInterval(skill_timer);
}

function skill_run_auto_skill() {
	if (g_autoSkillEnabled) {
		var textDecor = $('.levelFrontTopArea > a').css("text-decoration");
		if (textDecor.indexOf("none") == -1) {
			skill_do_skillup();
		}
	}
}

function skill_do_skillup() {
	
    if (document.URL.indexOf("profile.php?selectedTab=skill") < 1) {
        // Automatically move to fight page if not already there
        window.location.href = 'profile.php?selectedTab=skill';
        return false;
	}
	
	// find Attack skill 
	$('#skill_offense_button').find('div').click();
	
	if ($('#skill_point').text().trim() == 0) {
		// go to home page to update the page header
		window.location = 'home.php';
	}
}
/*

Add skill button:
<div class="skillAddButton">Increase</div>

Attack skill button is the fifth (index 4)

$('.skillAddButton').eq(4).click();


<span id="skill_point" class="numSkillPoints">3</span>


if ($('#skill_point').html() > 0) {
	$('.skillAddButton').eq(4).click();
} else {
	// go to home page to update the page header
	window.location = 'home.php';
}


var textDecor = $('.levelFrontTopArea > a').css(text-decoration);
--------------------------------
when skill points available:

<div class="levelTopArea">
          <div class="levelBgTopArea"></div>
          <div class="levelFrontTopArea"><a href="/profile.php?formNonce=ee5d4583eb0ec7ecfc03218a328dbcaf14d40d4c&amp;setTab1Badge=3&amp;h=dbc77d567faa4221a4933112e9a1a5537a78e40c">11!</a></div>
        </div>

--------------------------------
when no skill points available:
(style="text-decoration:none")

<div class="levelTopArea">
          <div class="levelBgTopArea"></div>
          <div class="levelFrontTopArea"><a style="text-decoration:none" href="/profile.php?formNonce=f9c8c3f61e21a38c9aee525122f61c7294b408ce&amp;setTab1Badge=3&amp;h=2d33d59e71c3119eabcc0bdbbabebd2c64626cb5">11</a></div>
        </div>

--------------------------------
Skills page, text that says how many skill points is left and the skills with buttos
This is how it looks like when there is 0 points left:

<div class="sectionContent">
		  <link rel="stylesheet" type="text/css" href="http://static.storm8.com/im/css/favor.css?v=330">
<div style="font-size: 14px; font-weight: bold; padding: 1px 0 5px 0;"> 
  You have <span id="skill_point" class="numSkillPoints" style="font-size: 12pt;">0</span> remaining Skill Points.</div>

<div class="pointsSection">
<table style="width:100%">
	  
  <tbody><tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>
  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/energy.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Energy</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_energy">20</td>
          <td class="skillInsufficient" id="skill_energy_button"></td>
      </tr>

  

  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/health.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Health</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_health">100</td>
          <td class="skillInsufficient" id="skill_health_button"></td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/stamina.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Stamina</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_stamina">12</td>
          <td class="skillInsufficient" id="skill_stamina_button"></td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/attack.gif?v=330" width="20" height="20"></td>
        <td style="width:5px"></td><td class="vmid">Attack</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_offense" style="">17</td>
          <td class="skillInsufficient" id="skill_offense_button"></td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/defense.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Defense</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_defense">1</td>
          <td class="skillInsufficient" id="skill_defense_button"></td>
      </tr>

  

</tbody></table>
</div>

         </div>










--------------------------------
Skills page, text that says how many skill points is left and the skills with buttos
This is how it looks like when there is 3 points left:


<div class="sectionContent">
		  <link rel="stylesheet" type="text/css" href="http://static.storm8.com/im/css/favor.css?v=330">
<div style="font-size: 14px; font-weight: bold; padding: 1px 0 5px 0;"> 
  You have <span id="skill_point" class="numSkillPoints">3</span> remaining Skill Points.</div>

<div class="pointsSection">
<table style="width:100%">
	  
  <tbody><tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>
  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/energy.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Energy</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_energy">20</td>
          <td class="skillButton" id="skill_energy_button"><a href="javascript:spendSkill('energy', '')"><div class="skillAddButton">Increase</div></a></td>
      </tr>

  

  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/health.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Health</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_health">100</td>
          <td class="skillButton" id="skill_health_button"><a href="javascript:spendSkill('health', '')"><div class="skillAddButton">Increase</div></a></td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/stamina.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Max Stamina</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_stamina">12</td>
          <td class="skillButton" id="skill_stamina_button"><a href="javascript:spendSkill('stamina', '')"><div class="skillAddButton">Increase</div></a></td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/attack.gif?v=330" width="20" height="20"></td>
        <td style="width:5px"></td><td class="vmid">Attack</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_offense">17</td>
          <td class="skillButton" id="skill_offense_button">
        <a href="javascript:spendSkill('offense', '')"><div class="skillAddButton">Increase</div></a>
      </td>
      </tr>

  
  <tr><td colspan="3"><div class="sectionBarMinor"></div></td></tr>

  <tr>
    <td class="skillsStatsCol1">
      <table><tbody><tr><td class="vmid"><img src="http://static.storm8.com/im/images/stats/defense.gif?v=330" width="20" height="20"></td><td style="width:5px"></td><td class="vmid">Defense</td></tr></tbody></table>
    </td>
    <td class="skillsStatsCol2" id="skill_defense">1</td>
          <td class="skillButton" id="skill_defense_button">
        <a href="javascript:spendSkill('defense', '')"><div class="skillAddButton">Increase</div></a></td>
      </tr>

  

</tbody></table>
</div>

         </div>
*/