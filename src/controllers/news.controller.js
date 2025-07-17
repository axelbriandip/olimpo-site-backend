// En controllers/news.controller.js
const { News, Category } = require('../models'); // NO importar directamente desde cada model individual


// Crear una noticia
const createNews = async (req, res) => {
    try {
        const {
            title,
            content,
            image,
            published_at,
            summary,
            categoryIds,
            is_active
        } = req.body;

        const news = await News.create({
            title,
            content,
            image,
            published_at,
            summary,
            is_active
        });

        if (categoryIds && categoryIds.length > 0) {
            await news.setCategories(categoryIds); // Relación N:M
        }

        const result = await News.findByPk(news.id, {
            include: [{ model: Category, as: 'categories' }]
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('🔴 Error creating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Obtener todas las noticias
const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
            include: [{ model: Category, as: 'categories' }]
        });
        res.json(news);
    } catch (error) {
        console.error('🔴 Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Obtener una noticia por ID
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByPk(id, {
            include: [{ model: Category, as: 'categories' }]
        });

        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        res.json(news);
    } catch (error) {
        console.error('🔴 Error fetching news by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Actualizar una noticia
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            image,
            published_at,
            summary,
            categoryIds,
            is_active
        } = req.body;

        const news = await News.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        await news.update({
            title,
            content,
            image,
            published_at,
            summary,
            is_active
        });

        if (categoryIds && categoryIds.length > 0) {
            await news.setCategories(categoryIds);
        }

        const updatedNews = await News.findByPk(id, {
            include: [{ model: Category, as: 'categories' }]
        });

        res.json(updatedNews);
    } catch (error) {
        console.error('🔴 Error updating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Eliminar una noticia
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        await news.destroy();
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('🔴 Error deleting news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
};
