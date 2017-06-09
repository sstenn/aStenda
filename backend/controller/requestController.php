<?php

class requestController
{
    function __construct()
    {
        $modalName = 'modal/request.php';

        require_once ($modalName);
    }

    function allRequests($param)
    {

        $request = new Request();

        $allRequests = $request->allRequests($param);

        return $allRequests;      
    }

    function approveRequest($param)
    {

        $request = new Request();

        $approveRequest = $request->approveRequest($param);

        return $approveRequest;      
    }

    function declineRequest($param)
    {

        $request = new Request();

        $declineRequest = $request->declineRequest($param);

        return $declineRequest;      
    }
 }