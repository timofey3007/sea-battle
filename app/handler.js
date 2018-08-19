exports.createHandler = function (method) {
    return new Handler(method);
};

Handler = function (method) {
    this.process = function (req, res) {
        let params = null;

        return method.apply(this, [req, res, params]);
    }
};
