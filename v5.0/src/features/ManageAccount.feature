Feature: Gestión de información de la cuenta

  Scenario 1: Actualizando información de la cuenta
    Given que soy un usuario con sesión iniciada en la aplicación
    When navego hacia la sección de configuración de la cuenta
    Then debería ver un formulario con mi información actual prellenada
    And debería poder editar los campos correspondientes para actualizar mi información
    And al guardar los cambios, mi información de cuenta debería actualizarse correctamente