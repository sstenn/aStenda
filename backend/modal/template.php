<?php

require_once('DB.php');

class Template {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function addEmployment($param)
	{
		$table = 'template';

		$insertArray = array([
			'week_day'  => $param['day'],
			'time_from'	=> $param['from'],
			'time_till'	=> $param['till'],
			'type_id'   => $param['type']
		]);

		//r_dump($insertArray);die;

		return $this->_db->insert($table, $insertArray);
	}

	public function loadTemplate($param)
	{
		$return				= array();

		$q  = 'select tem.id as tem_id, tem.week_day, tem.time_from, tem.time_till, typ.id as typ_id, typ.color, typ.name from template as tem';
		$q .= ' left join types as typ on tem.type_id = typ.id';
		$q .= ' order by time_from, time_till desc';

		$template 			= $this->_db->query($q);
		
		$res 			    = $this->_db->get_row_array($template);

		foreach($res as $key => $value){
			$time = $value['time_from'] . '-' . $value['time_till'] . '|' . $value['color'] . '|' . $value['tem_id'];

			$return[$value['week_day']][] = $time;

		}

		//var_dump($return);die;

		return $return;
	}

	public function removeEmployment($param)
	{
		$time = explode('-', $param['time']);

		$condition = array(
				'key' 			=> 'week_day',
				'constructor' 	=> '=',
				'value' 		=> $param['day']
			);

		$condition2 = array(
				'key' 			=> 'time_from',
				'constructor' 	=> '=',
				'value' 		=> $time[0]
			);
		
		$condition3 = array(
				'key' 			=> 'time_till',
				'constructor' 	=> '=',
				'value' 		=> $time[1]
			);

		return $this->_db->delete('template', $condition, $condition2, $condition3);

	}
}
