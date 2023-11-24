Feature: Agregar producto al carrito de compras

  Scenario 1: Agregar producto al carrito
    Given que soy un usuario en la página de un producto en Akira
    When selecciono la opción de agregar el producto al carrito
    Then el producto se añade exitosamente a mi carrito de compras
    And se muestra un mensaje de confirmación indicando que el producto fue agregado correctamente

  Scenario 2: Verificar producto en el carrito
    Given que soy un usuario en la página de un producto en Akira
    When selecciono la opción de agregar el producto al carrito
    Then puedo acceder a mi carrito de compras para verificar que el producto se encuentra en él
    And puedo ver la cantidad de unidades del producto que he agregado al carrito