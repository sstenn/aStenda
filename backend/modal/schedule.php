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

		$condition  = 'unique_key = "' . $param['unique'] . '"';
		$condition2 = 'date = "' . $date . '"';

		$temp = $this->_db->select('*', $table, $condition, $condition2);

		if($temp->num_rows > 0){

			$condition = array(
				'key'	      => 'unique_key',
				'constructor' => '=',
				'value'		  => $param['unique']
			);
			
			$condition2 = array(
				'key'	      => 'date',
				'constructor' => '=',
				'value'		  => $date
			);

			$updateKeyValue = array(
				'user_id'    => $param['user_id']
			);

			return $this->_db->update($table, $updateKeyValue, $condition, $condition2);

		}else{

			$insertArray = array([
				'user_id'    => $param['user_id'],
				'time_from'	 => $from,
				'time_till'	 => $till,
				'date' 		 => $date,
				'unique_key' => $param['unique']
			]);

			return $this->_db->insert($table, $insertArray);
		}

	}

	public function getTempSchedule($param)
	{
		$q  = 'select * from temperary_schedule as tem';
		$q .= ' left join users on users.id = tem.user_id';

		$res = $this->_db->query($q);

		$row = $this->_db->get_row_array($res);

		$tempSchedule = array();

		foreach($row as $key => $value){
			$date = date_create($value['date']);
			$dateFormat = date_format($date, "j-n-Y");


			$datetime = $value['time_from'] . '-' . $value['time_till'] . $dateFormat . $value['unique_key'];

			$tempSchedule[$datetime] = $value['naam'];
		}

		return $tempSchedule;
	}


}
