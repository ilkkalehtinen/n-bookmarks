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
        $data['url'] = site_url("/data");
        $data['static_url'] = base_url("/static");

        $this->load->view('templates/login_header', $data);
        $this->load->helper(array('form'));
        $this->load->view('login_view');
        $this->load->view('templates/footer');
    }

}

?>