<!--
 This file is part of nBookmarks.
 Copyright (c) 2017 Ilkka Lehtinen

 For the full copyright and license information, please view the license.txt
 file that was distributed with this source code.
-->
<div id="bookmarks-content" class="container">
    <div id="quick_links" class="quick_links text-center">
    </div>
    <div id="content">
    </div>
    <div id="add_link" style="display: none">
        <div class="add_link">
        <h4>Add bookmark</h4>
            URL:&nbsp;
            <input id="link_url" type="text" size="30">
            &nbsp;Name:&nbsp;
            <input id="link_name" type="text" size="30">
            &nbsp;Category:&nbsp;
            <select id="select_category"></select>
            <button id="add_link_button">Add</button>
        </div>
        <div class="modify_link">
        <h4>Modify bookmark</h4>
            Link:&nbsp;
            <select id="select_bookmark"></select><br>
            URL:&nbsp;
            <input id="new_url" type="text" size="30">
            &nbsp;Name:&nbsp;
            <input id="new_name" type="text" size="30">
            &nbsp;Category:&nbsp;
            <select id="select_new_category"></select>
            <button id="modify_link_button">Modify</button>
        </div>
        <div class="add_category">
            <h4>Add category</h4>
            Category:&nbsp;
            <input id="new_category" type="text" size="15">
            <button id="add_category">Add</button>
        </div>
        <div class="remove_category">
            <h4>Remove category</h4>
            Category:&nbsp;
            <select id="select_remove_category"></select>
            <button id="remove_category_button">Remove</button>
        </div>
        <div class="modify_category">
            <h4>Modify category</h4>
            Category:&nbsp;
            <select id="select_modify_category"></select>
            <input id="modify_category" type="text" size="15">
            <button id="modify_category_button">Rename</button>
        </div>
        <div class="change_password">
            <h4>Change password</h4>
            Password:&nbsp;
            <input id="hidden-username" type="text" size="0">
            <input id="new_password" type="password" size="15">
            <button id="change_password">Change</button>
        </div>
        <br>
    </div>
    <?php if ($admin) { ?>
        <div id="admin_page" style="display: none">
            <div class="add_link">
                <h4>Add user</h4>
                    Username:&nbsp;
                    <input id="username" type="text" size="30">
                    &nbsp;Password:&nbsp;
                    <input id="password" type="text" size="30">
                    &nbsp;Admin:&nbsp;
                    <input id="admin" type="checkbox" size="30">
                    <button id="add_user">Add</button>
            </div>
            <div class="remove_category">
                <h4>Change password</h4>
                User:&nbsp;
                <select id="select_change_user">
                    <?php
                        foreach ($users as $user)
                        echo "<option value='$user->id'>$user->username</option>";
                    ?>
                </select>
                &nbsp;Password:&nbsp;
                    <input id="admin_change_password" type="text" size="30">
                <button id="change_user_button">Change</button>
            </div>
            <div class="remove_category">
                <h4>Remove user</h4>
                User:&nbsp;
                <select id="select_remove_user">
                    <?php
                        foreach ($users as $user)
                        echo "<option value='$user->id'>$user->username</option>";
                    ?>
                </select>
                <button id="remove_user_button">Remove</button>
            </div>
            <div class="remove_category">
                <h4>Set admin</h4>
                User:&nbsp;
                <select id="select_admin_user">
                    <?php
                        foreach ($users as $user)
                        echo "<option value='$user->id'>$user->username</option>";
                    ?>
                </select>
                &nbsp;Admin:&nbsp;
                <input id="change_admin" type="checkbox" size="30">
                <button id="select_admin_button">Save</button>
            </div>
        </div>
    <?php } ?>
</div>