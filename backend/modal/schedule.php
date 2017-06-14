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

		$table = 'schedule';

		$times = explode("-", $param['times']);
		$from  = $times[0];
		$till  = $times[1];

		$strDate = strtotime($param['date']);
		$date = date("Y-m-d", $strDate);


		$possible = $this->checkTime($param);

		if($possible){

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
					'unique_key' => $param['unique'],
					'sent'		 => 0
				]);

				return $this->_db->insert($table, $insertArray);
			}
		}else{
			return false;
		}

	}

	public function checkTime($param)
	{

		$times = explode("-", $param['times']);
		$from  = $times[0];
		$till  = $times[1];

		$aDate    = explode("-", $param['date']);
		$dateFrom = $aDate[2] . '-' . $aDate[1] . '-' . $aDate[0];

		if($till < $from){
			$dateTill = $aDate[2] . '-' . $aDate[1] . '-' . ($aDate[0] +1); 	
		}else{
		    $dateTill = $aDate[2] . '-' . $aDate[1] . '-' . $aDate[0];	
		}

		$dateTimeFromStr = strtotime($dateFrom . ' ' . $from . ':00');
		$dateTimeTillStr = strtotime($dateTill . ' ' . $till . ':00');

		$dateTimeFrom = date("Y-m-d H:i:s", $dateTimeFromStr);
		$dateTimeTill = date("Y-m-d H:i:s", $dateTimeTillStr); 

		$q  = 'select * from requests';
		$q .= ' where user_id  =  ' . $param['user_id'];
		$q .= ' and approved   =  ' . 1;
		$q .= ' and (time_from >= "' . $dateTimeFrom . '" and time_from <= "' . $dateTimeTill . '")';
		$q .= ' or  (time_till <= "' . $dateTimeTill . '" and time_till >= "' . $dateTimeFrom . '")';

		$res = $this->_db->query($q);

		if($res->num_rows > 0){
			return false;
		}else{
			return true;
		}

	}

	public function getTempSchedule($param)
	{
		$q  = 'select * from schedule as tem';
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

	public function sendSchedule($param)
	{	

		var_dump($param);die;

		$strDateFirst = strtotime($param['first']);
		$dateFirst = date("Y-m-d", $strDateFirst);
		$strDateLast = strtotime($param['last']);
		$dateLast = date("Y-m-d", $strDateLast);

		$q  = 'update schedule';
		$q .= ' set sent = ' . 1;
		$q .= ' where date between "' . $dateFirst . '" and "' . $dateLast . '"';

		return	$this->_db->query($q);

	}


}
