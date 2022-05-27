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
    r_price_selected = 15;
    $(".price").html("<sup>S/ </sup><span>15.<small>00</small></span>");
    $(".content-price-selected").html(
      "<h2 class='txt-price-selected'> <sup>S/ </sup><span>15.<small>00</small></span> </h2>"
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
    r_price_selected = 25;
    $(".price").html("<sup>S/ </sup><span>25.<small>00</small></span>");
    $(".content-price-selected").html(
      "<h2 class='txt-price-selected'> <sup>S/ </sup><span>25.<small>00</small></span> </h2>"
    );
  });

  // MODAL RESERVAR
  $("#btnReservar").click(function () {
    $("#mdRegistroCompra").modal("show");
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
        title: "Ya, vuelta!",
        text: "Ingrese su nombre correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (r_global_celular == "") {
      // console.log("Ingrese su celular.");
      Swal.fire({
        icon: "warning",
        title: "Ya, vuelta!",
        text: "Ingrese su celular correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (r_global_email == "") {
      // console.log("Ingrese su email.");
      Swal.fire({
        icon: "warning",
        title: "Ya, vuelta!",
        text: "Ingrese su email correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (r_global_direccion == "") {
      // console.log("Ingrese su direccion.");
      Swal.fire({
        icon: "warning",
        title: "Ya, vuelta!",
        text: "Ingrese su dirección correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      $.ajax({
        type: "POST",
        // url: "/services/post-email.php",
        url: "https://verificar-email.leoncioprado.com/",
        data: parametros,
        beforeSend: function (data) {
          $(".resultado").html(
            '<div class="progress mt-2"><div class="progress-bar progress-bar-striped active bg-warning txt-progress-bar" role="progressbar"  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">Validando email</div></div>'
          );
        },
        complete: function (data) {},
        success: function (datos) {
          $(".resultado").html("");
          var result = JSON.parse(datos);
          console.log("email verificado > ", result);
          if (result.validated) {
            Swal.fire({
              icon: "success",
              title: "Ya, vuelta!",
              text: "Email verificado correctamente !",
              showConfirmButton: false,
              timer: 2000,
            });

            $("#mdRegistroCompra").modal("hide");
            $("#mdSelectMetodoPago").modal("show");
          } else {
            Swal.fire({
              icon: "error",
              title: "Ya, vuelta!",
              text: "Email no existe !",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },
        error: function (data) {
          console.log("Error:", data);
        },
      });
    }
  });

  // VALIDAR INPUT DE CELULAR
  $("input#txtCelular").keypress(function (event) {
    if (event.which < 48 || event.which > 57 || this.value.length === 9) {
      return false;
    }
  });

  $("#mpPlin").click(function () {
    // console.log("Plin");
    $("#mdSelectMetodoPago").modal("hide");
    $("#mdQRPago").modal("show");    
    $("#txt-medio").html("<span>Saludos ñañito(a)! Usted eligio pagar por PLIN. Si desea pagar ahora, debe adjuntar su voucher de pago en formato imagen. <br> Precio seleccionado: S/ "+r_price_selected+".00</span>");
    $("#img-qr-pago").attr(
      "src",
      "img/qr-plin.jpeg"
    );
    $("#contentfileVoucher"). css("display", "block");
    $("#contentVuelto"). css("display", "none");

    r_global_medio_pago_plin = "PLIN";
    r_global_medio_pago_yape = "";
    r_global_medio_pago_contra_entrega = "";
    console.log("PLIN:" +r_global_medio_pago_plin);
    console.log("YAPE:" +r_global_medio_pago_yape);
    console.log("CONTRA ENTREGA:" +r_global_medio_pago_contra_entrega);

  });

  $("#mpYape").click(function () {
    // console.log("Yape");
    $("#mdSelectMetodoPago").modal("hide");
    $("#mdQRPago").modal("show");
    $("#txt-medio").html("<span>Saludos ñañito(a)! Usted eligio pagar por YAPE. Si desea pagar ahora, debe adjuntar su voucher de pago en formato imagen. <br> Precio seleccionado: S/ "+r_price_selected+".00</span>");
    $("#img-qr-pago").attr(
      "src",
      "img/qr-yape.jpeg"
    );
    $("#contentfileVoucher"). css("display", "block");
    $("#contentVuelto"). css("display", "none");

    r_global_medio_pago_plin = "";
    r_global_medio_pago_yape = "YAPE";
    r_global_medio_pago_contra_entrega = "";
    console.log("PLIN:" +r_global_medio_pago_plin);
    console.log("YAPE:" +r_global_medio_pago_yape);
    console.log("CONTRA ENTREGA:" +r_global_medio_pago_contra_entrega);

    
  });

  $("#mpContraEntrega").click(function () {
    // console.log("Contra Entrega");
    $("#mdSelectMetodoPago").modal("hide");
    $("#mdQRPago").modal("show");
    $("#txt-medio").html("<span>Saludos ñañito(a)! Usted eligio pagar en efectivo. Ingrese con cuanto pagará para llevar su vuelto!<br> Precio seleccionado: S/ "+r_price_selected+".00</span>");    
    $("#img-qr-pago").attr(
      "src",
      "img/contra-entrega.png"
    );
    $("#contentfileVoucher"). css("display", "none");
    $("#contentVuelto"). css("display", "block");

    r_global_medio_pago_plin = "";
    r_global_medio_pago_yape = "";
    r_global_medio_pago_contra_entrega = "EFECTIVO";
    console.log("PLIN:" +r_global_medio_pago_plin);
    console.log("YAPE:" +r_global_medio_pago_yape);
    console.log("CONTRA ENTREGA:" +r_global_medio_pago_contra_entrega);
    
  });

  /** BOTON PARA CALCULAR EL VUELTO */
  $("#txtMontoIngresado").keyup(function (e) {
    // r_price_selected = 15;
    // r_global_monto_ingresado = $(this).val();       

    // console.log("PS > ", r_price_selected);
    // console.log("MI > ", r_global_monto_ingresado);
    // console.log(r_global_monto_vuelto);

    r_global_monto_ingresado = $(this).val();   
    setInterval(() => r_global_monto_ingresado = $("#txtMontoIngresado").val(), 1500);

    r_global_monto_vuelto = (r_global_monto_ingresado - r_price_selected).toFixed(2)

    if(r_global_monto_ingresado==0 || r_global_monto_ingresado==""){
      $("#txtMontoVuelto").val("0.00");
    }else if(r_global_monto_ingresado < r_price_selected || r_global_monto_ingresado == r_price_selected){
      $("#txtMontoVuelto").val("0.00");      
    }else{
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



  $("#btnFinalizarCompra").click(function () {
    console.log("NOMBRES Y APELLIDOS:"+r_global_nombre);
    console.log("CELULAR:"+r_global_celular);
    console.log("EMAIL:" +r_global_email);
    console.log("DIRECCION:" +r_global_direccion);
    

    console.log("PLIN:" +r_global_medio_pago_plin);
    console.log("YAPE:" +r_global_medio_pago_yape);
    console.log("CONTRA ENTREGA:" +r_global_medio_pago_contra_entrega);

    console.log("PRECIO SELECCIONADO:" +r_price_selected);
    console.log("MONTO INGRESADO:" +r_global_monto_ingresado);
    console.log("MONTO VUELTO:" +r_global_monto_vuelto);


    $("#mdSelectMetodoPago").modal("hide");
    Swal.fire({
      icon: "success",
      title: "Uy, bien!",
      text: "reserva realizada con Exito",
      showConfirmButton: false,
      timer: 2000,
    });
  });
});
