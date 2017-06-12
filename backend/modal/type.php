<?php

require_once('DB.php');

class Type {
	private $_db;

	public function __construct()
	{
		$this->_db = new db();
	}

	public function getAllTypes($param)
	{
		
		$types 			= $this->_db->select('*', 'types');
		
		$return			= $this->_db->get_row_array($types);

		return $return;		
	}

	public function updateColor($param)
	{
		$table = 'types';
		
		$condition = array(
			'key'	      => 'id',
			'constructor' => '=',
			'value'		  => $param['id']
		);

		$updateKeyValue = array(
			'color'    => $param['color']
		);

		return $this->_db->update($table, $updateKeyValue, $condition);		
	}

	public function changeName($param)
	{
		$table = 'types';
		
		$condition = array(
			'key'	      => 'id',
			'constructor' => '=',
			'value'		  => $param['id']
		);

		$updateKeyValue = array(
			'name'    => $param['name']
		);

		return $this->_db->update($table, $updateKeyValue, $condition);		
	}

	public function addType($param)
	{
		$table = 'types';

		$insertArray = array([
			'name'	  => $param['name'],
			'color'   => $param['color']
		]);

		return $this->_db->insert($table, $insertArray);
	}

	public function removeType($param)
	{
		$table = 'types';

		$condition = array(
			'key'	      => 'id',
			'constructor' => '=',
			'value'		  => $param['id']
		);

		return $this->_db->delete($table, $condition);
	}

}
