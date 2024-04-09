<!--
 This file is part of nBookmarks.
 Copyright (c) 2023 Ilkka Lehtinen

 For the full copyright and license information, please view the license.txt
 file that was distributed with this source code.
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta
      name="viewport"
      content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    >
    <style>
      body {
        margin: 0;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
      }
      label {
        display:inline-block;
        width: 80px;
        margin: 5px;
      }
      .errors {
        color: red;
      }
      input {
        margin-bottom: 5px;
      }
      .header { height: 50px; background-color: #000 }
      .content { margin: 20px; }
      .button {
        display: block;
        margin-left: 5px;
        margin-top: 20px;
      }
    </style>
    <title>Bookmarks</title>
  </head>
  <body>
    <div class="header"></div>
    <div class="content">
      <h1>Bookmarks login</h1>
      <?= validation_list_errors() ?>
      <form action="<?= site_url('verifylogin') ?>" method="post">
        <?= csrf_field() ?>
        <label for="username">Username:</label>
        <input
          type="text"
          size="20"
          name="username"
          data-cy="username"
          value="<?= set_value('username') ?>"
        />
        <br/>
        <label for="password">Password:</label>
        <input
          type="password"
          size="20"
          name="password"
          data-cy="password"
          value="<?= set_value('password') ?>"
        />
        <input
          type="submit"
          value="Login"
          class="button"
          data-cy="submit"
        />
      </form>
    </div>
  </body>
</html>
