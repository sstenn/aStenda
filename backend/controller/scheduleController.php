<?php

class scheduleController
{
    function __construct()
    {
        $modalName = 'modal/schedule.php';

        require_once ($modalName);
    }

    function setTempEmployment($param)
    {   

        $schedule = new Schedule();

        $setTempEmployment = $schedule->setTempEmployment($param);

        return $setTempEmployment;      
    }

    function getTempSchedule($param)
    {   

        $schedule = new Schedule();

        $getTempSchedule = $schedule->getTempSchedule($param);

        return $getTempSchedule;      
    }

    function getSchedule($param)
    {   

        $schedule = new Schedule();

        $getSchedule = $schedule->getSchedule($param);

        return $getSchedule;      
    }

    function sendSchedule($param)
    {
        $schedule = new Schedule();

        $sendSchedule = $schedule->sendSchedule($param);

        return $sendSchedule; 
    }

    function loadWeeks($param)
    {
        $schedule = new Schedule();

        $loadWeeks = $schedule->loadWeeks($param);

        return $loadWeeks;         
    }

    function loadActivities($param)
    {
        $schedule = new Schedule();

        $loadActivities = $schedule->loadActivities($param);

        return $loadActivities;         
    }


 }