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

    function updateColor($param)
    {
        $type = new Type();

        $updateColor = $type->updateColor($param);

        return $updateColor; 
    }

    function changeName($param)
    {
        $type = new Type();

        $changeName = $type->changeName($param);

        return $changeName; 
    }

    function addType($param)
    {
        $type = new Type();

        $addType = $type->addType($param);

        return $addType; 
    }

    function removeType($param)
    {
        $type = new Type();

        $removeType = $type->removeType($param);

        return $removeType; 
    }

 }