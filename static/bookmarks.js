/**
 * This file is part of nBookmarks.
 * Copyright (c) 2017 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */

var bookmarkTable = {};
var serverURL;
var etag;

function initBookmarks(data, url) {
    serverURL = url;

    var parsedData = JSON.parse(data);
    etag = parsedData.etag;
    if (etag === undefined) {
        etag = "";
    }
    var sortedData = sortData(parsedData.bookmarks);

    $('#quick_links').html(getToolBarHTML(sortedData));
    $('#content').html(getContentHTML(sortedData));
    addOptionsToEditPage(sortedData);
    initActions(serverURL);
}

function getToolBarHTML(data) {
    var toolBarHTML = "";
    var toolBarTemplate = _.template($("script.toolbarTemplate").html());
    $.each(data, function(index, category) {
        if (category.category === 'Toolbar') {
            if (category.bookmarks) {
                $.each(category.bookmarks, function(index, bookmark) {
                    toolBarHTML += toolBarTemplate({
                        url: bookmark.url,
                        name: bookmark.name
                    });
                });
            }
        }
    });
    return toolBarHTML;
}

function addOptionsToEditPage(data) {
    $("#select_bookmark").append('<option value=0>Select bookmark...</option>');
    var optionTemplate = _.template($("script.optionTemplate").html());
    $.each(data, function(index, category) {
        var optionHTML = optionTemplate({
            value: category.id,
            name: category.category
        });
        $("#select_category").append(optionHTML);
        $("#select_new_category").append(optionHTML);
        $("#select_remove_category").append(optionHTML);
        $("#select_modify_category").append(optionHTML);
        if (category.bookmarks) {
            $.each(category.bookmarks, function(index, bookmark) {
                optionHTML = optionTemplate({
                    value: bookmark.id,
                    name: category.category + ' ' + bookmark.name
                });
                $("#select_bookmark").append(optionHTML);
                bookmarkTable[bookmark.id] = {
                    name: bookmark.name,
                    url: bookmark.url
                };
            });
        }
    });
}

function getContentHTML(data) {
    var tabHTML = "";
    var first = true;
    var tabTemplate = _.template($( "script.tabTemplate" ).html());
    $.each(data, function(index, category) {
        tabHTML += tabTemplate({
            id: category.id,
            name: category.category,
            first: first
        });
        if (first) {
            first = false;
        }
    });

    var tabContainerTemplate = _.template(
        $("script.tabContainerTemplate").html());
    var html = tabContainerTemplate({ content: tabHTML });

    var categoryTemplate = _.template($( "script.categoryTemplate" ).html());
    var noteTemplate = _.template($( "script.noteTemplate" ).html());
    var contentTemplate = _.template($( "script.contentTemplate" ).html());
    first = true;
    $.each(data, function(index, category) {
        var listHTML = "";
        if (category.bookmarks) {
            $.each(category.bookmarks, function(index, bookmark) {
                listHTML += categoryTemplate({
                    url: bookmark.url,
                    name: bookmark.name,
                    id: bookmark.id
                });
            });
        }
        var note = noteTemplate({ category: category });
        html += contentTemplate({
            first: first,
            id: category.id,
            listHTML: listHTML,
            note: note
        });
        if (first) {
            first = false;
        }
    });
    html += '</div>';
    return html;
}

