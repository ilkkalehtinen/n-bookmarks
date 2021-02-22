<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2017 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
defined('BASEPATH') OR exit('No direct script access allowed');


class Home extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('bookmarks_model');
    }

    function index()
    {
        if ($this->session->userdata('logged_in')) {
            redirect(base_url("/"));
        }
        else {
            redirect('login', 'refresh');
        }
    }

    function logout()
    {
        $this->session->unset_userdata('logged_in');
        session_destroy();
        redirect('home', 'refresh');
    }

}

?>
