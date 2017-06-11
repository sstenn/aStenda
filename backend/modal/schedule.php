<?php

require_once('DB.php');

class Schedule {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function setTempEmployment($param)
	{
		//var_dump($param);

		$table = 'temperary_schedule';

		$times = explode("-", $param['times']);
		$from  = $times[0];
		$till  = $times[1];

		$strDate = strtotime($param['date']);
		$date = date("Y-m-d", $strDate);

		$insertArray = array([
			'user_id'   => $param['user_id'],
			'time_from'	=> $from,
			'time_till'	=> $till,
			'date' 		=> $date
		]);

		//var_dump($times[0], $times[1]);die;

		return $this->_db->insert($table, $insertArray);

	}


}
