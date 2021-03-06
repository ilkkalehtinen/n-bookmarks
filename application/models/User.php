<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2017 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */


Class User extends CI_Model
{
    function login($username, $password)
    {
        $this->db->select('id, username, password, admin');
        $this->db->from('users');
        $this->db->where('username', $username);
        $this->db->limit(1);

        $query = $this->db-> get();

        if ($query -> num_rows() == 1) {
            if (password_verify($password, $query->result()[0]->password)) {
                return $query->result();
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
?>