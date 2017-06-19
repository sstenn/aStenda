<?php

require_once('DB.php');

class User {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function setUser($param, $table='users')
	{
		
		$insertArray = array([
				'google_id' => $param['id'],
				'naam'		=> $param['name'],
				'gmail'		=> $param['gmail'],
				'rol'		=> $param['role']
			]);

		return $this->_db->insert($table, $insertArray);
	}

	public function setNewUser($param)
	{
		$params = array();

		$condition1 = 'gmail = "' . $param['gmail'] . '"';

		$user = $this->_db->select('*', 'pending_users', $condition1);


		if($user->num_rows > 0){
			$row = $this->_db->get_row_array($user);

			$params['id'] 	= $param['id'];
			$params['name'] = $param['name'];
			$params['gmail'] = $param['gmail'];
			$params['role'] 	= $row[0]['rol'];

			$inserted = $this->setUser($params);

			if($inserted){
				$this->removeUserFromPending($param['gmail']);

				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	public function activeUser($param)
	{
		
		$condition = 'google_id = "' . $param['id'] . '"';

		$user = $this->_db->select('*', 'users', $condition);


		if($user->num_rows <= 0){

			$condition2 = 'gmail = "' . $param['mail'] . '"';

			$pending_user = $this->_db->select('*', 'pending_users', $condition2);

			if($pending_user->num_rows <= 0){
				$return['new'] = false;
			}else{
				$return['new'] = $this->_db->get_row_array($pending_user);
			}
		}else{
			$return['active'] = $this->_db->get_row_array($user);
		}

		return $return;
	}

	public function allUsers($param)
	{
		$users 			= $this->_db->select('*', 'users', false, false, 'naam');
		$pendingUsers 	= $this->_db->select('*', 'pending_users', false, false, 'gmail');
		
		$return['users'] 			= $this->_db->get_row_array($users);
		$return['pending_users']	= $this->_db->get_row_array($pendingUsers);

		return $return;
	}

	public function inviteNewUser($param, $role=0)
	{
		$condition = 'gmail = "' . $param['gmail'] . '"';

		$user 			= $this->_db->select('*', 'users', $condition);
		$pending_users 	= $this->_db->select('*', 'pending_users', $condition);

		if($user->num_rows <= 0 && $pending_users->num_rows <= 0){
			$this->sendInviteMail($param['gmail']);

			$insertArray = array([
					'rol' 			=> $role,
					'gmail' 		=> $param['gmail'],
					'start_date' 	=> date('Y-m-d H:i:s')
				]);
			return $this->_db->insert('pending_users', $insertArray);
		}else{
			return false;
		}

		

	}

	public function sendInviteMail($gmail)
	{
		
		$to = $gmail;
		$subject = "Welcome to aStenda!";

		$message = '
		<html>
			<head>
				<title>Welcome to aStenda!</title>
			</head>
			<body>
				<p>You can now log in to aStenda. Click <a href="localhost/aStenda/">here</a> to go to the log in page</p>
				<br>
				<br>
				<p>Have fun,</p>
				<p>Sten Jansen</p>
			</body>
		</html>
		';

		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <stenjansen@gmail.com>' . "\r\n";

		mail($to,$subject,$message,$headers);

	}

	public function removeUserFromPending($gmail)
	{
		$condition = array(
				'key' 			=> 'gmail',
				'constructor' 	=> '=',
				'value' 		=> $gmail
			);

		return $this->_db->delete('pending_users', $condition);

	}

	public function removeUser($param)
	{
		$table = $param['table'];

		$condition = array(
			'key'	      => 'id',
			'constructor' => '=',
			'value'		  => $param['id']
		);

		return $this->_db->delete($table, $condition);
	}

}