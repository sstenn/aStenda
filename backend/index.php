<?php
    
    session_start();

    $controller = $_POST['c'];
    $action     = $_POST['a'];

    $param      = isset($_POST['param']) ? $_POST['param'] : array();

    //var_dump($_POST);

    $controllerName = 'controller/' . $controller . 'Controller' . '.php';
    
    if(file_exists($controllerName)){
        require_once ($controllerName);

        $controllerClassName = $controller . 'Controller';

        $controllerClass = new $controllerClassName();

        $output = $controllerClass->{$action}($param);

        echo json_encode($output);die();

    }else{

    }
