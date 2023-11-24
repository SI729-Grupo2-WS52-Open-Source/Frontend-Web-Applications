Feature: Ver historial de pedidos

  Scenario 1: Ver historial de pedidos
    Given que soy un usuario en Akira
    When accedo a la sección de historial de pedidos en mi cuenta
    Then puedo ver una lista de todos los pedidos que he realizado anteriormente
    And puedo ver detalles como la fecha del pedido, los productos adquiridos, el precio por unidad y el total pagado

  Scenario 2: Visualizar los detalles de un pedido específico
    Given que soy un usuario en Akira
    When accedo a la sección de historial de pedidos en mi cuenta
    And selecciono un pedido específico de la lista
    Then se muestran los detalles completos del pedido, incluyendo los productos, las cantidades, el precio por unidad y el total pagado
    And puedo revisar los detalles del pedido para recordar la información y los productos adquiridos