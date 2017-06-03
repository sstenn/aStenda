<?php

class db {
    private $_db;


    public function __construct(){ //$host, $user, $pass, $name
        $this->_db = mysqli_connect('localhost', 'root', '', 'astenda');
        if(!$this->_db){
            return mysqli_connect_errno();
        };
    }

    public function select($value, $table, $condition=false, $condition2=false){
        $query = "SELECT " .$value." FROM " .$table ;
        if($condition){$query .= " WHERE ".$condition;}
        if($condition2){$query .= " AND ".$condition2;}
        $query .= ";";

        //var_dump($query);die();
        
        return $this->_db->query($query);

    }

    public function delete($table, $condition){
        $query = "DELETE FROM " .$table." WHERE " .$condition['key'].$condition['constructor']."'".$condition['value']. "';";

        //var_dump($query);die;

        return $this->_db->query($query);
    }

    public function insert($table, $value){

        foreach($value as $key){
            $keys = implode(',', array_keys($key));
            $values = implode("','", array_values($key));

            $query = "INSERT INTO " .$table. " (".$keys.") VALUES ('".$values."');";

            $this->_db->query($query);
        }

        return true;

    }

    public function update($table, $value, $condition){
        $update = array();

        foreach($value as $key=>$val){
            $value = $key . "='" . $val . "'";
            array_push($update, $value);
        };

        $finalUpdate = implode(',', $update);

        $query = "UPDATE " .$table. " SET " .$finalUpdate. " WHERE " .$condition['key'].$condition['constructor']."'".$condition['value']. "';";


        return $this->_db->query($query);
    }

    public function get_row_array($result='', $type=MYSQLI_ASSOC) 
    {
        $result_array = array();

        while ($row = mysqli_fetch_array($result, $type)) {
            $result_array[] =$row;
        }


        /*foreach ($row as $key => $value) {
            $row[$key] = $value;
        }*/

        //var_dump($result_array);die();

        return $result_array;
    }
}