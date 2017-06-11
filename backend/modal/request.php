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
		$q1  = 'select req.id as req_id, req.user_id, req.time_from, req.time_till, req.reason, req.approved, usr.id as usr_id, usr.naam, usr.google_id';
		$q1 .= ' from requests as req';
		$q1 .= ' left join users as usr on user_id = usr.id';
		$q1 .= ' where approved = false';
		$q1 .= $param['role'] < 80 ? ' and google_id = "' . $param['user_id'] . '"' : '';
		$q1 .= ' order by req.id desc';

		$pending 			= $this->_db->query($q1);

		$q2  = 'select req.id as req_id, req.user_id, req.time_from, req.time_till, req.reason, req.approved, usr.id as usr_id, usr.naam, usr.google_id';
		$q2 .= ' from requests as req';
		$q2 .= ' left join users as usr on user_id = usr.id';
		$q2 .= ' where approved = true';
		$q2 .= $param['role'] < 80 ? ' and google_id = "' . $param['user_id'] . '"' : '';
		$q2 .= ' order by req.id desc';
		$q2 .= ' limit 8';
		
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

	public function requestSkip($param)
	{
		//Convert de datums en tijden naar het juiste format voor de sql DB
		$time_from = $param['timeFrom'] ? $param['timeFrom'] . ':00' : '00:00:00';
		$time_till = $param['timeTill'] ? $param['timeTill'] . ':00' : '00:00:00';

		$dateTimeFrom = strtotime($param['dateFrom'] . ' ' . $time_from);
		$requestFrom = date("Y-m-d H:i:s", $dateTimeFrom);

		$dateTimeTill = strtotime($param['dateTill'] . ' ' . $time_till);
		$requestTill = date("Y-m-d H:i:s", $dateTimeTill);

		//Haal de user_id van de gebruiker op
		$condition = 'google_id = "' . $param['user_id'] . '"';

		$res = $this->_db->select('id', 'users', $condition);
		$user_id = $this->_db->get_row_array($res);


		//Insert request
		$table = 'requests';

		$insertArray = array([
			'time_from' => $requestFrom,
			'time_till' => $requestTill,
			'reason'	=> $param['reason'],
			'user_id'	=> $user_id[0]['id'],
			'approved'	=> 0
		]);

		return $this->_db->insert($table, $insertArray);

	}

	public function sendMail($action, $user)
	{

	}

}
