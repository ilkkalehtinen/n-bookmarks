<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
namespace App\Models;

require_once 'bookmarks.inc.php';

use CodeIgniter\Model;

Class Users extends Model
{
    protected $table = 'users';

    protected $allowedFields = [
        'id',
        'username',
        'password',
        'bookmarks',
        'admin'
    ];

    function __construct()
    {
        parent::__construct();

        $this->user_id = session()->get('id');
        $this->bookmarks = new Bookmarks();
    }

    public function getUser($username)
    {
        return $this->where(['username' => $username])->first();
    }

    public function getUsers()
    {
        return $this->select('id, username, admin')->findAll();
    }

    public function get_bookmarks()
    {
        $encrypter = \Config\Services::encrypter();
        $user = $this->where(['id' => $this->user_id])->first();

        if ($user['bookmarks']) {
            return $encrypter->decrypt(hex2bin($user['bookmarks']));
        }
        else {
            return $this->initData();
        }
    }

    public function action($data)
    {
        $action = $data["action"];
        $this->bookmarks->readData($this->get_bookmarks(), $data['etag']);
        $this->bookmarks->$action($data);
        $this->putData($this->bookmarks->getData());
    }

    public function savePassword($password)
    {
        $data = array(
            'password' => password_hash($password, PASSWORD_DEFAULT)
        );
        $this->update($this->user_id, $data);
    }

    public function addUser($data)
    {
        $encrypter = \Config\Services::encrypter();

        $admin = 0;
        if ($data['admin'] == '1') {
            $admin = 1;
        }
        $row = array(
            'username' => $data['name'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'admin' => $admin,
            'bookmarks' => bin2hex($encrypter->encrypt($this->getTemplate()))
        );
        $this->insert($row);
    }

    public function adminChangePassword($data)
    {
        $row = array(
            'password' => password_hash($data["password"], PASSWORD_DEFAULT)
        );
        $this->update($data["user"], $row);
    }

    public function removeUser($data)
    {
        $this->delete($data["user"]);
    }

    public function changeAdminUser($data)
    {
        $admin = 0;
        if ($data["admin"] == "1") {
            $admin = 1;
        }
        $row = array(
            'admin' => $admin
        );
        $this->update($data['user'], $row);
    }

    public function uploadData($data)
    {
        $this->putData(json_decode($data['data']));
        return $this->get_bookmarks();
    }

    private function putData($data)
    {
        $encrypter = \Config\Services::encrypter();
        $data = array(
            'bookmarks' => bin2hex($encrypter->encrypt($data))
        );
        $this->update($this->user_id, $data);
    }

    private function getTemplate() {
        return '{
            "etag": 1,
            "bookmarks": [
                {
                    "id": "1",
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
                    "id": "3",
                    "category": "Sample",
                    "bookmarks": [
                        {
                            "id": "4",
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
        return $this->get_bookmarks();
    }
}
?>
