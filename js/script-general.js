var r_price_selected = 0;
var r_global_nombre = "";
var r_global_celular = "";
var r_global_email = "";
var r_global_direccion = "";

var r_global_medio_pago_plin = "";
var r_global_medio_pago_yape = "";
var r_global_medio_pago_contra_entrega = "";

$(document).ready(function () {
  r_price_selected = 0;
  
  r_global_nombre = "";
  r_global_celular = "";
  r_global_email = "";
  r_global_direccion = "";

  r_global_medio_pago_plin = "";
  r_global_medio_pago_yape = "";
  r_global_medio_pago_contra_entrega = "";

  $(".price").html("<sup>S/ </sup><span>0.<small>00</small></span>");
  $(".price-selected").html(
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
    $(".price-selected").html(
      "<h2 style='color: #fff;'> <sup>S/ </sup><span>15.<small>00</small></span> </h2>"
    );
  });

  $("#m_light").click(function () {
    console.log("Ligh");
    $("#btnReservar").prop("disabled", false);
    r_price_selected = 20;
    $(".price").html("<sup>S/ </sup><span>20.<small>00</small></span>");
    $(".price-selected").html(
      "<h2 style='color: #fff;'> <sup>S/ </sup><span>20.<small>00</small></span> </h2>"
    );
  });

  $("#m_ejecutivo").click(function () {
    console.log("Ejecutivo");
    $("#btnReservar").prop("disabled", false);
    r_price_selected = 25;
    $(".price").html("<sup>S/ </sup><span>25.<small>00</small></span>");
    $(".price-selected").html(
      "<h2 style='color: #fff;'> <sup>S/ </sup><span>25.<small>00</small></span> </h2>"
    );
  });

  // MODAL RESERVAR
  $("#btnReservar").click(function () {
    $("#mdRegistroCompra").modal("show");
    // console.log("Price-Selected: ", r_price_selected);
  });

  $("#btnPagar").click(function () {
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
            '<div class="progress mt-2"><div class="progress-bar progress-bar-striped active bg-warning" role="progressbar"  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%; font-weight: 100; font-size: 1.0rem;">Validando email</div></div>'
          );
        },
        complete: function (data) {},
        success: function (datos) {
          $(".resultado").html("");
          var result = JSON.parse(datos);
          console.log("RDX> ", result);
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
    $("#img-qr-pago").attr(
      "src",
      "https://i.blogs.es/f1c47c/xatakamovilqr/450_1000.jpg"
    );
  });

  $("#mpYape").click(function () {
    // console.log("Yape");
    $("#mdSelectMetodoPago").modal("hide");
    $("#mdQRPago").modal("show");
    $("#img-qr-pago").attr(
      "src",
      "https://cdn.urbantecno.com/rootear/2015/07/qr.jpg"
    );
  });

  $("#mpContraEntrega").click(function () {
    // console.log("Contra Entrega");
    $("#mdSelectMetodoPago").modal("hide");
    $("#mdQRPago").modal("show");
    $("#img-qr-pago").attr(
      "src",
      "https://conectasoftware.com/wp-content/uploads/2020/04/conecta-software-codigo-qr.png"
    );
  });

  $("#btnIrAtras").click(function () {
    $("#mdSelectMetodoPago").modal("show");
    $("#mdQRPago").modal("hide");
  });

  $("#btnIrAtrasFormulario").click(function () {
    $("#mdRegistroCompra").modal("show");
    $("#mdSelectMetodoPago").modal("hide");
  });


  $("#switch-label-plin").click(function () {	 
		var status_switch_plin = $('input:checkbox[name=switch-label-plin]:checked').val();   
    if(status_switch_plin == true || status_switch_plin=="on"){
      r_global_medio_pago_plin = "PLIN";
      // console.log("Plin> ", r_global_medio_pago_plin);
    }else{
      r_global_medio_pago_plin = "";
      // console.log("Plin> ", r_global_medio_pago_plin);
    }
	});

  $("#switch-label-yape").click(function () {	 
		var status_switch_yape = $('input:checkbox[name=switch-label-yape]:checked').val();   
    if(status_switch_yape == true || status_switch_yape=="on"){
      r_global_medio_pago_yape = "YAPE";
      // console.log("Plin> ", r_global_medio_pago_yape);
    }else{
      r_global_medio_pago_yape = "";
      // console.log("Plin> ", r_global_medio_pago_yape);
    }
	});

  $("#switch-label-contra-entrega").click(function () {	 
		var status_switch_contra_entrega = $('input:checkbox[name=switch-label-contra-entrega]:checked').val();   
    if(status_switch_contra_entrega == true || status_switch_contra_entrega=="on"){
      r_global_medio_pago_contra_entrega = "CONTRA ENTREGA";
      // console.log("Plin> ", r_global_medio_pago_contra_entrega);
    }else{
      r_global_medio_pago_contra_entrega = "";
      // console.log("Plin> ", r_global_medio_pago_contra_entrega);
    }
	});



  $("#btnFinalizarCompra").click(function () {
    console.log("Nombre:"+r_global_nombre);
    console.log("Celular:"+r_global_celular);
    console.log("Email:" +r_global_email);
    console.log("Direccion:" +r_global_direccion);
    console.log("Price:" +r_price_selected);

    console.log("PLIN:" +r_global_medio_pago_plin);
    console.log("YAPE:" +r_global_medio_pago_yape);
    console.log("CONTRA ENTREGA:" +r_global_medio_pago_contra_entrega);

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
