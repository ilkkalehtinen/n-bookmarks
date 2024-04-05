<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
namespace App\Controllers;

class Home extends BaseController {

    public function index()
    {
        if (!session()->get('isLoggedIn'))
        {
            return redirect()->to(site_url('login'));
        }
    }

    public function logout()
    {
        $session = session();

        $session->set('isLoggedIn', FALSE);
        $session->destroy();

        return redirect()->to(site_url('login'));
    }

}

?>
