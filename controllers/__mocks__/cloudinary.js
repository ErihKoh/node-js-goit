module.exports.v2 = {
  config: () => {},
  uploader: {
    upload: (first, second, cb) => {
      cb(null, {
        public_id: 12,
        secure_url: "",
      });
    },
  },
};
