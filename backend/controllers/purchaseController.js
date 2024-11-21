const Purchase = require('../models/purchase');

exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('proveedor', 'nombre')
      .populate('material', 'nombre codigo');

    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};