function sortData(parsedData) {
    parsedData.sort(function(a, b) {
      return a.category.toLowerCase().localeCompare(b.category.toLowerCase());
    });

    $.each(parsedData, function(index, category) {
        if (category.bookmarks) {
            category.bookmarks.sort(function(a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
        }
    });
    return parsedData;
}

function saveNote(categoryID) {
    var saveIndicator = $("ul#myTab li.active i");
    if (saveIndicator.is(':visible')) {
        saveIndicator.hide();
    }
    var noteSelector = "#" + categoryID + "-notes";
    var notes = encodeURIComponent($(noteSelector).val());

    $.ajax({
        type: "POST",
        url: serverURL,
        data: "action=setCategoryNotes" +
              "&id=" + categoryID +
              "&etag=" + etag +
              "&note=" + notes
    }).success(function(response) {
        etag = response;
    }).fail(function() {
      alert("Note saving failed.");
    });
}

function initActions(serverURL) {
    $("textarea").keydown(function(e) {

        // Ctrl + S (save)
        if ((e.ctrlKey || e.metaKey) && e.which === 83) {
            e.preventDefault();
            var categoryID = $("ul#myTab li.active a")[0].hash;
            categoryID = categoryID.substring(1);
            saveNote(categoryID);

            var saveIndicator = $("ul#myTab li.active i");
            if (saveIndicator.is(':visible')) {
                saveIndicator.hide();
            }

            return false;
        }
        // Tab
        else if (e.keyCode === 9) {
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var $this = $(this);
            var value = $this.val();

            // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start) + "\t" + value.substring(end));

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
        }
    });

    $("textarea").on('input', function() {
        var saveIndicator = $("ul#myTab li.active i");
        if (!saveIndicator.is(':visible')) {
            saveIndicator.show();
        }
    });

    $("#settings-button").click(function() {
        if ($("#admin_page").is(":visible")) {
            $("#content").fadeToggle("fast");
            $("#add_link").fadeOut("fast");
            $("#admin_page").fadeOut("fast");
        }
        else {
            $("#content").fadeToggle("fast");
            $("#add_link").fadeToggle("fast");
        }
        $("#settings-button").blur();
    });

    $("#admin-button").click(function() {
        $("#content").fadeOut();
        $("#add_link").fadeOut();
        $("#admin_page").fadeIn("fast");
        $("#admin-button").blur();
    });

    $("button[id$='notes-button']").click(function() {
        var form = "#" + this.id.replace("-button", "-form");
        $(form).fadeToggle("fast");

        var id = this.id.replace("-notes-button", "");
        var span = "#span" + id;
        $(span).toggleClass(
            "glyphicon glyphicon-edit glyphicon glyphicon-collapse-up");
    });

    $(".btn").mouseout(function() {
        $(this).blur();
    });

    $("#myTab").click(function() {
        $(this).blur();
    });


    $('#add_category').click(function() {
        var newCategory = encodeURIComponent($('#new_category').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=addCategory" +
                  "&name=" + newCategory +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#change_password').click(function() {
        var newPassword = encodeURIComponent($('#new_password').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=change-password" +
                  "&password=" + newPassword +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#remove_category_button').click(function() {
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=removeCategory" +
                  "&id=" + $('#select_remove_category').val() +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#modify_category_button').click(function() {
        var newCategory = encodeURIComponent($('#modify_category').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=renameCategory" +
                  "&id=" + $('#select_modify_category').val() +
                  "&name=" + newCategory +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $("button[id$='save-button']").click(function(e) {
        e.preventDefault();
        var categoryID = e.target.id.replace("-save-button", "");
        saveNote(categoryID);
    });

    $('#add_link_button').click(function() {
        var url = encodeURIComponent($('#link_url').val());
        var name = encodeURIComponent($('#link_name').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=addBookmark" +
                  "&url=" + url +
                  "&name=" + name +
                  "&category=" + $('#select_category').val()+
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#modify_link_button').click(function() {
        var url = encodeURIComponent($('#new_url').val());
        var name = encodeURIComponent($('#new_name').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=modifyBookmark" +
                  "&url=" + url +
                  "&name=" + name +
                  "&id=" + $('#select_bookmark').val() +
                  "&category=" + $('#select_new_category').val() +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $("#select_bookmark").change(function() {
        if (this.value !== '0') {
            $('#new_name').val(bookmarkTable[this.value].name);
            $('#new_url').val(bookmarkTable[this.value].url);
        }
        else {
            $('#new_name').val('');
            $('#new_url').val('');
        }
    });

    $('.delete').click(function() {
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=removeBookmark" +
                  "&id=" + $(this).attr("id") +
                  "&etag=" + etag
        })
        .done(function() {
            window.location.reload();
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#add_user').click(function() {
        var name = encodeURIComponent($('#username').val());
        var password = encodeURIComponent($('#password').val());
        var admin = $('#admin').is(":checked");
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=add-user" +
                  "&name=" + name +
                  "&password=" + password +
                  "&admin=" + admin
        })
        .done(function() {
            alert("New user added.");
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#change_user_button').click(function() {
        var newPassword = encodeURIComponent($('#admin_change_password').val());
        var user = encodeURIComponent($('#select_change_user').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=admin-change-password" +
                  "&user=" + user +
                  "&password=" + newPassword +
                  "&etag=" + etag
        })
        .done(function() {
            alert("Password changed.");
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#remove_user_button').click(function() {
        var user = encodeURIComponent($('#select_remove_user').val());
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=remove-user" +
                  "&user=" + user +
                  "&etag=" + etag
        })
        .done(function() {
            alert("User removed.");
        }).fail(function() {
            alert("Saving failed.");
        });
    });

    $('#select_admin_button').click(function() {
        var user = encodeURIComponent($('#select_admin_user').val());
        var admin = $('#change_admin').is(":checked");
        console.log(admin);
        $.ajax({
            type: "POST",
            url: serverURL,
            data: "action=change-admin-user" +
                  "&user=" + user +
                  "&admin=" + admin +
                  "&etag=" + etag
        })
        .done(function() {
            alert("Admin status saved.");
        }).fail(function() {
            alert("Saving failed.");
        });
    });


    $('#new_name').val('');
    $('#new_url').val('');
}

window.onbeforeunload = confirmExit;
function confirmExit() {
    var saveOK = true;
    var saveIndicators = $("ul#myTab li i");
    $.each(saveIndicators, function(index, indicator) {
        if ($(indicator).is(':visible')) {
            saveOK = false;
        }
    });
    if (!saveOK) {
        return "There are unsaved changes! Leave anyway?";
    }
}

