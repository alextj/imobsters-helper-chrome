
function skill_task_run() {
    if (g_autoSkillEnabled) {
        var textDecor = $('.levelFrontTopArea > a').css("text-decoration");
        if (textDecor.indexOf("none") == -1) {
            skill_do_skillup();
        } else {
            scheduler_next_task();
        }
    } else {
        scheduler_next_task();
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
	  } else {
        // Skillup again
        setTimeout(skill_do_skillup, 1000);
    }
}