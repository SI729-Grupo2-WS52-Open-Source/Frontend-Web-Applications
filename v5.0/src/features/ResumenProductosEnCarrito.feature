Feature: Ver resumen de productos en el carrito antes de proceder al pago

  Scenario 1: Ver resumen de productos en el carrito
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When accedo a la página de resumen del carrito
    Then se muestra un listado de todos los productos que he agregado al carrito
    And puedo ver detalles como el nombre del producto, la cantidad de unidades y el precio por unidad

  Scenario 2: Calcular el total del carrito de compras
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When accedo a la página de resumen del carrito
    Then se muestra el total a pagar por todos los productos en el carrito
    And en costo de envío
    And puedo ver el total que debo pagar antes de proceder al pago