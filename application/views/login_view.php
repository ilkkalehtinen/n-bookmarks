<!--
 This file is part of nBookmarks.
 Copyright (c) 2017 Ilkka Lehtinen

 For the full copyright and license information, please view the license.txt
 file that was distributed with this source code.
-->
<h3>nBookmarks login</h3>
<?php echo validation_errors(); ?>
<?php
    $attributes = array('autocomplete' => 'on');
    echo form_open('verifylogin', $attributes);
?>
    <label for="username">Username:</label>
    <input type="text" size="30" id="username" name="username"/>
    <br/>
    <label for="password">Password:</label>
    <input type="password" size="30" id="passowrd" name="password"/>
    <br/>
    <input type="submit" value="Login"/>
</form>
