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

    isset($_POST["r_monto_vuelto"]) &&

    isset($_POST["r_ticket"]) &&

    isset($_POST["r_cantidad"]) &&
    isset($_POST["r_precio_x_cantidad"])

) {



    // Parametros HTTPS

    $ticket          = "X-".$_POST["r_ticket"];

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

    $cantidad       = $_POST["r_cantidad"];
    $precio_total   = $_POST["r_precio_x_cantidad"];



    // VALIDACIONES 

    $medio_pago = "-";

    $html_monto_vuelto = "";



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



    

    $mensaje_cliente = '

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

    <img src="https://ya-vuelta-su-comida.lab-elsol.com/img/icono-email.png" alt="Icono" style="width:100%">

    <p align="justify">Gracias por su colaboración Sñr (a) ' . $name . ', su reserva se proceso de forma exitosa. Adjuntamos el detalle de su compra ante cualquier duda puedes escribirnos al correo sabrosoonfood@gmail.com, lo atenderemos con mucho gusto.</p>

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

        <td>Cantidad</td>

        <td> ' . $cantidad . '</td>

    </tr>

    <tr>

        <td>Total</td>

        <td>S/ ' . $precio_total . '.00</td>

    </tr>

    <tr>

       <td>Celular</td>

       <td>' . $phone . '</td>

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

    <p><a href="https://ya-vuelta-su-comida.lab-elsol.com/" style="text-decoration: none; color:white;"> <button> Ir a la web </button></a> </p>

    </div>

    </body>

    </html>';



    



    $header = "ATC - Sabrosoon-Food";

    $asunto_cliente   = "Ud. Realizo una compra de Juane Ticket #" . $ticket;



    $enviado_cliente = $mailSend->sendEnviarEmail($header, $email, $name, $asunto_cliente, $mensaje_cliente);

    if($enviado_cliente){

        echo json_encode([

            'status' => 'ok',

            'message' => 'se envio email al cliente'

        ]);

    }else{

        echo json_encode([

            'status' => 'error',

            'message' => 'error del cliente'

        ]);

    }



    

}

