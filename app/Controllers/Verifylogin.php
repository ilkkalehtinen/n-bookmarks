<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use App\Models\Users;

class Verifylogin extends BaseController {

    public function index()
    {
        helper('form');
        $session = session();
        $usersModel = new Users();

        $post = $this->request->getPost(['username', 'password']);

        if (! $this->validateData($post, [
            'username' => 'trim|required',
            'password'  => 'trim|required',
        ])) {
          return view('login_view');
        }

        $user = $usersModel->getUser($post['username']);

        if ($user) {
          $authenticatePassword = password_verify($post['password'], $user['password']);

          if ($authenticatePassword) {
            $session_data = [
                'id' => $user['id'],
                'username' => $user['username'],
                'admin' => $user['admin'],
                'isLoggedIn' => TRUE
            ];
            $session->set($session_data);

            return redirect()->to(base_url());
          } else {
            $this->validator->setError("username", "Invalid user!");
            return view('login_view');
          }
        } else {
          $this->validator->setError("username", "Invalid user!");
          return view('login_view');
        }
    }
}
?>
