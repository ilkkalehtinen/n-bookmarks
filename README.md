# nBookmarks

![bookmarks](./images/bookmarks.png)

nBookmarks is an application to maintain list of bookmarks and notes. It has been implemented with CodeIgniter 3.x (REST API), React, and Twitter Bootstrap.

## Features

- Add and modify bookmark entries by category
- Add notes
- Basic authentication
- Admin interface to manage users
- Basic optimistic locking
- Search

## Installation

CodeIgniter [installation instructions](https://codeigniter.com/userguide3/installation/index.html)

### Basic setup

1. Define database settings: `/application/config/database.php`
2. Create DB table with `/data/users.sql`
3. Set encryption key: `/application/config/config.php`, `$config['encryption_key']`
4. Build react-app: `npm install && npm run build`

### Changing base URL

1. Change `$config['base_url']` in `/application/config/config.php`
2. Change `REACT_APP_API_URL` in `/application/react-app/.env`
3. (Change default static resources location in `/application/controllers/Home.php` and package.json's `homepage` field.)

### Todo

- Drag &  drop support
- Browser compatible import/export
- .
- .
- .

## Screenshots

![](./images/edit.png)

![](./images/notes.png)

![](./images/admin.png)
