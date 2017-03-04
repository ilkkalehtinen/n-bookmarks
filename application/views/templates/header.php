<!--
 This file is part of nBookmarks.
 Copyright (c) 2017 Ilkka Lehtinen

 For the full copyright and license information, please view the license.txt
 file that was distributed with this source code.
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>nBookmarks</title>

    <!-- Bootstrap -->
    <link href="<?php echo $static_url;?>/libs/bootstrap/css/bootstrap.min.css"
          rel="stylesheet">
    <link href="<?php echo $static_url;?>/css/style.css"
          rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="<?php echo $static_url;?>/libs/jquery/jquery-1.11.1.js"></script>
    <script src="<?php echo $static_url;?>/libs/underscore/underscore-min.js"></script>
    <script src="<?php echo $static_url;?>/libs/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo $static_url;?>/bookmarks.js"></script>

    <script type = "text/javascript">
        $(document).ready(function() {
            var filename = "<?php echo $username . '.json';?>";
            var url = "<?php echo $url;?>";
            $.get(url, function(data) {
                initBookmarks(data, url + '/action', filename);
            });
        });
    </script>

    <script type="text/template" class="toolbarTemplate">
        <a class="btn btn-default" href="<%= url %>"><%= name %></a>
    </script>

    <script type="text/template" class="tabContainerTemplate">
        <ul class="nav nav-tabs" role="tablist" id="myTab">
            <%= content %>
        </ul><div class="tab-content">
    </script>

    <script type="text/template" class="optionTemplate">
        <option value="<%= value %>"><%= name %></option>
    </script>

    <script type="text/template" class="tabTemplate">
        <li <% if (first) { %>class="active"<% } %>>
            <a href="#<%= id %>" role="tab" data-toggle="tab"><%= name %>
                <i id="<%= id %>-save-indicator" style="display: none;"
                    class="glyphicon glyphicon-asterisk"></i>
            </a>
        </li>
    </script>

    <script type="text/template" class="categoryTemplate">
        <li class="list-group-item">
            <a href="<%= url %>"><%= name %></a>
            <button id="<%= id %>" class="delete">
                <span class="glyphicon glyphicon-trash" aria-hidden="true">
                </span>
            </button>
        </li>
    </script>

    <script type="text/template" class="noteTemplate">
        <form id="<%= category.id %>-notes-form"
              <% if (!category.notes) { %>style="display: none;"<% } %>
              role="form"
              class="notes-form"
        >
            <div class="textarea-wrapper">
                <textarea spellcheck="false" class="form-control" wrap="off"
                    id="<%= category.id %>-notes"><%= category.notes %></textarea>
            </div>
        </form>
        <div class="bottom-buttons">
            <button id="<%= category.id %>-notes-button" class="notes">
                <span id="span<%= category.id %>"
                      <% if (category.notes) { %>class="glyphicon glyphicon-collapse-up"<% } %>
                      <% if (!category.notes) { %>class="glyphicon glyphicon-edit"<% } %>
                      aria-hidden="true">
                </span>
            </button>
            <span class="growing-divider" />
            <button id="<%= category.id %>-save-button"
                    class="savenotes"
                    <% if (!category.notes) { %>style="display: none;"<% } %>>
                Save
            </button>
        </div>
    </script>

    <script type="text/template" class="contentTemplate">
        <div id="<%= id %>" <% if (first) { %>class="tab-pane active"<% } %>
                            <% if (!first) { %>class="tab-pane"<% } %>>
            <% if (first) { %><%= listHTML %><% } %><ul class="list-group">
                <% if (!first) { %><%= listHTML %><% } %>
            </ul><%= note %>
        </div>
    </script>

  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top navbar-md">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-expanded="false"
                  aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-left">
           <span class="navbar-brand">nBookmarks</span>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="navbar-text"><?php echo $username;?></li>
            <li>
                <button id="settings-button"
                        type="button"
                        class="btn btn-link navbar-btn">list/edit</button>
            </li>
            <?php if ($admin) { ?>
                <li>
                    <button id="admin-button"
                            type="button"
                            class="btn btn-link navbar-btn">admin</button>
                </li>
            <?php } ?>
            <li><a href="home/logout">log out</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
