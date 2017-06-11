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


 }