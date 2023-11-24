Feature: Modificar la cantidad de unidades en el carrito de compras

  Scenario 1: Aumentar la cantidad de unidades del producto
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When encuentro un producto en el carrito
    And selecciono la opción de aumentar la cantidad de unidades del producto
    Then la cantidad de unidades del producto se incrementa en uno
    And el total del carrito de compras se actualiza automáticamente

  Scenario 2: Disminuir la cantidad de unidades del producto
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When encuentro un producto en el carrito
    And selecciono la opción de disminuir la cantidad de unidades del producto
    Then la cantidad de unidades del producto se reduce en uno
    And el total del carrito de compras se actualiza automáticamente