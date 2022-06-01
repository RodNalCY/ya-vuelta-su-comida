<!DOCTYPE html>
<html lang="es">

<head>
  <!-- Required meta tags -->
  <title>Ya vuelta, su comida</title>
  <link rel="icon" href="https://diariolaregion.com/web/wp-content/uploads/2021/06/Juane.jpg" type="image/x-icon">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/style-general.css" />
  <link rel="stylesheet" href="css/animate.min.css" />



  <script src="js/bootstrap.bundle.min.js"> </script>
  <script src="js/jquery-3.6.0.min.js"></script>
  <script src="js/script-general.js"></script>
  <script src="js/fontawesome.js"></script>
  <script src="js/sweetalert2.all.min.js"></script>

</head>

<body>

  <!-- <div class="audio-content ">
    <audio controls class="audio-properties" id="audio-properties">
      <source src="audio/musica-selva.mp3" type="audio/mpeg">
      Tu navegador no es compatible con el audio.
    </audio>
  </div> -->

  <div class="card-invite">
    <div class="imgBox">
      <img src="img/el-juane.jpg" alt="El juane">
    </div>
    <div class="details">
      <div class="title text-center">
        <h3>¡ SABROSOON FOOD ! </h3>
        <center><small class="txt-font-contenido">"De la selva sus delicias"</small></center>
      </div>
      <div class="description">
        <h4>Descripción</h4>
        <p class="txt-font-contenido">Sirvase a degustar nuestras delicias regionales, el juane uno de los muchos patajes dentro de nuestra amazonia, al alcance de su paladar. Reserve su pedido en nuestra web de forma segura y disfrute en familia.</p>
      </div>
      <div class="types">
        <h4>Precios</h4>
        <ul>
          <li><button type="button" class="btn btn-outline-light btn-border" id="m_economico">Económico</button></li>
          <li><button type="button" class="btn btn-outline-light btn-border" id="m_light">Light</button></li>
          <li><button type="button" class="btn btn-outline-light btn-border" id="m_ejecutivo">Ejecutivo</button></li>
        </ul>

      </div>
      <div class="buy">
        <div class="price">

        </div>
        <button type="button" id="btnReservar" class="btn btn-warning animate__animated animate__pulse animate__infinite" style="color: #fff; font-weight: 200; font-size: 1.3em;">Reservar</button>

      </div>
    </div>
  </div>



  <!-- Modal Formilario-->
  <div class="modal fade" id="mdRegistroCompra" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <form method="post">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <center> Ya vuelta, reservar el juane ! </center>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <img src="img/el-juane-form.jpg" class="img-compra" alt="El juenecito">
            </div>
            <div class="row mb-3 mt-2 text-center content-price-selected">

            </div>
            <div class="row mb-3">
              <div class="col-md-6 col-sm-12">
                <label for="txtNombre" class="form-label">Nombre (s)</label>
                <input type="text" class="form-control" id="txtNombre" aria-describedby="nameHelp" required placeholder="Nombres y Apellidos">
                <div id="emailHelp" class="form-text">Ingrese su nombre completo.</div>
              </div>
              <div class="col-md-6 col-sm-12">
                <label for="txtCelular" class="form-label">Celular</label>
                <input type="number" class="form-control" id="txtCelular" aria-describedby="phoneHelp" maxlength="9" required placeholder="999 999 999">
                <div id="emailHelp" class="form-text">Ingrese su numero de celular.</div>
              </div>
            </div>

            <div class="row g-2 align-items-center">
              <div class="col-auto">
                <label for="txtEmail" class="form-label">Email</label>
              </div>
              <div class="col-auto">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="swExistCorreo">
                  <label class="form-check-label form-text" for="swExistCorreo">&#10140; Si no tienes marca la casilla</label>
                </div>
              </div>
              <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" required placeholder="email@gmail.com">
              <div id="emailHelp" class="form-text">Ingrese su correo para enviar su recibo de compra.</div>
              <div class="col-md-12 mt-4" id="spinnerLoadCorreo" style="display: none;">
                <div class="d-flex justify-content-center">
                  <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>




            <div class="mb-3">
              <label for="txtDireccion" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="txtDireccion" aria-describedby="placeHelp" required placeholder="Mi dirección actual">
              <div id="emailHelp" class="form-text">Ingrese su dirección para enviar su pedido.</div>
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" id="btnContinuar" class="btn btn-warning btn-lg animate__animated animate__pulse animate__infinite" style="color:#fff;"><i class="fa-solid fa-angle-right"></i> Continuar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Pagar-->
  <div class="modal fade" id="mdSelectMetodoPago" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <center> Ya vuelta, método de pago ! </center>
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">

            <div class="col-md-4">
              <div class="col-sm-12">
                <div class="text-center">
                  <a id="mpPlin"> <img src="img/plin.png" class="img-metodo-pago" alt="Plin"></a>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="col-sm-12">
                <div class="text-center">
                  <a id="mpYape"> <img src="img/yape.png" class="img-metodo-pago" alt="Yape"></a>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="col-sm-12">
                <div class="text-center">
                  <a id="mpContraEntrega"> <img src="img/contra-entrega.png" class="img-metodo-pago" alt="Contra Entrega"></a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" id="btnIrAtrasFormulario" class="btn btn-danger btn-lg animate__animated animate__pulse animate__infinite" style="color:#fff;"><i class="fa-solid fa-angle-left"></i> atrás</button>

          <!-- <button type="button" id="btnFinalizarCompra" class="btn btn-warning btn-lg animate__animated animate__pulse animate__infinite" style="color:#fff;"><i class="fa-solid fa-check"></i> Finalizar</button> -->
        </div>
      </div>
    </div>
  </div>


  <!-- Modal QR-->
  <div class="modal fade" id="mdQRPago" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <center> Ya vuelta, método de pago ! </center>
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="txt-contenido">
                <p class="txt-mensaje" id="txt-medio"></p>
              </div>
              <!-- <div class="mb-3" id="contentfileVoucher">
                <label for="fileVoucher" class="form-label txt-mensaje">Subir Voucher :</label>
                <input class="form-control form-control-sm" id="fileVoucher" type="file" accept="image/png,image/jpeg,image/jpg">
              </div> -->
              <div class="mb-3" id="contentVuelto">
                <div class="input-group">
                  <span class="input-group-text">S/</span>
                  <input type="number" class="form-control" id="txtMontoIngresado" placeholder="Ingresar monto">
                  <input type="number" class="form-control" id="txtMontoVuelto" placeholder="Su vuelto" disabled>
                </div>
              </div>
              <div class="text-center">
                <img src="" class="img-qr-pago" id="img-qr-pago" alt="QR">
              </div>
            </div>
            <div class="col-md-12 mt-4" id="spinnerLoadFinalizar" style="display: none;">
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-warning spinnerFinalizar" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="btnIrAtras" class="btn btn-danger btn-lg" style="color:#fff;"><i class="fa-solid fa-angle-left"></i> atrás</button>

          <button type="button" id="btnFinalizarCompra" class="btn btn-warning btn-lg animate__animated animate__pulse animate__infinite" style="color:#fff;"><i class="fa-solid fa-paper-plane"></i> Finalizar</button>
        </div>
      </div>
    </div>
  </div>



  <link rel="stylesheet" href="js/popper.min.js" />
  <link rel="stylesheet" href="js/bootstrap.min.js" />

</body>

</html>