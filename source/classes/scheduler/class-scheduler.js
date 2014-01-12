var TASK_NONE = 0;
var TASK_INVEST = 1;
var TASK_SKILL = 2;
var TASK_MISSION = 3;
var TASK_FIGHT = 4;
var TASK_NUM_TASKS = 5;

var schedulerTimer = null;

function scheduler_timer_tick() {
	scheduler_run();
}

function scheduler_run() {
	var taskSwitched = false;

	if (g_schedulerCurrentTask == null) {
		g_schedulerCurrentTask = TASK_NONE;
		g_save();
	}
	if (g_schedulerLastTaskStartTime == null) {
		g_schedulerLastTaskStartTime = new Date(2000, 1, 1);
		g_save();
	}

	if (schedulerTimer == null) {
		schedulerTimer = setInterval(scheduler_timer_tick, 20000);
	}

	var timeNow = new Date();
	var timeEnd = addMinutes(g_schedulerLastTaskStartTime, 5);
	//var timeEnd = addSeconds(g_schedulerLastTaskStartTime, 10);

	if (timeNow > timeEnd) {
		scheduler_next_task();
		taskSwitched = true;
	}

	return taskSwitched;
}

function scheduler_next_task() {
	g_schedulerCurrentTask++;
	if (g_schedulerCurrentTask == TASK_NUM_TASKS) {
		g_schedulerCurrentTask = TASK_NONE + 1;
	}
	g_save();
	g_schedulerLastTaskStartTime = new Date();
	setTimeout(function() {
		sidebar_update_current_task();
		scheduler_run_task(g_schedulerCurrentTask);
	}, 3000);
}

function scheduler_run_task(task) {
	switch (task) {
		case TASK_INVEST:
			investment_task_run();
			break;
		case TASK_SKILL:
			skill_task_run();
			break;
		case TASK_MISSION:
			missions_task_run();
			break;
		case TASK_FIGHT:
			fight_task_run();
			break;
		default:
			alert("Scheduler error!");
			break;
	}
}

function addMinutes(date, minutes) {
	return new Date(date.getTime() + minutes*60000);
}
function addSeconds(date, seconds) {
	return new Date(date.getTime() + seconds*1000);
}