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

    function sendSchedule($param)
    {
        $schedule = new Schedule();

        $sendSchedule = $schedule->sendSchedule($param);

        return $sendSchedule; 
    }



 }