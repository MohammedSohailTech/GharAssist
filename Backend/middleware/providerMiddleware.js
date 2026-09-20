const providerMiddleware = (req, res, next) => {

    if (req.user.role !== "provider") {
        return res.status(401).json({
            message: "Access denied, provider only"
        });
    }

    next();
};

export default providerMiddleware;