<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

session_start(); //we need to call PHP's session object to access it through CI

class Home extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('bookmarks_model');
    }

    function index()
    {
        if ($this->session->userdata('logged_in')) {
            $session_data = $this->session->userdata('logged_in');

            $data['username'] = $session_data['username'];
            $data['admin'] = $session_data['admin'];
            $data['url'] = site_url("/data");
            $data['static_url'] = base_url("/static");

            $userdata['users'] = Array();
            if ($data['admin']) {
                $userdata['users'] = $this->bookmarks_model->getUsers();
            }

            $this->load->view('templates/header', $data);
            $this->load->view('content', $userdata);
            $this->load->view('templates/footer');
        }
        else {
            //If no session, redirect to login page
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