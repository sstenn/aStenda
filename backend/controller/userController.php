<?php

class userController
{
    function __construct()
    {
        $modalName = 'modal/user.php';

        require_once ($modalName);
    }

    function setUser($param)
    {

        $user = new User();

        $setUser = $user->setUser($param);

        return $setUser;      
    }

    function setNewUser($param)
    {
        $user = new User();

        $setNewUser = $user->setNewUser($param);

        return $setNewUser;
    }

    function activeUser($param)
    {

        $user = new User();

        $activeUser = $user->activeUser($param);

        return $activeUser;      
    }
    
    function allUsers($param)
    {

        $user = new User();

        $allUsers = $user->allUsers($param);

        return $allUsers;      
    }
    
    function inviteNewUser($param)
    {

        $user = new User();

        $inviteNewUser = $user->inviteNewUser($param);

        return $inviteNewUser;      
    }
}