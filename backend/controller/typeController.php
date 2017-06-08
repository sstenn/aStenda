<?php

class typeController
{
    function __construct()
    {
        $modalName = 'modal/type.php';

        require_once ($modalName);
    }

    function getAllTypes($param)
    {   

        $type = new Type();

        $getAllTypes = $type->getAllTypes($param);

        return $getAllTypes;      
    }


 }