const Project = require('../models/Project');
const errorHandler = require('../utils/errorHandler');


module.exports.getAll = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch(e) {
        errorHandler(res, e);
    }
};

module.exports.getByCategoryId = async (req, res) => {
    try {
        const projects = await Project.find({
            category: req.params.categoryId
        });
        res.status(200).json(projects);
    } catch(e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch(e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    const project = new Project({
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        imageSrc: req.file ? req.file.path : '',
        category: req.body.category ? req.body.category : ''
    });

    try {
        await project.save();
        res.status(201).json(project);
    } catch(e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Project.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция была удалена'
        });
    } catch(e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(project);
    } catch(e) {
        errorHandler(res, e);
    }
};