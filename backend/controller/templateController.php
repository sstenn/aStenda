<?php

class templateController
{
    function __construct()
    {
        $modalName = 'modal/template.php';

        require_once ($modalName);
    }

    function addEmployment($param)
    {

        $template = new Template();

        $addEmployment = $template->addEmployment($param);

        return $addEmployment;      
    }

    function loadTemplate($param)
    {

        $template = new Template();

        $loadTemplate = $template->loadTemplate($param);

        return $loadTemplate;

    }

    function removeEmployment($param)
    {
        $template = new Template();

        $removeEmployment = $template->removeEmployment($param);

        return $removeEmployment;        
    }

 }