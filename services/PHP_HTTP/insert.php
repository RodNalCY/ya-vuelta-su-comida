<?php

include 'conexion.php';



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

    isset($_POST["r_cantidad"]) &&
    isset($_POST["r_precio_x_cantidad"])

) {



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



    $medio_pago = '';

    if ($plin == "PLIN") {

        $medio_pago = 'PLIN';

    } else if ($yape == "YAPE") {

        $medio_pago = 'YAPE';

    } else if ($efectivo == "EFECTIVO") {

        $medio_pago = 'EFECTIVO';

    }





    $s_query      = "SELECT s_ticket FROM tb_ventas order by s_ticket DESC LIMIT 1;";

    $s_result     = mysqli_query($conexion, $s_query);

    $neo_ticket = 0;

    $message = "";

    $status  = false;





    if ($s_result) {

        $last_data = mysqli_fetch_array($s_result);

        $neo_ticket = $last_data['s_ticket'] + 1;

        // print_r($neo_ticket);

        $q_insert = "INSERT INTO tb_ventas (s_ticket, s_nombres_apellidos, s_email, s_celular, s_direccion, s_medio_pago, s_precio_producto, s_monto_pagar, s_monto_vuelto, s_cantidad, s_precio_total) VALUES ($neo_ticket, '$name', '$email', '$phone', '$place', '$medio_pago', '$price', '$monto_ingresado', '$monto_vuelto', '$cantidad', '$precio_total')";

        $q_result = mysqli_query($conexion, $q_insert);

        if ($q_result) {

            $status  = true;

            $message = "created successfully";

        } else {

            $status  = false;

            $message = "Error: " . $q_insert . " - " . mysqli_error($conexion);

        }

    } else {

        $status  = false;

        $message = "Error: " . $s_query . " - " . mysqli_error($conexion);

    }



    mysqli_close($conexion);



    echo json_encode([

        'ticket'  => $neo_ticket,

        'status' => $status,

        'message' => $message

    ]);

}

