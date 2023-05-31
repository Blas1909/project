import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { detalle_producto } from "../redux/actions/actions";
import { getProducto } from "../redux/dispatch/dispatch";
import Sponsors from "./Sponsors";
import { getFormData } from "./formdata.ts";
import { useMemo } from "react";

//PASAR EL ESTADO AL COMPONENTE
function mapStateToProps(state) {
  return {
    log: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    detalles: (id) => dispatch(detalle_producto(id)),
    cargar_productos: () => getProducto(dispatch),
  };
}

function Tienda(props) {
  
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const productos = useMemo(
    () => props.log.login.productos,
     [props.log.login.productos]
   );
   
   
   const handleImageUpload = (e) => {
     const [file] = e.target.files;
     setFormFile(file);
     if (file) {
       const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  //VARIABLES PARA EL FILTRO
  const [minPr, setMinPr] = useState(0);
  const [maxPr, setMaxPr] = useState(0);
  //VARIABLES PARA EL FILTRO CHECKBOX

  useEffect(() => {
    props.cargar_productos();
  }, []); // eslint-disable-line 




  function deleteProducto(id) {
    //confirmacion para eliminar un producto
    if (window.confirm("¿Desea eliminar este producto?")) {
      fetch(`${process.env.REACT_APP_API_URL}/producto/${id}`, {
        method: "DELETE",
      }).then((result) => {
        result.text().then((resp) => {
          props.cargar_productos();
        });
      });
    }
  }

  function selectProducto(id) {
    let producto = productos.find(producto => producto.id === id);
    setId(producto.id);
    setMarca(producto.marca);
    setModelo(producto.modelo);
    setDescripcion(producto.descripcion);
    setTipo(producto.tipo);
    setPrecio(producto.precio);
    setStock(producto.stock);
  }

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [nId, setId] = useState(1);
  const [stock, setStock] = useState(0);
  const [FormFile, setFormFile] = useState("");
  const [filtersBrand, setFiltersBrand] = useState([]);
  const [filtersType, setFiltersType] = useState([]);


  function editProducto(e) {
    const producto_editado = {
      Marca: marca,
      Modelo: modelo,
      Tipo: tipo,
      Descripcion: descripcion,
      Precio: precio,
      Stock: stock
    }
    fetch(`${process.env.REACT_APP_API_URL}/producto/${nId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto_editado),
    }).then(() => {
      props.cargar_productos();
    }).catch((e)=>{console.log(e)});
  }

  useEffect(()=>{
    if(productos.length){
      const maxPrProductos = Math.max(...productos.map(prod=>parseFloat(prod.precio)))
      const minPrProductos = Math.min(...productos.map(prod=>parseFloat(prod.precio)))
      setMinPr(minPrProductos)
      setMaxPr(maxPrProductos)
    }
  }, [productos])

  const toggleFilterBrand = (brand) => {
    if (filtersBrand.includes(brand)) {
      return setFiltersBrand(filtersBrand.filter((filter) => filter !== brand));
    }
    setFiltersBrand([...filtersBrand, brand]);
  };
  const toggleFilterType = (type) => {
    if (filtersType.includes(type)) {
      return setFiltersType(filtersType.filter((filter) => filter !== type));
    }
    setFiltersType([...filtersType, type]);
  };
  const filterProduct = (producto) => {
    if (filtersType.length) {
      if (!filtersType.includes(producto.tipo)) {
        return "d-none";
      }
    }
    if (filtersBrand.length) {
      if (!filtersBrand.includes(producto.marca)) {
        return "d-none";
      }
    }
    if (minPr.length !== 0) {
      if (minPr > producto.precio) {
        return "d-none";
      }
    }
    if (maxPr.length !== 0) {
      if (maxPr < producto.precio) {
        return "d-none";
      }
    }
    return "";
  };

  const postProducto = (e) => {
    const producto = {
      marca,
      modelo,
      descripcion,
      tipo,
      precio: parseFloat(precio),
      stock,
      FormFile,
    };
    const x = getFormData(producto);
    if (
      marca === "" ||
      modelo === "" ||
      descripcion === "" ||
      tipo === "" ||
      precio === 0 ||
      stock === 0 ||
      FormFile === ""
    ) {
    } else {
      fetch(process.env.REACT_APP_API_URL+"/producto", {
        method: "POST",
        body: x,
      }).then(() => {
        props.cargar_productos();
      });
    }
  };


  const clearForm= () => {
    setMarca("");
    setModelo("");
    setDescripcion("");
    setPrecio(0);
    setStock(0);
    setFormFile("");
    uploadedImage.current.removeAttribute("src");
  }

  const form_prod = document.getElementById("form_producto");
  const handleSubmit = async (e) => {
    e.preventDefault();
    form_prod.reset();
    clearForm();
  };

  return (
    <div className="container-xl">
      {/* contenedor de filtros, productos y publicidad */}
      <div className="row m-0 p-0">
        {/* Filtros */}
        <div className="col-12 col-lg-3 col-xl-2">
          <div className="row">
            <div className="col-12 col-sm-4 col-lg-12 bg-light border rounded-3 g-2 p-2">
              <h5>Tipo de producto</h5>
              {productos.length &&
                productos
                  .map((producto) => producto.tipo)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((tipo, i) => (
                    <>
                      <input
                        key={`item-tipo-${i}`}
                        type="checkbox"
                        className="me-2"
                        onChange={(evt) => toggleFilterType(evt.target.value)}
                        value={tipo}
                        id={`tipo-${tipo}`}
                      />
                      {tipo}
                      <br />
                    </>
                  ))}
            </div>
            <div className="col-12 col-sm-4 col-lg-12 bg-light border rounded-3 g-2 p-2">
              <h5>Marca</h5>
              {productos.length &&
                productos
                  .map((producto) => producto.marca)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((marca, i) => (
                    <>
                      <input
                        key={`marca-item-${i}`}
                        type="checkbox"
                        className="me-2"
                        onChange={(evt) => toggleFilterBrand(evt.target.value)}
                        value={marca}
                        id={`marca-${marca}`}
                      />
                      {marca}
                      <br />
                    </>
                  ))}
            </div>
            <div className="col-12 col-sm-4 col-lg-12 bg-light border rounded-3 g-2 p-2">
              <h5>
                Precio <span className="text-secondary">(EUR)</span>
              </h5>
              <div className="row">
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control"
                    id="min2"
                    placeholder="Min"
                    step=".01"
                    value={minPr}
                    onChange={(e) => setMinPr(e.target.value)}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control"
                    id="max2"
                    step=".01"
                    placeholder="Max"
                    value={maxPr}
                    onChange={(e) => setMaxPr(e.target.value)}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-lg-12 d-grid gap-2 p-2">
              <button className="btn btn-primary" type="button">
                Filtrar
              </button>
            </div>
          </div>
        </div>
        {/* FINAL DE LOS FILTROS */}

        {/* INICIO DE FORM PARA AÑADIR/EDITAR PRODUCTOS */}

        <div className="tienda col-lg-9 col-xl-8">
          {props.log.login.isAdmin ? (
            <div>
              <h2>Añadir un producto</h2>
              <form id="form_producto" onSubmit={(e) => handleSubmit(e)}>
                <label className="form-text">Marca</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />

                <label className="form-text">Modelo</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />

                <label className="form-text">Descripcion</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />

                <label className="form-text">Tipo de producto</label>
                <br />
                <select
                  name="select_tipo"
                  id="select_tipo"
                  required
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecciona una opcion</option>
                  <option value="Accesorio">Accesorio</option>
                  <option value="Suplemento">Suplemento</option>
                </select>
                <br />

                <label className="form-text">Precio</label>
                <input
                  className="form-control"
                  type="number"
                  required
                  value={precio}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  min={1}
                  step="any"
                  onChange={(e) => setPrecio(e.target.value)}
                />

                <label className="form-text">stock</label>
                <input
                  className="form-control"
                  type="number"
                  required
                  value={stock}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  min="1"
                  onChange={(e) => setStock(e.target.value)}
                />

                <label className="form-text">
                  Insertar imagen del producto
                </label>
                <input
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={handleImageUpload}
                  ref={imageUploader}
                  multiple={false}
                  alt=""
                  className="d-none"
                />
                <div
                  style={{
                    height: "130px",
                    width: "130px",
                    border: "2px dashed black",
                  }}
                  onClick={() => imageUploader.current.click()}
                >
                  <img
                    alt=""
                    ref={uploadedImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  onClick={() => postProducto(productos.id)}
                >
                  Añadir producto
                </button>

                <button
                  className="btn btn-success mt-3 mx-2"
                  onClick={() => editProducto()}
                >
                  Modificar producto
                </button>
              </form>
            </div>
          ) : (
            ""
          )}

          {/* FINAL DE FORM AÑADIR/EDITAR PRODUCTOS */}

          {/* TARJETAS */}
          <div className="col-12 m-2">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 p-0">
              {productos.map((producto) => (
                <div
                  className={`col mb-1 ${filterProduct(producto)}`}
                  key={producto.id}
                >
                  <div className="card">
                      <div className="col-4 col-md-12 w-100">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/file?imageUrl=${producto.fileName}`} //modificar la imagen segun el producto, ahora mismo es estatica
                          className="card-img-top"
                          alt="imagen del producto"
                        ></img>
                      </div>
                      <div className="col-8 col-md-12">
                        <div className="card-body">
                          <h4 className="card-title">{producto.marca}</h4>
                          <p className="card-text">
                            {producto.marca} {producto.modelo}
                          </p>
                          <p className="card-text">{producto.descripcion}</p>
                          <p className="card-text">
                            ¡Quedan {producto.stock} en stock!
                          </p>

                          <p className="card-text">{producto.precio} €</p>


                          <div className="d-flex justify-content-between row">
                            <div className="col-4">
                              <Link to={"/productodetail"}>
                                <button
                                  onClick={() => props.detalles(producto.id)}
                                  className="btn btn-success btn-sm btn_card"
                                >
                                  Comprar
                                </button>
                              </Link>
                            </div>
                            {props.log.login.isAdmin ? (
                              <div className="col-4">
                                <button
                                  className="btn btn-danger btn-sm btn_card"
                                  onClick={() => deleteProducto(producto.id)}
                                >
                                  ¡Eliminar!
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                            {props.log.login.isAdmin ? (
                              <div className="col-4">
                                <button
                                  className="btn btn-secondary btn-sm btn_card"
                                  onClick={() => selectProducto(producto.id)}
                                >
                                  Editar
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Sponsors />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tienda);
