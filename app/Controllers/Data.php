<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Exceptions\PageNotFoundException;

use App\Models\Users;

class Data extends BaseController {
    use ResponseTrait;

    public function index()
    {
        if (!session()->get('isLoggedIn')) {
          return $this->response->setStatusCode(401, 'unauthorized');
        }

        $usersModel = new Users();

        return $this->response->setJSON($usersModel->get_bookmarks());
    }

    public function action()
    {
        if (!session()->get('isLoggedIn')) {
          return $this->response->setStatusCode(401, 'unauthorized');
        }

        $usersModel = new Users();

        $post = $this->request->getPost();
        $action = $post['action'];

        if ($action == 'change-password') {
            $usersModel->savePassword(
                $this->request->getPost('password')
            );
        }
        else if ($action == 'add-user') {
            $usersModel->addUser($post);
        }
        else if ($action == 'admin-change-password') {
            $usersModel->adminChangePassword($post);
        }
        else if ($action == 'remove-user') {
            $usersModel->removeUser($post);
        }
        else if ($action == 'change-admin-user') {
            $usersModel->changeAdminUser($post);
        }
        else if ($action == 'upload-data') {
            $usersModel->uploadData($post);
        }
        else {
            $usersModel->action($post);
        }
    }

    public function user()
    {
        if (!session()->get('isLoggedIn')) {
          return $this->response->setStatusCode(401, 'unauthorized');
        }

        $session = session();
        $session_data = [
          'id' => $session->get('id'),
          'username' => $session->get('username'),
          'admin' => $session->get('admin'),
        ];

        return $this->response->setJSON($session_data);
    }

    public function users()
    {
        if (!session()->get('isLoggedIn')) {
          return $this->response->setStatusCode(401, 'unauthorized');
        }

        $usersModel = new Users();

        return $this->response->setJSON(
          $usersModel->getUsers()
        );
    }
}
