var html_global_price = "";

$(document).ready(function () {
  
  html_global_price = html_global_price + "<sup>S/ </sup><span>0.<small>00</small></span>";
  $(".price").html(html_global_price);
  // $('.audio-properties')[0].play();


  $("#btnComprar").click(function () {
    $("#mdRegistroCompra").modal("show");
  });

  $("#m_economico").click(function () {
    console.log("Economico");
    html_global_price = " "
    html_global_price = html_global_price + "<sup>S/ </sup><span>15.<small>00</small></span>";
    $(".price").html(html_global_price);
  });

  $("#m_light").click(function () {
    console.log("Ligh");
    html_global_price = " "
    html_global_price = html_global_price + "<sup>S/ </sup><span>20.<small>00</small></span>";
    $(".price").html(html_global_price);
  });

  $("#m_ejecutivo").click(function () {
    console.log("Ejecutivo");
    html_global_price = " "
    html_global_price = html_global_price + "<sup>S/ </sup><span>25.<small>00</small></span>";
    $(".price").html(html_global_price);
  });

  $("#btnPagar").click(function () {
    $("#mdRegistroCompra").modal("hide");
    $("#mdMetodoPagar").modal("show");    
  });


  $("#mpPlin").click(function () {
    console.log("Plin");
    $("#mdMetodoPagar").modal("hide"); 
    $("#mdQRPago").modal("show");   
    $("#img-qr-pago").attr("src","https://i.blogs.es/f1c47c/xatakamovilqr/450_1000.jpg");

  });

  $("#mpYape").click(function () {
    console.log("Yape");
    $("#mdMetodoPagar").modal("hide"); 
    $("#mdQRPago").modal("show"); 
    $("#img-qr-pago").attr("src","https://cdn.urbantecno.com/rootear/2015/07/qr.jpg");

  });

  $("#mpContraEntrega").click(function () {
    console.log("Contra Entrega");
    $("#mdMetodoPagar").modal("hide"); 
    $("#mdQRPago").modal("show"); 
    $("#img-qr-pago").attr("src","https://conectasoftware.com/wp-content/uploads/2020/04/conecta-software-codigo-qr.png");
  });

  $("#btnIrAtras").click(function () {
    $("#mdMetodoPagar").modal("show"); 
    $("#mdQRPago").modal("hide"); 
  });

  $("#btnIrAtrasFormulario").click(function () {
    $("#mdRegistroCompra").modal("show");
    $("#mdMetodoPagar").modal("hide");
  });
  

  $("#btnFinalizarCompra").click(function () {
    $("#mdMetodoPagar").modal("hide");
    Swal.fire({
      icon: 'success',
      title: 'Uy, bien!',
      text: 'reserva realizada con Exito',
      showConfirmButton: false,
      timer: 2000
    });
  });
  
  

  

});
