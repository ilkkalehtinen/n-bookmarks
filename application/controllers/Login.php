<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2017 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
defined('BASEPATH') OR exit('No direct script access allowed');


class Login extends CI_Controller {

    function __construct()
    {
        parent::__construct();
    }

    function index()
    {
        $this->load->helper(array('form'));
        $this->load->view('login_view');
    }

}

?>
