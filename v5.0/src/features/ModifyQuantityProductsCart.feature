Feature: Modificar las cantidades de los productos en el carrito de compras y eliminar productos

  Scenario 1: Modificar la cantidad de unidades de un producto en el carrito
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When encuentro un producto en el carrito
    And modifico la cantidad de unidades del producto
    Then la cantidad de unidades del producto se actualiza según mi modificación
    And el total del carrito de compras se actualiza automáticamente

  Scenario 2: Eliminar un producto del carrito
    Given que soy un usuario en la página de mi carrito de compras en Akira
    When encuentro un producto en el carrito
    And selecciono la opción de eliminar el producto
    Then el producto se elimina por completo del carrito
    And el total del carrito de compras se actualiza automáticamente, excluyendo el producto eliminado