<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

session_start(); //we need to call PHP's session object to access it through CI

class Data extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('bookmarks_model');
    }

    function action()
    {
        if ($this->session->userdata('logged_in')) {
            if ($this->input->post('action') == 'change-password') {
                $this->bookmarks_model->savePassword(
                    $this->input->post('password')
                );
            }
            else if ($this->input->post('action') == 'add-user') {
                $this->bookmarks_model->addUser($this->input->post());
            }
            else if ($this->input->post('action') == 'admin-change-password') {
                $this->bookmarks_model->adminChangePassword($this->input->post());
            }
            else if ($this->input->post('action') == 'remove-user') {
                $this->bookmarks_model->removeUser($this->input->post());
            }
            else if ($this->input->post('action') == 'change-admin-user') {
                $this->bookmarks_model->changeAdminUser($this->input->post());
            }
            else {
                $this->bookmarks_model->action($this->input->post());
            }
        }
    }

    function index()
    {
        if ($this->session->userdata('logged_in')) {
            echo $this->bookmarks_model->get_bookmarks();
        }
    }
}

?>