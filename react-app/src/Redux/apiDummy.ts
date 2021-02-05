export const getBookmarks = async (): Promise<any>  => {
  return Promise.resolve(
    {
      "etag": 1613116426,
      "bookmarks": [
        {
          "id": '1',
          "category": "Toolbar",
          "bookmarks": [
            {
              "id": '2',
              "name": "Google",
              "url": "http:\/\/www.google.com"
            },
          ],
          "notes": "test"
        },
        {
          "id": '3',
          "category": "Sample",
          "bookmarks": [
            {
              "id": '4',
              "name": "Googlex",
              "url": "http:\/\/www.googlex.com"
            },
          ],
          "notes": ""
        },
      ],
  });
}

export const getUser = async (): Promise<any> => {
  return Promise.resolve(
    {"id":"1","username":"admin","admin":"1"}
  )
}

export const getUsers = async (): Promise<any> => {
  return Promise.resolve([
    {"id":"1","username":"admin","admin":"1"},
    {"id":"2","username":"test","admin":"0"}
  ])
}

export const bookmarkAction = async (etag: string, data: any, action: string): Promise<any> => {
  const postData = {
    etag,
    action,
    ...data,
  }
  console.log(etag, action, postData)
}
