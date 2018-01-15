###I learned a number of new things doing this project.

* body-parser will parse incoming json (and a few others) but not multipart form
  data. For that, you need multer (or another similar tool).

* to POST a form with fetch, you have to use the FormData constructor.

* multer allows you to either store files to disk or to memory. When you store
  in memory, a buffer is somehow involved.

* I'm not sure how to serve stored images on the server. One option is to keep
  them in a static folder that is served with express middleware but I don't
  think that works well with react. I believe there is a way of serving images
  with get requests but I never discovered one. It seems that using a hosting
  service like Cloudinary is preferable.

* There is a lot to learn about cloudinary. All I did was upload raw images and
  download them with a secure url.
