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

class Login extends BaseController {

    public function index()
    {
        helper('form');
        return view('login_view');
    }
}

?>
