Feature: Confirmación de compra exitosa

  Scenario 1: Confirmación de compra exitosa
    Given que soy un usuario que ha realizado una compra en Akira
    When finalizo el proceso de pago
    Then se muestra un mensaje de confirmación de compra exitosa

  Scenario 2: Verificar el historial de pedidos
    Given que soy un usuario autenticado en Akira
    When accedo a la sección de historial de pedidos en mi cuenta
    Then puedo ver una lista de todos los pedidos que he realizado anteriormente
    And puedo seleccionar un pedido específico para ver los detalles y la confirmación de compra exitosa