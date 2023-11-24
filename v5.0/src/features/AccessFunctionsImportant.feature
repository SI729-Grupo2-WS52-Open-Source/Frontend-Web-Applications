Feature: Acceso rápido a funciones importantes

  Scenario 1: Accediendo a funciones importantes desde cualquier página
    Given que soy un usuario con sesión iniciada en la aplicación
    When navego por cualquier página de la aplicación
    Then debería tener acceso rápido a funciones importantes relacionadas con mi cuenta, como "Mi cuenta"
    And al hacer clic, debería ser redirigido a la página correspondiente sin problemas