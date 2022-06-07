var r_price_selected = 0;

var r_global_nombre = "";

var r_global_celular = "";

var r_global_email = "";

var r_global_direccion = "";



var r_global_medio_pago_plin = "";

var r_global_medio_pago_yape = "";

var r_global_medio_pago_contra_entrega = "";



var r_global_monto_ingresado = 0;

var r_global_monto_vuelto = 0;



var r_user_has_email = true;

var r_global_ticket = 0;

var r_global_cantidad = 0;
var r_global_precio_x_cantidad = 0;


$(document).ready(function () {

  r_price_selected = 0;



  r_global_nombre = "";

  r_global_celular = "";

  r_global_email = "";

  r_global_direccion = "";



  r_global_medio_pago_plin = "";

  r_global_medio_pago_yape = "";

  r_global_medio_pago_contra_entrega = "";



  r_global_monto_ingresado = 0;

  r_global_monto_vuelto = 0;



  $(".price").html("<sup>S/ </sup><span>0.<small>00</small></span>");

  $(".content-price-selected").html(

    "<h2 style='color: #fff;'> <sup>S/ </sup><span>0.<small>00</small></span> </h2>"

  );



  $("#btnReservar").prop("disabled", true);

  // $("#mdSelectMetodoPago").modal("show");

  // $('.audio-properties')[0].play();



  // SELECCIONAR PRECIO

  $("#m_economico").click(function () {

    console.log("Economico");

    $("#btnReservar").prop("disabled", false);

    r_price_selected = 17.00;

    $(".price").html("<sup>S/ </sup><span>17.<small>00</small></span>");

    $(".content-price-selected").html(

      "<h2 class='txt-price-selected'> <sup>S/ </sup><span>17.<small>00</small></span> </h2>"+
      "<p class='txt-incluye'>Incluye: Juane + Refresco de Cocona + Maduro Frito </p>"

    );

  });



  $("#m_light").click(function () {

    console.log("Ligh");

    $("#btnReservar").prop("disabled", false);

    r_price_selected = 20;

    $(".price").html("<sup>S/ </sup><span>20.<small>00</small></span>");

    $(".content-price-selected").html(

      "<h2 class='txt-price-selected'> <sup>S/ </sup><span>20.<small>00</small></span> </h2>"

    );

  });



  $("#m_ejecutivo").click(function () {

    console.log("Ejecutivo");

    $("#btnReservar").prop("disabled", false);

    r_price_selected = 20.00;

    $(".price").html("<sup>S/ </sup><span>20.<small>00</small></span>");

    $(".content-price-selected").html(

      "<h2 class='txt-price-selected'> <sup>S/ </sup><span>20.<small>00</small></span> </h2>"+
      "<p class='txt-incluye'>Incluye: Juane + Refresco de Cocona + Maduro Frito + Patacones + Cecina </p>"

    );

  });



  // MODAL RESERVAR

  $("#btnReservar").click(function () {

    $("#mdRegistroCompra").modal("show");
    $("#txtCantidad").val(1)
    r_global_cantidad = 1;
    r_global_precio_x_cantidad = r_price_selected;

    // console.log("content-price-selected: ", r_price_selected);

  });



  $("#btnContinuar").click(function () {

    r_global_nombre = $("#txtNombre").val();

    r_global_celular = $("#txtCelular").val();

    r_global_email = $("#txtEmail").val();

    r_global_direccion = $("#txtDireccion").val();



    var parametros = {

      email: r_global_email,

    };



    if (r_global_nombre == "") {

      // console.log("Ingrese su nombre.");

      Swal.fire({

        icon: "warning",

        title: "Advertencia !",

        text: "Ingrese su nombre correctamente!",

        showConfirmButton: false,

        timer: 2000,

      });

    } else if (r_global_celular == "") {

      // console.log("Ingrese su celular.");

      Swal.fire({

        icon: "warning",

        title: "Advertencia !",

        text: "Ingrese su celular correctamente!",

        showConfirmButton: false,

        timer: 2000,

      });

    } else if (r_global_email == "" && r_user_has_email == true) {

      // console.log("Ingrese su email.");

      Swal.fire({

        icon: "warning",

        title: "Advertencia !",

        text: "Ingrese su email correctamente!",

        showConfirmButton: false,

        timer: 2000,

      });

    } else if (r_global_direccion == "") {

      // console.log("Ingrese su direccion.");

      Swal.fire({

        icon: "warning",

        title: "Advertencia!",

        text: "Ingrese su dirección correctamente!",

        showConfirmButton: false,

        timer: 2000,

      });

    } else {

      // VALIDAR SI EL USUARIO TIENE CORREO

      if (r_user_has_email) {

        $.ajax({

          type: "POST",

          // url: "/services/post-email.php",

          url: "https://verificar-email.leoncioprado.com/",

          data: parametros,

          beforeSend: function (data) {

            $("#spinnerLoadCorreo").css("display", "block");

            $("#btnContinuar").prop("disabled", true);

          },

          complete: function (data) {},

          success: function (datos) {

            $("#spinnerLoadCorreo").css("display", "none");

            var result = JSON.parse(datos);

            // console.log("email verificado > ", result);

            if (result.validated) {

              Swal.fire({

                icon: "success",

                title: "Correcto !",

                text: "Datos verificados correctamente !",

                showConfirmButton: false,

                timer: 2500,

              });

              $("#btnContinuar").prop("disabled", false);



              $("#mdRegistroCompra").modal("hide");

              $("#mdSelectMetodoPago").modal("show");

            } else {

              Swal.fire({

                icon: "error",

                title: "Error !",

                text: "Email no existe !",

                showConfirmButton: false,

                timer: 2500,

              });

              $("#btnContinuar").prop("disabled", false);

            }

          },

          error: function (data) {

            console.log("Error:", data);

          },

        });

      } else {

        Swal.fire({

          icon: "success",

          title: "Correcto !",

          text: "Datos verificados correctamente !",

          showConfirmButton: false,

          timer: 2000,

        });

        $("#mdRegistroCompra").modal("hide");

        $("#mdSelectMetodoPago").modal("show");

      }

    }

  });



  // VALIDAR INPUT DE CELULAR

  $("input#txtCelular").keypress(function (event) {

    if (event.which < 48 || event.which > 57 || this.value.length === 9) {

      return false;

    }

  });

  $("input#txtCantidad").keypress(function (event) {

    if (event.which < 48 || event.which > 57 || this.value.length === 9) {

      return false;

    }

  });

  // $("#txtCantidad").keyup(function (e) {
  //   r_global_cantidad = $(this).val();
    
    
  //   setInterval(
  //     () => (r_global_cantidad = $("#txtCantidad").val()),
  //     1500
  //   );
  //   // console.log("cantidad",r_global_cantidad);
  //   calcularCantidadPedidos(r_global_cantidad);
  // });

  
  
  $("#txtCantidad").change(function () {
    r_global_cantidad = $("#txtCantidad").val()
    // console.log("Cantidad",r_global_cantidad);
    calcularCantidadPedidos(r_global_cantidad);
  });


  function calcularCantidadPedidos(valor){
    if(valor < 0){
      $("#txtCantidad").val(1)
      r_global_cantidad = 1;
      r_global_precio_x_cantidad = r_price_selected * r_global_cantidad;
      $(".content-price-selected").html("<h2 class='txt-price-selected'> <sup>S/ </sup><span>"+r_global_precio_x_cantidad+"<small>.00</small></span> </h2>");
      
      // console.log("Cantidad",r_global_cantidad);
      // console.log("Total",r_global_precio_x_cantidad);

      

    }else if(valor >= 1 && valor <= 5){
      
      r_global_precio_x_cantidad = r_price_selected * r_global_cantidad;
      $(".content-price-selected").html("<h2 class='txt-price-selected'> <sup>S/ </sup><span>"+r_global_precio_x_cantidad+"<small>.00</small></span> </h2>");
    
      // console.log("Cantidad",r_global_cantidad);
      // console.log("Total",r_global_precio_x_cantidad);
      
    }else{
      $("#txtCantidad").val(1)
      r_global_cantidad = 1;
      r_global_precio_x_cantidad = r_price_selected;
      $(".content-price-selected").html("<h2 class='txt-price-selected'> <sup>S/ </sup><span>"+r_global_precio_x_cantidad+"<small>.00</small></span> </h2>");
    }
  }

  $("#mpPlin").click(function () {

    // console.log("Plin");

    $("#mdSelectMetodoPago").modal("hide");

    $("#mdQRPago").modal("show");

    $("#txt-medio").html(

      "<span>Saludos ! Usted eligió pagar con PLIN. El detalle de su compra es: <br> Precio: S/ " +

        r_price_selected +

        ".00 <br>Cantidad: "+r_global_cantidad+" <br> Total S/ : "+r_global_precio_x_cantidad+".00</span>"

    );

    

    $("#img-qr-pago").attr("src", "img/qr-plin.jpeg");

    // $("#contentfileVoucher").css("display", "block");

    $("#phone_number").css("display", "block");

    $("#contentVuelto").css("display", "none");



    r_global_medio_pago_plin = "PLIN";

    r_global_medio_pago_yape = "";

    r_global_medio_pago_contra_entrega = "";

    console.log("PLIN:" + r_global_medio_pago_plin);

    console.log("YAPE:" + r_global_medio_pago_yape);

    console.log("CONTRA ENTREGA:" + r_global_medio_pago_contra_entrega);

  });



  $("#mpYape").click(function () {

    // console.log("Yape");

    $("#mdSelectMetodoPago").modal("hide");

    $("#mdQRPago").modal("show");

    $("#txt-medio").html(

      "<span>Saludos ! Usted eligio pagar con YAPE. El detalle de su compra es: <br> Precio: S/ " +

        r_price_selected +

        ".00<br>Cantidad: "+r_global_cantidad+" <br> Total S/: "+r_global_precio_x_cantidad+".00</span>"

    );

    $("#img-qr-pago").attr("src", "img/qr-yape.jpeg");

    // $("#contentfileVoucher").css("display", "block");

    $("#phone_number").css("display", "block");

    $("#contentVuelto").css("display", "none");



    r_global_medio_pago_plin = "";

    r_global_medio_pago_yape = "YAPE";

    r_global_medio_pago_contra_entrega = "";

    console.log("PLIN:" + r_global_medio_pago_plin);

    console.log("YAPE:" + r_global_medio_pago_yape);

    console.log("CONTRA ENTREGA:" + r_global_medio_pago_contra_entrega);

  });



  $("#mpContraEntrega").click(function () {

    // console.log("Contra Entrega");

    $("#mdSelectMetodoPago").modal("hide");

    $("#mdQRPago").modal("show");

    $("#txt-medio").html(

      "<span>Saludos ! Usted eligio pagar con efectivo. Ingrese el monto a pagar para llevar su vuelto. El detalle de su compra es:<br> Precio: S/ " +

        r_price_selected +

        ".00 <br>Cantidad: "+r_global_cantidad+" <br> Total S/: "+r_global_precio_x_cantidad+".00</span>"

    );

    $("#img-qr-pago").attr("src", "img/contra-entrega.png");

    // $("#contentfileVoucher").css("display", "none");

    $("#phone_number").css("display", "none");

    $("#contentVuelto").css("display", "block");



    r_global_medio_pago_plin = "";

    r_global_medio_pago_yape = "";

    r_global_medio_pago_contra_entrega = "EFECTIVO";

    console.log("PLIN:" + r_global_medio_pago_plin);

    console.log("YAPE:" + r_global_medio_pago_yape);

    console.log("CONTRA ENTREGA:" + r_global_medio_pago_contra_entrega);

  });

  

  

  /** BOTON PARA CALCULAR EL VUELTO */

  $("#txtMontoIngresado").keyup(function (e) {

    // r_price_selected = 15;

    // r_global_monto_ingresado = $(this).val();



    // console.log("PS > ", r_price_selected);

    // console.log("MI > ", r_global_monto_ingresado);

    // console.log(r_global_monto_vuelto);



    r_global_monto_ingresado = $(this).val();

    setInterval(

      () => (r_global_monto_ingresado = $("#txtMontoIngresado").val()),

      1500

    );



    r_global_monto_vuelto = (

      r_global_monto_ingresado - r_global_precio_x_cantidad

    ).toFixed(2);



    if (r_global_monto_ingresado <= 0 || r_global_monto_ingresado == "" ) {

      $("#txtMontoVuelto").val("0.00");
      $("#txtMontoIngresado").val("");

    } else if (

      r_global_monto_ingresado < r_global_precio_x_cantidad ||

      r_global_monto_ingresado == r_global_precio_x_cantidad

    ) {

      $("#txtMontoVuelto").val("0.00");

    } else {

      $("#txtMontoVuelto").val(r_global_monto_vuelto);

    }

  });



  $("#btnIrAtras").click(function () {

    $("#mdSelectMetodoPago").modal("show");

    $("#mdQRPago").modal("hide");

  });



  $("#btnIrAtrasFormulario").click(function () {

    $("#mdRegistroCompra").modal("show");

    $("#mdSelectMetodoPago").modal("hide");

  });



  $("#swExistCorreo").on("click", function () {

    if ($(this).is(":checked")) {

      r_user_has_email = false;

      $("#txtEmail").val("");

      $("#txtEmail").prop("disabled", true);

    } else {

      r_user_has_email = true;

      $("#txtEmail").prop("disabled", false);

    }

    // console.log("Has Email > ", r_user_has_email);

  });



  $("#btnFinalizarCompra").click(function () {

    $("#spinnerLoadFinalizar").css("display", "block");

    $("#btnFinalizarCompra").prop("disabled", true);

    // console.log("/////////////////////////////////////////////");

    // console.log("NOMBRES Y APELLIDOS:" + r_global_nombre);

    // console.log("CELULAR:" + r_global_celular);

    // console.log("TIENE EMAIL: " + r_user_has_email);

    // console.log("EMAIL: " + r_global_email);

    // console.log("DIRECCION:" + r_global_direccion);



    // console.log("PLIN:" + r_global_medio_pago_plin);

    // console.log("YAPE:" + r_global_medio_pago_yape);

    // console.log("CONTRA ENTREGA:" + r_global_medio_pago_contra_entrega);



    // console.log("PRECIO SELECCIONADO:" + r_price_selected);

    // console.log("MONTO INGRESADO:" + r_global_monto_ingresado);

    // console.log("MONTO VUELTO:" + r_global_monto_vuelto);

    // console.log("/////////////////////////////////////////////");



    var r_parametros_sql = {

      r_name_lastname: r_global_nombre,

      r_phone: r_global_celular,

      r_email: r_global_email,

      r_place: r_global_direccion,

      r_medio_plin: r_global_medio_pago_plin,

      r_medio_yape: r_global_medio_pago_yape,

      r_medio_efectivo: r_global_medio_pago_contra_entrega,

      r_product_price: r_price_selected,

      r_monto_ingresado: r_global_monto_ingresado,

      r_monto_vuelto: r_global_monto_vuelto,

      r_cantidad: r_global_cantidad,
      
      r_precio_x_cantidad: r_global_precio_x_cantidad

    };





    $.ajax({

      type: "POST",

      url: "/services/PHP_HTTP/insert.php",

      data: r_parametros_sql,

      success: function (datos) {

        var result = JSON.parse(datos);

        console.log("Rs> ", result);

        if (result["status"]) {

          r_global_ticket = result["ticket"];

          console.log("ticket> ", r_global_ticket);



          var link_error =

            '<a target="_blank" style="text-decoration: underline;color: #595959;" href="https://api.whatsapp.com/send?phone=+51925662591&text=Saludos!%20quiero%20resportar%20una%20falla%20en%20la%20reserva!%20mi%20Ticket%20es:%20X-' +

            r_global_ticket +

            '">Comuniquese con nosotros por este enlace o al +(51) 912 101 970</a>';

          var r_parametros_email = {

            r_name_lastname: r_global_nombre,

            r_phone: r_global_celular,

            r_email: r_global_email,

            r_place: r_global_direccion,

            r_medio_plin: r_global_medio_pago_plin,

            r_medio_yape: r_global_medio_pago_yape,

            r_medio_efectivo: r_global_medio_pago_contra_entrega,

            r_product_price: r_price_selected,

            r_monto_ingresado: r_global_monto_ingresado,

            r_monto_vuelto: r_global_monto_vuelto,

            r_ticket: r_global_ticket,

            r_cantidad: r_global_cantidad,
      
            r_precio_x_cantidad: r_global_precio_x_cantidad

          };



          if (r_user_has_email == true && r_global_email != "") {

            console.log("Email Enviado");            



            $.ajax({

              type: "POST",

              url: "/services/send_email_cliente.php",

              data: r_parametros_email,

              success: function (datos) {

                var result = JSON.parse(datos);

                if (result["status"] == "ok") {

                  console.log("Send Cliente> ", "Oki");

                  $.ajax({

                    type: "POST",

                    url: "/services/send_email_vendedor.php",

                    data: r_parametros_email,

                    success: function (datos) {

                      var result = JSON.parse(datos);

                      console.log("Send Vendedor> ", result);



                      if (result["status"] == "ok") {

                        console.log("Send Vendedor> ", "Oki");

                        Swal.fire({

                          icon: "success",

                          title: "Muy, bien!",

                          text: "reserva realizada con Exito",

                          showConfirmButton: false,

                          timer: 2500,

                        });



                        $("#spinnerLoadFinalizar").css("display", "none");

                        setTimeout(function () {

                          location.reload();

                        }, 3000);

                      } else {

                        Swal.fire({

                          icon: "error",

                          title: "Uy, Fallo!",

                          text: "Lo sentimos, su reserva fallo!",

                          footer: link_error,

                          confirmButtonText: "Finalizar",

                        });

                        $("#spinnerLoadFinalizar").css("display", "none");

                        $("#btnFinalizarCompra").prop("disabled", false);

                      }

                    },

                    error: function (data) {

                      console.log("Error:", data);

                    },

                  });

                } else {

                  $("#spinnerLoadFinalizar").css("display", "none");

                  $("#btnFinalizarCompra").prop("disabled", false);

                  Swal.fire({

                    icon: "error",

                    title: "Uy, Fallo!",

                    text: "Lo sentimos, su reserva fallo!",

                    footer: link_error,

                    confirmButtonText: "Finalizar",

                  });

                }

              },

              error: function (data) {

                console.log("Error:", data);

              },

            });

          } else {

            console.log("Celular Enviado");

            $.ajax({

              type: "POST",

              url: "/services/send_email_vendedor.php",

              data: r_parametros_email,

              success: function (datos) {

                var result = JSON.parse(datos);



                if (result["status"] == "ok") {

                  console.log("Send Vendedor> ", "Oki");

                  Swal.fire({

                    icon: "success",

                    title: "Muy, bien!",

                    text: "reserva realizada con Exito",

                    showConfirmButton: false,

                    timer: 2500,

                  });

                  $("#spinnerLoadFinalizar").css("display", "none");

                  setTimeout(function () {

                    location.reload();

                  }, 3000);

                } else {

                  Swal.fire({

                    icon: "error",

                    title: "Uy, Fallo!",

                    text: "Lo sentimos, su reserva fallo!",

                    footer: link_error,

                    confirmButtonText: "Finalizar",

                  });

                  $("#spinnerLoadFinalizar").css("display", "none");

                  $("#btnFinalizarCompra").prop("disabled", false);

                }

              },

              error: function (data) {

                console.log("Error:", data);

              },

            });

          }

        } else {

          console.log("Error:", result);

        }

      },

      error: function (data) {

        console.log("Error:", data);

      },

    });

  });

});

