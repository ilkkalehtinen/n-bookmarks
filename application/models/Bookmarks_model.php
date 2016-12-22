<?php

require_once 'bookmarks.inc.php';


class Bookmarks_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
        if ($this->session->userdata('logged_in')) {
            $this->username = $this->session->userdata('logged_in')['username'];
            $this->bookmarks = new Bookmarks();
        }
    }

    public function get_bookmarks()
    {
        $this->db->select('bookmarks');
        $this->db->from('users');
        $this->db->where('username', $this->username);

        $data = $this->db-> get()->row()->bookmarks;
        if ($data) {
            if ($data[0] == '{') {
                return $data;
            } else {
                return $this->encryption->decrypt($data);
            }
        }
        else {
            return $this->initData();
        }
    }

    public function action($data)
    {
        $action = $data["action"];
        $this->bookmarks->readData($this->get_bookmarks(), $data["etag"]);
        $this->bookmarks->$action($data);
        $this->putData($this->bookmarks->getData());
    }

    public function savePassword($password)
    {
        $data = array(
            'password' => password_hash($password, PASSWORD_DEFAULT)
        );
        $this->db->where('username', $this->username);
        $this->db->update('users', $data);
    }

    public function addUser($data)
    {
        $admin = 0;
        if ($data["admin"] == "true") {
            $admin = 1;
        }
        $row = array(
            'username' => $data["name"],
            'password' => password_hash($data["password"], PASSWORD_DEFAULT),
            'admin' => $admin,
            'bookmarks' => $this->encryption->encrypt($this->getTemplate())
        );
        $this->db->insert('users', $row);
    }

    public function adminChangePassword($data)
    {
        $row = array(
            'password' => password_hash($data["password"], PASSWORD_DEFAULT)
        );
        $this->db->where('id', $data["user"]);
        $this->db->update('users', $row);
    }

    public function removeUser($data)
    {
        $this->db->where('id', $data["user"]);
        $this->db->delete('users');
    }

    public function changeAdminUser($data)
    {
        $admin = 0;
        if ($data["admin"] == "true") {
            $admin = 1;
        }
        $row = array(
            'admin' => $admin
        );
        $this->db->where('id', $data["user"]);
        $this->db->update('users', $row);
    }

    public function getUsers()
    {
        $this->db->select('id, username');
        $query = $this->db->get('users');
        return $query->result();
    }

    private function putData($data)
    {
        $data = array(
            'bookmarks' => $this->encryption->encrypt($data)
        );
        $this->db->where('username', $this->username);
        $this->db->update('users', $data);
    }

    private function getTemplate() {
        return '{
            "bookmarks": [
                {
                    "id": 1,
                    "category": "Toolbar",
                    "bookmarks": [
                        {
                            "id": 2,
                            "name": "Google",
                            "url": "http:\/\/www.google.com"
                        }
                    ]
                },
                {
                    "id": 3,
                    "category": "Sample",
                    "bookmarks": [
                        {
                            "id": 4,
                            "name": "Google",
                            "url": "http:\/\/www.google.com"
                        }
                    ]
                }
            ]
        }';
    }

    private function initData()
    {
        $this->putData($this->getTemplate());
        return $template;
    }
}