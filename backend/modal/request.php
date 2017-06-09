<?php

require_once('DB.php');

class Request {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function allRequests($param)
	{
		$q1  = 'select req.id as req_id, req.user_id, req.time_from, req.time_till, req.approved, usr.id as usr_id, usr.naam';
		$q1 .= ' from requests as req';
		$q1 .= ' left join users as usr on user_id = usr.id';
		$q1 .= ' where approved = false';

		$pending 			= $this->_db->query($q1);

		$q2  = 'select req.id as req_id, req.user_id, req.time_from, req.time_till, req.approved, usr.id as usr_id, usr.naam';
		$q2 .= ' from requests as req';
		$q2 .= ' left join users as usr on user_id = usr.id';
		$q2 .= ' where approved = true';
		$q2 .= ' limit 10';

		//var_dump($q2);die;

		$approved 			= $this->_db->query($q2);
		
		$return['pending'] 			= $this->_db->get_row_array($pending);
		$return['approved']			= $this->_db->get_row_array($approved);

		return $return;
	}

	public function approveRequest($param)
	{
		$this->sendMail('approve', $param['user']);

		$updateKeyValue = array(
			'approved' => 1
		);

		$condition = array(
		    'key' => 'id',
		    'constructor' => '=',
		    'value' => $param['request']
		);

		return $this->_db->update('requests', $updateKeyValue, $condition);
	}

	public function declineRequest($param)
	{
		$this->sendMail('decline', $param['user']);

		$condition = array(
				'key' 			=> 'id',
				'constructor' 	=> '=',
				'value' 		=> $param['request']
			);

		return $this->_db->delete('requests', $condition);
	}

	public function sendMail($action, $user)
	{
		
	}

}
