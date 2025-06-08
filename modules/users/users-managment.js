
app.put("/updatePassword/:email/:password", async (req, res) => {
  const password = req.params.password;
  const email = req.params.email;
  const query = "UPDATE usuarios SET contraseña =? WHERE correo = ?";

  try {
    const [results] = await pool.query(query, [password, email]);
    res.status(201).json({ message: `Usuario actualizado con exito` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al agregar nuevo usuario: ${error.message}` });
  }
});

app.get("/getUserInfo/:id_usuario", async (req, res) => {
  const userId = req.params.id_usuario;
  const query = "SELECT * FROM usuarios WHERE id_usuario = ?";

  try {
    const [results] = await pool.query(query, [userId]);
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).send("Error al obtener el carrito: " + error.message);
  }
});

app.post("/newProduct", async (req, res) => {
  const { name, category, image, qty, price } = req.body;
  const description = "";
  const query =
    "INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, imagen_url) VALUES (?, ?,?,?,?,?)";

  try {
    const [results] = await pool.query(query, [
      name,
      description,
      price,
      qty,
      category,
      image,
    ]);
    res
      .status(201)
      .json({
        message: `Producto agregado: ${results.insertId}`,
        productId: results.insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al agregar nuevo producto: ${error.message}` });
  }
});
