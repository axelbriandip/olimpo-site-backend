// src/controllers/news.controller.js
// Controlador para las operaciones CRUD de Noticias

const { News, Category } = require('../models'); // Importa el modelo News y Category

// Obtener todas las noticias activas y publicadas
const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
            where: {
                is_active: true,
                is_published: true,
            },
            include: [{
                model: Category,
                as: 'categories', // Alias definido en src/models/index.js
                attributes: ['id', 'name', 'slug'], // Atributos de la categoría que quieres incluir
                through: { attributes: [] } // No incluir los atributos de la tabla intermedia
            }],
            order: [
                ['publishedAt', 'DESC'], // Ordena las noticias por fecha de publicación descendente
                ['createdAt', 'DESC'] // Luego por fecha de creación si la publicación es la misma
            ],
        });
        res.status(200).json(news);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener noticias.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener una noticia por ID o por Slug
const getNewsByIdOrSlug = async (req, res) => {
    const identifier = req.params.id; // Puede ser ID o slug

    try {
        let news;
        if (Number.isInteger(parseInt(identifier))) {
            // Si el identificador es un número, búscalo por ID
            news = await News.findByPk(identifier, {
                where: { is_active: true, is_published: true },
                include: [{
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name', 'slug'],
                    through: { attributes: [] }
                }],
            });
        } else {
            // Si no es un número, asume que es un slug
            news = await News.findOne({
                where: {
                    slug: identifier,
                    is_active: true,
                    is_published: true
                },
                include: [{
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name', 'slug'],
                    through: { attributes: [] }
                }],
            });
        }

        if (!news || !news.is_active || !news.is_published) {
            return res.status(404).json({ message: 'Noticia no encontrada o inactiva/no publicada.' });
        }

        // Opcional: Incrementar el contador de visitas cada vez que se accede a la noticia
        // news.viewsCount = (news.viewsCount || 0) + 1;
        // await news.save();

        res.status(200).json(news);
    } catch (error) {
        console.error('Error al obtener noticia por ID o Slug:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener noticia por ID o Slug.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear una nueva noticia
const createNews = async (req, res) => {
    // Desestructura todos los campos que el modelo News ahora acepta
    const {
        title,
        subtitle,
        summary,
        content,
        featuredImageUrl,
        featuredImageAltText,
        videoUrl,
        slug,
        publishedAt,
        is_published,
        is_active,
        author,
        source,
        viewsCount,
        metaTitle,
        metaDescription,
        keywords,
        categoryIds // Array de IDs de categorías para la relación Many-to-Many
    } = req.body;

    try {
        // Genera el slug automáticamente si no se proporciona
        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        const newNews = await News.create({
            title,
            subtitle,
            summary,
            content,
            featuredImageUrl,
            featuredImageAltText,
            videoUrl,
            slug: finalSlug,
            publishedAt: publishedAt || new Date(), // Usa la fecha proporcionada o la actual
            is_published: is_published !== undefined ? is_published : true,
            is_active: is_active !== undefined ? is_active : true,
            author,
            source,
            viewsCount: viewsCount !== undefined ? viewsCount : 0,
            metaTitle,
            metaDescription,
            keywords,
        });

        // Manejar la asociación con categorías si se proporcionan categoryIds
        if (categoryIds && categoryIds.length > 0) {
            const categories = await Category.findAll({
                where: { id: categoryIds, is_active: true }
            });
            await newNews.setCategories(categories); // Establece la relación Many-to-Many
        }

        // Recarga la noticia para incluir las categorías en la respuesta
        await newNews.reload({
            include: [{
                model: Category,
                as: 'categories',
                attributes: ['id', 'name', 'slug'],
                through: { attributes: [] }
            }]
        });

        res.status(201).json(newNews); // 201 Created
    } catch (error) {
        console.error('Error al crear noticia:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El título o el slug de la noticia ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear noticia.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar una noticia existente
const updateNews = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        subtitle,
        summary,
        content,
        featuredImageUrl,
        featuredImageAltText,
        videoUrl,
        slug,
        publishedAt,
        is_published,
        is_active,
        author,
        source,
        viewsCount,
        metaTitle,
        metaDescription,
        keywords,
        categoryIds // Array de IDs de categorías para la relación Many-to-Many
    } = req.body;

    try {
        const news = await News.findByPk(id);
        if (!news) {
            return res.status(404).json({ message: 'Noticia no encontrada.' });
        }

        const updateData = {
            title,
            subtitle,
            summary,
            content,
            featuredImageUrl,
            featuredImageAltText,
            videoUrl,
            slug,
            publishedAt,
            is_published,
            is_active,
            author,
            source,
            viewsCount,
            metaTitle,
            metaDescription,
            keywords,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await news.update(updateData);

        // Manejar la actualización de asociaciones con categorías
        if (categoryIds !== undefined) { // Solo si categoryIds se proporciona en el body
            const categories = await Category.findAll({
                where: { id: categoryIds, is_active: true }
            });
            await news.setCategories(categories);
        }

        // Recarga la noticia para incluir las categorías actualizadas en la respuesta
        await news.reload({
            include: [{
                model: Category,
                as: 'categories',
                attributes: ['id', 'name', 'slug'],
                through: { attributes: [] }
            }]
        });

        res.status(200).json(news);
    } catch (error) {
        console.error('Error al actualizar noticia:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El título o el slug de la noticia ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar noticia.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de una noticia (establece is_active en false)
const softDeleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Noticia no encontrada.' });
        }
        if (!news.is_active) {
            return res.status(400).json({ message: 'La noticia ya está inactiva.' });
        }

        news.is_active = false;
        await news.save();
        res.status(200).json({ message: 'Noticia desactivada exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar noticia:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar noticia.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllNews,
    getNewsByIdOrSlug, // Cambiado para permitir búsqueda por ID o slug
    createNews,
    updateNews,
    softDeleteNews,
};