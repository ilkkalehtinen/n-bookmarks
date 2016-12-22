<?php


class Bookmark implements JsonSerializable
{
    private $id;
    private $name;
    private $url;

    public function __construct($id, $name, $url)
    {
        $this->id = $id;
        $this->name = $name;
        $this->url = $url;
    }

    public function id()
    {
        return $this->id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setURL($url) {
        $this->url = $url;
    }

    public function getName() {
        return $this->name;
    }

    public function getURL() {
        return $this->url;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url
        ];
    }
}


class Category implements JsonSerializable
{
    private $id;
    private $name;
    private $bookmarks;
    private $notes;

    public function __construct($id, $name, $notes)
    {
        $this->id = $id;
        $this->name = $name;
        $bookmarks = Array();
        $this->notes = $notes;
    }

    public function addBookmark($bookmark)
    {
        $this->bookmarks[] = $bookmark;
    }

    public function id()
    {
        return $this->id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setNotes($note) {
        $this->notes = $note;
    }

    public function &getBookmarks() {
        return $this->bookmarks;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'category' => $this->name,
            'bookmarks' => $this->bookmarks,
            'notes' => $this->notes
        ];
    }
}


class Bookmarks implements JsonSerializable
{
    private $data = Array();
    private $etag = "";

    public function readData($data, $etag="")
    {
        $this->data = Array();
        $data = json_decode($data);

        if (!$etag) {
            $this->etag = time();
        }
        else if ($etag != $data->etag) {
            show_error($data->etag);
        }
        else {
            $this->etag = time();
        }

        foreach ($data->bookmarks as $item) {
            if (!property_exists($item, 'id')) {
                $item->id = uniqid();
            }

            $notes = "";
            if (property_exists($item, 'notes')) {
                $notes = $item->notes;
            }

            $category = new Category($item->id, $item->category, $notes);

            if (!empty($item->bookmarks)) {
                foreach ($item->bookmarks as $bookmark) {
                    if (!property_exists($bookmark, 'id')) {
                        $bookmark->id = uniqid();
                    }
                    $bookmarkObj = new Bookmark(
                        $bookmark->id,
                        $bookmark->name,
                        $bookmark->url
                    );
                    $category->addBookmark($bookmarkObj);
                }
            }
            $this->data[] = $category;
        }
    }

    public function getEtag() {
        return $this->etag;
    }

    public function addCategory($data) {
        $itemID = uniqid();
        $category = new Category($itemID, $data["name"]);
        $this->data[] = $category;
        return $itemID;
    }


    public function removeCategory($data) {
        foreach ($this->data as $i => $category) {
            if ($category->id() == $data["id"]) {
                array_splice($this->data, $i, 1);
            }
        }
    }

    public function renameCategory($data) {
        foreach ($this->data as $i => $category) {
            if ($category->id() == $data["id"]) {
                $category->setName($data["name"]);
            }
        }
    }

    public function setCategoryNotes($data) {
        foreach ($this->data as $i => $category) {
            if ($category->id() == $data["id"]) {
                $category->setNotes($data["note"]);
            }
        }
    }

    public function addBookmark($data) {
        foreach ($this->data as $i => $category) {
            if ($category->id() == $data["category"]) {
                $bookmarkObj = new Bookmark(uniqid(), $data["name"],
                    $data["url"]);
                $category->addBookmark($bookmarkObj);
            }
        }
    }

    public function removeBookmark($data) {
        foreach ($this->data as $i => $category) {
            $bookmarks = &$category->getBookmarks();
            if ($bookmarks) {
                foreach ($bookmarks as $x => $bookmark) {
                    if ($bookmark->id() == $data["id"]) {
                        $bookmarkCopy = $bookmark;
                        array_splice($bookmarks, $x, 1);
                        return $bookmarkCopy;
                    }
                }
            }
        }
    }

    public function modifyBookmark($data) {
        foreach ($this->data as $i => $category) {
            $bookmarks = &$category->getBookmarks();
            if ($bookmarks) {
                foreach ($bookmarks as $x => $bookmark) {
                    if ($bookmark->id() == $data["id"]) {
                        $bookmark->setName($data["name"]);
                        $bookmark->setURL($data["url"]);
                    }
                }
            }
        }
        $this->moveBookmark($data);
    }

    public function moveBookmark($data) {
        $bookmark = $this->removeBookmark($data);
        $this->addBookmark($data);
    }

    public function getData()
    {
        return json_encode($this);
    }

    public function jsonSerialize() {
        return [
            'bookmarks' => $this->data,
            'etag' => $this->etag
        ];
    }
}


class FileStore
{
    private $filename;

    public function __construct($filename)
    {
        $this->filename = $filename;
    }

    public function readData()
    {
        return json_decode(file_get_contents($this->filename));
    }

    public function readDataPlain()
    {
        return file_get_contents($this->filename);
    }

    public function writeData($data)
    {
        file_put_contents($this->filename, $data);
    }
}

?>