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


}
