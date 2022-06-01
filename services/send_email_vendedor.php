<?php
require_once("PHPMailer/ClassEmail.php");
$mailSend = new ClassEmail();

if (
    isset($_POST["r_name_lastname"]) &&
    isset($_POST["r_phone"]) &&
    isset($_POST["r_email"]) &&
    isset($_POST["r_place"]) &&
    isset($_POST["r_medio_plin"]) &&
    isset($_POST["r_medio_yape"]) &&
    isset($_POST["r_medio_efectivo"]) &&
    isset($_POST["r_product_price"]) &&
    isset($_POST["r_monto_ingresado"]) &&
    isset($_POST["r_monto_vuelto"])
) {

    // Parametros HTTPS
    $ticket          = "0005";
    $name            = $_POST["r_name_lastname"];
    $phone           = $_POST["r_phone"];
    $email           = $_POST["r_email"];
    $place           = $_POST["r_place"];
    $plin            = $_POST["r_medio_plin"];
    $yape            = $_POST["r_medio_yape"];
    $efectivo        = $_POST["r_medio_efectivo"];
    $price           = $_POST["r_product_price"];
    $monto_ingresado = $_POST["r_monto_ingresado"];
    $monto_vuelto    = $_POST["r_monto_vuelto"];

    // VALIDACIONES 
    $medio_pago = "-";
    $html_monto_vuelto = "";
    $html_email = "-";

    $total_mpagar;
    $total_mvuelto;

    if ($monto_ingresado != "" || $monto_ingresado != 0) {
        $total_mpagar  = $monto_ingresado;
    } else {
        $total_mpagar  = "-";
    }

    if ($monto_vuelto != "" || $monto_vuelto != 0) {
        $total_mvuelto = $monto_vuelto;
    } else {
        $total_mvuelto  = "-";
    }

    if ($plin == "PLIN") {
        $medio_pago = "PLIN";
    } else if ($yape == "YAPE") {
        $medio_pago = "YAPE";
    } else if ($efectivo == "EFECTIVO") {
        $medio_pago = "EFECTIVO";
        $html_monto_vuelto = "<tr><td>Monto a Pagar</td><td>S/ " . $total_mpagar . "</td></tr>";
        $html_monto_vuelto .= "<tr><td>Vuelto</td><td>S/ " . $monto_vuelto . "</td></tr>";
    }
    
    if($email != ""){
        $html_email = $email; 
    }

    $cli_name = str_replace(" ","%20",$name);

    $html_whatssap ='<a href="https://api.whatsapp.com/send?phone=+51'.$phone.'&text=Buen%20dia!%20S%C3%B1r(a).%20'.$cli_name.'%20Ud%20Realizo%20una%20compra%20de%20jueane%20de%20S/'.$price.'.00%20y%20utilizar%C3%A1%20el%20medio%20de%20pago%20'.$medio_pago.'.%20Para%20confirmar%20su%20pedido%20mencione:%20*SI*%20">' . $phone . '</a> ';

    $mensaje_vendedor = '
    <html>
    <head>
    <style>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 600px;
        margin: auto;
        font-family: arial;
    }
    .price {
        color: grey;
        font-size: 22px;
    }
      
    .card button {
        border: none;
        outline: 0;
        padding: 12px;
        color: white;
        background-color: #28B463;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
    }
      
    .card button:hover {
        opacity: 0.7;
    }
      
    table {
        border-collapse: collapse;
        width: 100%;
    }
      
    th, td {
       text-align: left;
       padding: 8px;
    }
      
    tr{background-color: #f2f2f2}
      
    th {
        background-color: red;
        color: white;
    }
    table, td, th {  
        border: 1px solid #ddd;
        text-align: left;
    }
    </style>
    </head>
    <body>
    <div class="card">
    
    <p align="center"> <strong> Ya vuelta otra venta realizada. Diosito nos bendiga!!  </strong> </p>
    <div>
    <table>
    <tr>
        <td>Ticket</td>
        <td>#' . $ticket . '</td>
    </tr>
    <tr>
        <td>Precio</td>
        <td>S/ ' . $price . '.00</td>
    </tr>
    <tr>
        <td>Nombre(s) Apellido (s)</td>
        <td>' . $name . '</td>
    </tr>
    <tr>
       <td>Email </td>
       <td>' . $html_email . '</td>
    </tr>
    <tr>
       <td>Celular</td>
       <td>'.$html_whatssap.'</td>
    </tr>
    <tr>
       <td>Dirección</td>
      <td>' . $place . '</td>
    </tr>

    <tr>
       <td>Medio de Pago</td>
       <td>' . $medio_pago . '</td>
    </tr>
    ' . $html_monto_vuelto . '       
    </table>
    <br>
    </div>    
    </div>
    </body>
    </html>';


    $header          = "ATC - Venta Realizada";
    $email           = "sabrosoonfood@gmail.com";
    $name_vendedor   = "Sabrosoon Food - 1.0";
    $asunto_vendedor = "Se Realizo una venta de Juane Ticket #" . $ticket;

    $enviado_vendedor = $mailSend->sendEnviarEmail($header, $email, $name_vendedor, $asunto_vendedor, $mensaje_vendedor);
    if($enviado_vendedor){
        echo json_encode([
            'status' => 'ok',
            'message' => 'se envio email al vendedor'
        ]);
    }else{
        echo json_encode([
            'status' => 'error',
            'message' => 'error del vendedor'
        ]);
    }
}
