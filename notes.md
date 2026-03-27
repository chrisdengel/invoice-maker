
npm init -y
npm install express ejs
in package.json -> 
"scripts":{
    "start": "node app",
    "dev": "node --watch app"
}


To do:
text and input for business name

------------------------


let invoices = [
    {id: 1, 
        description: '',
        // timeIn: ,
        // timeOut: 8,
    }
   
];

// @desc Get all invoices
// @route GET /api/invoices

export const getinvoices = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
       return res.status(200).json(invoices.slice(0, limit));
    }

       return res.status(200).json(invoices);
};

//@desc Get single invoice
// @route GET /api/invoices/:id 

export const getInvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);

    if (!invoice) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 

        res.status(200).json(invoice);
}

//@desc  Create new invoice
// @route invoice /api/invoices 

export const createinvoice = (req, res, next) => {
    const newInvoice = {
        id: invoices.length + 1,
        description: req.body.description,
    };

if (!newInvoice.description) {
    const error = new Error(`Please include a description`);
    error.status = 400;
    return next(error);
}

    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
}


// @desc Update invoice
//@route PUT /api/invoice/:id
export const updateInvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);

    if (!invoice) {
            const error = new Error(`An invoice with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        } 
        if (!req.body.description) {
            const error = new Error('Please include a description');
            error.status = 400;
            return next(error);
        }
        
        invoice.description = req.body.description;
    invoice.description = req.body.description;
    res.status(200).json(invoices);
}

// @desc  Delete invoice
//@route DELETE /api/invoice/:id
export const deleteinvoice = (req, res, next) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find((invoice) => invoice.id === id);
    
    if (!invoice) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 
    
    invoices = invoices.filter((invoice) => invoice.id !== id);
     res.status(200).json(invoices);

-----------------------------------
let posts = [
    {id: 1, 
        description: '',
        // timeIn: ,
        // timeOut: 8,
    }
   
];

// @desc Get all posts
// @route GET /api/posts

export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
       return res.status(200).json(posts.slice(0, limit));
    }

       return res.status(200).json(posts);
};

//@desc Get single post
// @route GET /api/posts/:id 

export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 

        res.status(200).json(post);
}

//@desc  Create new post
// @route POST /api/posts 

export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        description: req.body.description,
    };

if (!newPost.description) {
    const error = new Error(`Please include a description`);
    error.status = 400;
    return next(error);
}

    posts.push(newPost);
    res.status(201).json(newPost);
}


// @desc Update post
//@route PUT /api/post/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
            const error = new Error(`An invoice with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        } 
        if (!req.body.description) {
            const error = new Error('Please include a description');
            error.status = 400;
            return next(error);
        }
        
        post.description = req.body.description;
    post.description = req.body.description;
    res.status(200).json(posts);
}

// @desc  Delete post
//@route DELETE /api/post/:id
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    
    if (!post) {
        const error = new Error(`An invoice with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    } 
    
    posts = posts.filter((post) => post.id !== id);
     res.status(200).json(posts);
}