var html_global_price = "";

$(document).ready(function () {
  html_global_price = html_global_price + "<sup>S/ </sup><span>0.<small>00</small></span>";
  $(".price").html(html_global_price);

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
});
