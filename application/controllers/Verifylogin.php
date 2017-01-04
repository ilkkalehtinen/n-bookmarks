<?php
/**
 * This file is part of nBookmarks.
 * Copyright (c) 2017 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
defined('BASEPATH') OR exit('No direct script access allowed');


class Verifylogin extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('user','',TRUE);
    }

    function index()
    {
        //This method will have the credentials validation
        $this->load->library('form_validation');

        $this->form_validation->set_rules(
            'username',
            'Username',
            'trim|required'
        );
        $this->form_validation->set_rules(
            'password',
            'Password',
            'trim|callback_check_database'
        );

        if ($this->form_validation->run() == FALSE) {
            //Field validation failed.  User redirected to login page
            $data['url'] = site_url("/data");
            $data['static_url'] = base_url("/static");

            $this->load->view('templates/login_header', $data);
            $this->load->view('login_view');
            $this->load->view('templates/footer');
        }
        else {
            //Go to private area
            redirect('home', 'refresh');
        }
    }

    function check_database($password)
    {
        //Field validation succeeded.  Validate against database
        $username = $this->input->post('username');

        //query the database
        $result = $this->user->login($username, $password);

        if($result) {
            $sess_array = array();
            foreach($result as $row) {
                $sess_array = array(
                    'id' => $row->id,
                    'username' => $row->username,
                    'admin' => $row->admin
                );
                $this->session->set_userdata('logged_in', $sess_array);
            }
            return TRUE;
        }
        else {
            $this->form_validation->set_message(
                'check_database',
                'Invalid username or password'
            );
            return false;
        }
    }
}
?>