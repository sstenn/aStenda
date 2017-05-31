<?php

require_once('DB.php');

class User {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function setUser($param)
	{
		
		//var_dump($param);die();

		$insertArray = array([
				'google_id' => $param['id'],
				'naam'		=> $param['name'],
				'rol'		=> $param['role']
			]);

		return $this->_db->insert('users', $insertArray);
	}

	public function setNewUser($param)
	{
		$params = array();

		$condition1 = 'google_id = "' . $param['id'] . '"';
		//$condition2 = 'startdate > "' . (date('Y-m-d') - )

		$user = $this->_db->select('*', 'pending_users', $condition1);

		//var_dump($user->fetch_assoc());die();

		if($user->num_rows <= 0){
			$row = $user->fetch_assoc();

			$params['id'] 	= $row['google_id'];
			$params['name'] = $param['name'];
			$params['rol'] 	= $row['rol'];

			return $this->setUser($params);
		}else{
			return false;
		}
	}

	public function activeUser($param)
	{
		
		$condition = 'google_id = "' . $param['id'] . '"';

		$user = $this->_db->select('*', 'users', $condition);

		if($user->num_rows <= 0){
			$user = $this->_db->select('*', 'pending_users', $condition);

			if($user->num_rows <= 0){
				$return['new'] = false;
			}else{
				$return['new'] = $user->fetch_assoc();
			}
		}else{
			$return['active'] = $user->fetch_assoc();
		}

		return $return;
	}

	public function allUsers($param)
	{
		$users 			= $this->_db->select('*', 'users');
		$pendingUsers 	= $this->_db->select('*', 'pending_users');		
		
		$return['users'] 			= $users->fetch_assoc();
		$return['pending_users']	= $pendingUsers->fetch_assoc();

		return $return;
	}

}